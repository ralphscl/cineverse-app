// Syncs local and remote playback progress, resolving conflicts by newest update time.
import { getRemoteVideoProgressEntries, upsertRemoteVideoProgressEntries } from "./videoProgressRemote";
import {
  getVideoProgressEntries,
  replaceActiveVideoProgress,
  getVideoProgressSession,
} from "./videoProgressStorage";

const getLatestEntry = (firstEntry, secondEntry) => {
  const firstDate = new Date(firstEntry?.updatedAt || 0);
  const secondDate = new Date(secondEntry?.updatedAt || 0);

  return secondDate > firstDate ? secondEntry : firstEntry;
};

const mergeProgressEntries = (localEntries, remoteEntries) => {
  const entryMap = new Map();

  [...localEntries, ...remoteEntries].forEach((entry) => {
    if (!entry?.key) {
      return;
    }

    const existingEntry = entryMap.get(entry.key);
    entryMap.set(entry.key, existingEntry ? getLatestEntry(existingEntry, entry) : entry);
  });

  return Array.from(entryMap.values());
};

const syncForUser = async (userID) => {
  if (!userID) {
    return [];
  }

  const session = getVideoProgressSession();

  const localEntries = getVideoProgressEntries(userID);
  const remoteEntries = await getRemoteVideoProgressEntries(userID);
  if (session !== getVideoProgressSession()) return [];
  const mergedEntries = mergeProgressEntries(
    mergeProgressEntries(localEntries, remoteEntries),
    getVideoProgressEntries(userID)
  );

  const replacedMap = replaceActiveVideoProgress(mergedEntries, {
    mergeCurrent: true,
    userID,
  });
  const currentMergedEntries = Object.values(replacedMap);
  await upsertRemoteVideoProgressEntries(userID, currentMergedEntries);

  return currentMergedEntries;
};

const pendingSyncs = new Map();
export const syncVideoProgressForUser = (userID) => {
  const key = userID + ':' + getVideoProgressSession();
  if (pendingSyncs.has(key)) return pendingSyncs.get(key);
  const promise = syncForUser(userID).finally(() => pendingSyncs.delete(key));
  pendingSyncs.set(key, promise);
  return promise;
};
