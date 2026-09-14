// Supabase persistence for watchlist rows keyed by user, media type, and TMDB ID.
import { supabase } from "../supabase/client";
import { fromWatchlistRow, parseWatchlistID, toWatchlistRow } from "./watchlistMappers";

const WATCHLIST_TABLE = "watchlist_items";

export const getRemoteWatchlist = async (userID) => {
  if (!userID) {
    return [];
  }

  const { data, error } = await supabase
    .from(WATCHLIST_TABLE)
    .select("*")
    .eq("user_id", userID)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to load remote watchlist", error);
    throw error;
  }

  return (data || []).map(fromWatchlistRow).filter(Boolean);
};

const upsertRemoteWatchlistItemImpl = async (userID, item) => {
  const remoteItem = toWatchlistRow(userID, item);
  if (!remoteItem) {
    return;
  }

  const { error } = await supabase
    .from(WATCHLIST_TABLE)
    .upsert(remoteItem, { onConflict: "user_id,media_type,tmdb_id" });

  if (error) {
    console.error("Failed to save remote watchlist item", error);
  }
};

const upsertRemoteWatchlistImpl = async (userID, items) => {
  if (!userID || !Array.isArray(items) || !items.length) {
    return;
  }

  const rows = items.map((item) => toWatchlistRow(userID, item)).filter(Boolean);
  const { error } = await supabase
    .from(WATCHLIST_TABLE)
    .upsert(rows, { onConflict: "user_id,media_type,tmdb_id" });

  if (error) {
    console.error("Failed to save remote watchlist", error);
    throw error;
  }
};

const deleteRemoteWatchlistItemImpl = async (userID, id) => {
  const { mediaType, tmdbID } = parseWatchlistID(id);
  if (!userID || !mediaType || !tmdbID) {
    return;
  }

  const { error } = await supabase
    .from(WATCHLIST_TABLE)
    .delete()
    .eq("user_id", userID)
    .eq("media_type", mediaType)
    .eq("tmdb_id", tmdbID);

  if (error) {
    console.error("Failed to delete remote watchlist item", error);
    return false;
  }
};

// Serialize writes so an older bulk sync cannot finish after a newer edit.
const writes = new Map();
const enqueueWrite = (userID, operation) => {
  const previous = writes.get(userID) || Promise.resolve();
  const next = previous.catch(() => {}).then(operation);
  writes.set(userID, next);
  next.finally(() => { if (writes.get(userID) === next) writes.delete(userID); }).catch(() => {});
  return next;
};
export const upsertRemoteWatchlistItem = (userID, value) => enqueueWrite(userID, () => upsertRemoteWatchlistItemImpl(userID, value)).catch((error) => { console.error("Sync write failed", error); return false; });
export const upsertRemoteWatchlist = (userID, value) => enqueueWrite(userID, () => upsertRemoteWatchlistImpl(userID, value));
export const deleteRemoteWatchlistItem = (userID, value) => enqueueWrite(userID, () => deleteRemoteWatchlistItemImpl(userID, value)).catch((error) => { console.error("Sync write failed", error); return false; });
