// Supabase persistence for playback progress.
import { supabase } from "../supabase/client";
import { fromVideoProgressRow, toVideoProgressRow } from "./videoProgressMappers";

const VIDEO_PROGRESS_TABLE = "video_progress";

export const getRemoteVideoProgressEntries = async (userID) => {
  if (!userID) {
    return [];
  }

  const { data, error } = await supabase
    .from(VIDEO_PROGRESS_TABLE)
    .select("*")
    .eq("user_id", userID)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to load remote video progress", error);
    throw error;
  }

  return (data || []).map(fromVideoProgressRow).filter(Boolean);
};

const upsertRemoteVideoProgressEntryImpl = async (userID, entry) => {
  const remoteProgress = toVideoProgressRow(userID, entry);
  if (!remoteProgress) {
    return true;
  }

  const { error } = await supabase
    .from(VIDEO_PROGRESS_TABLE)
    .upsert(remoteProgress, {
      onConflict: "user_id,content_type,tmdb_id,season_number,episode_number",
    });

  if (error) {
    console.error("Failed to save remote video progress", error);
    return false;
  }

  return true;
};

const upsertRemoteVideoProgressEntriesImpl = async (userID, entries) => {
  if (!userID || !Array.isArray(entries) || !entries.length) {
    return;
  }

  const rows = entries.map((entry) => toVideoProgressRow(userID, entry)).filter(Boolean);
  if (!rows.length) {
    return;
  }

  const { error } = await supabase
    .from(VIDEO_PROGRESS_TABLE)
    .upsert(rows, {
      onConflict: "user_id,content_type,tmdb_id,season_number,episode_number",
    });

  if (error) {
    console.error("Failed to save remote video progress", error);
    throw error;
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
export const upsertRemoteVideoProgressEntry = (userID, value) => enqueueWrite(userID, () => upsertRemoteVideoProgressEntryImpl(userID, value)).catch((error) => { console.error("Sync write failed", error); return false; });
export const upsertRemoteVideoProgressEntries = (userID, value) => enqueueWrite(userID, () => upsertRemoteVideoProgressEntriesImpl(userID, value));
