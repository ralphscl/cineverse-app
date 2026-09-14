// Syncs local and remote watchlist data, resolving conflicts by newest update time.
import { getRemoteWatchlist, upsertRemoteWatchlist, deleteRemoteWatchlistItem } from "./watchlistRemote";
import { getWatchlist, replaceActiveWatchlist, getWatchlistSession, getWatchlistDeletions } from "./watchlistStorage";

const WATCHLIST_SYNC_STATUS_KEY_PREFIX = "cineverse-watchlist-sync:";

const getSyncStatusKey = (userID) => `${WATCHLIST_SYNC_STATUS_KEY_PREFIX}${userID}`;

export const getStoredWatchlistSyncStatus = (userID) => {
  if (!userID || typeof window === "undefined") {
    return { state: "idle", syncedAt: null, error: "" };
  }

  try {
    const rawStatus = window.localStorage.getItem(getSyncStatusKey(userID));
    return rawStatus ? JSON.parse(rawStatus) : { state: "idle", syncedAt: null, error: "" };
  } catch {
    return { state: "idle", syncedAt: null, error: "" };
  }
};

const dispatchSyncStatus = (userID, status) => {
  if (typeof window === "undefined") {
    return;
  }

  const nextStatus = { userID, ...status };

  if (userID) {
    window.localStorage.setItem(getSyncStatusKey(userID), JSON.stringify(nextStatus));
  }

  window.dispatchEvent(new CustomEvent("cineverse-watchlist-sync-status", { detail: nextStatus }));
};

const getLatestItem = (firstItem, secondItem) => {
  const firstDate = new Date(firstItem?.updatedAt || firstItem?.addedAt || 0);
  const secondDate = new Date(secondItem?.updatedAt || secondItem?.addedAt || 0);

  return secondDate > firstDate ? secondItem : firstItem;
};

const mergeWatchlistItems = (localItems, remoteItems) => {
  const itemMap = new Map();

  [...localItems, ...remoteItems].forEach((item) => {
    if (!item?.id) {
      return;
    }

    const existingItem = itemMap.get(item.id);
    itemMap.set(item.id, existingItem ? getLatestItem(existingItem, item) : item);
  });

  return Array.from(itemMap.values());
};

const syncForUser = async (userID) => {
  if (!userID) {
    return [];
  }

  const session = getWatchlistSession();
  dispatchSyncStatus(userID, { state: "syncing", error: "" });

  try {
    const localItems = getWatchlist(userID);
    const remoteItems = await getRemoteWatchlist(userID);
    if (session !== getWatchlistSession()) return [];
    const deletions = getWatchlistDeletions(userID);
    const mergedItems = mergeWatchlistItems(
      mergeWatchlistItems(localItems, remoteItems), getWatchlist(userID)
    ).filter((item) => !deletions[item.id]);

    replaceActiveWatchlist(mergedItems, userID);
    await upsertRemoteWatchlist(userID, mergedItems);

    for (const id of Object.keys(getWatchlistDeletions(userID))) {
      if (session !== getWatchlistSession()) return [];
      if (!getWatchlistDeletions(userID)[id]) continue;
      if (await deleteRemoteWatchlistItem(userID, id) === false) {
        throw new Error("Some removals could not sync. They will be retried.");
      }
    }
    if (session !== getWatchlistSession()) return [];

    dispatchSyncStatus(userID, {
      state: "synced",
      syncedAt: new Date().toISOString(),
      itemCount: mergedItems.length,
      error: "",
    });

    return mergedItems;
  } catch (error) {
    dispatchSyncStatus(userID, {
      state: "error",
      syncedAt: new Date().toISOString(),
      error: error?.message || "Watchlist sync failed.",
    });
    throw error;
  }
};

const pendingSyncs = new Map();
export const syncWatchlistForUser = (userID) => {
  const key = userID + ':' + getWatchlistSession();
  if (pendingSyncs.has(key)) return pendingSyncs.get(key);
  const promise = syncForUser(userID).finally(() => pendingSyncs.delete(key));
  pendingSyncs.set(key, promise);
  return promise;
};
