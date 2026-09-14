import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../service/supabase/client";
import { syncWatchlistForUser } from "../service/watchlist/watchlistSync";
import { clearActiveWatchlistUser, setActiveWatchlistUser } from "../service/watchlist/watchlistStorage";
import { syncVideoProgressForUser } from "../service/videoProgress/videoProgressSync";
import { clearActiveVideoProgressUser, setActiveVideoProgressUser } from "../service/videoProgress/videoProgressStorage";

const AuthContext = createContext(null);
const WATCHLIST_SYNC_INTERVAL_MS = 30 * 60 * 1000;

const getProfileFromSession = (session) => {
  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    username: session.user.user_metadata?.username || session.user.email,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const syncedUserIDRef = useRef(null);

  const applySession = useCallback((session) => {
    const profile = getProfileFromSession(session);

    if (!profile) {
      clearActiveWatchlistUser();
      clearActiveVideoProgressUser();
      syncedUserIDRef.current = null;
      setUser(null);
      return;
    }

    setActiveWatchlistUser(profile.id);
    setActiveVideoProgressUser(profile.id);
    setUser(profile);

    if (syncedUserIDRef.current === profile.id) {
      return;
    }

    syncedUserIDRef.current = profile.id;
    syncWatchlistForUser(profile.id).catch((error) => {
      console.error("Failed to sync watchlist", error);
    });
    syncVideoProgressForUser(profile.id).catch((error) => {
      console.error("Failed to sync video progress", error);
    });
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!isActive) {
        return;
      }

      applySession(data.session);
      setIsAuthLoading(false);
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
      setIsAuthLoading(false);
    });

    return () => {
      isActive = false;
      authListener.subscription.unsubscribe();
    };
  }, [applySession]);

  const login = useCallback(async ({ username, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username.trim(),
      password,
    });

    if (error) {
      return { success: false, error: "Invalid username or password." };
    }

    applySession(data.session);
    return { success: true };
  }, [applySession]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    clearActiveWatchlistUser();
    clearActiveVideoProgressUser();
    syncedUserIDRef.current = null;
    setUser(null);
  }, []);

  useEffect(() => {
    if (!user?.id) {
      return undefined;
    }

    const sync = () => {
      syncWatchlistForUser(user.id).catch((error) => {
        console.error("Failed to sync watchlist", error);
      });
      syncVideoProgressForUser(user.id).catch((error) => {
        console.error("Failed to sync video progress", error);
      });
    };
    const syncIntervalID = window.setInterval(sync, WATCHLIST_SYNC_INTERVAL_MS);
    window.addEventListener("online", sync);

    return () => {
      window.clearInterval(syncIntervalID);
      window.removeEventListener("online", sync);
    };
  }, [user?.id]);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      isAuthLoading,
      login,
      logout,
    }),
    [isAuthLoading, login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
};
