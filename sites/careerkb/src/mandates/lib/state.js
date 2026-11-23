import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Your personal state: action status and notes, review marks, per-document
// notes, internal guidance, visit timestamps. Stored server-side in Workers KV
// via /api (behind the password). When /api isn't there (plain `vite dev`),
// it falls back to this browser's localStorage and says so in the header.

const LS_KEY = "oo-state-v1";
const LS_INTERNAL = "oo-internal-v1";

const EMPTY = { actions: {}, reviews: {}, notes: {}, visits: { last: null, prev: null } };

const Ctx = createContext(null);

// StrictMode runs effects twice in development; record the visit only once.
let visitPromise = null;

function lsGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or blocked storage: state lives for this tab only */
  }
}

function sessionStorageFlag() {
  try {
    const seen = sessionStorage.getItem("oo-visit");
    sessionStorage.setItem("oo-visit", "1");
    return !!seen;
  } catch {
    return false;
  }
}

async function api(method, path, body) {
  const res = await fetch(`/api/${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "same-origin",
  });
  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("signed out");
  }
  if (!res.ok) throw new Error(`${method} /api/${path} → ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export function StateProvider({ children }) {
  const [mode, setMode] = useState("loading"); // loading | server | local
  const [state, setState] = useState(EMPTY);
  const [internal, setInternal] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [s, i, v] = await Promise.all([api("GET", "state"), api("GET", "internal"), (visitPromise ??= api("POST", "visit"))]);
        if (cancelled) return;
        setState({ ...EMPTY, ...s, visits: v });
        setInternal(i.items ?? []);
        setMode("server");
      } catch (e) {
        if (cancelled || e.message === "signed out") return;
        const s = lsGet(LS_KEY, EMPTY);
        const fresh = !sessionStorageFlag();
        const prev = fresh ? (s.visits?.last ?? null) : (s.visits?.prev ?? null);
        const visits = fresh ? { prev, last: new Date().toISOString() } : s.visits ?? EMPTY.visits;
        const next = { ...EMPTY, ...s, visits };
        lsSet(LS_KEY, next);
        setState(next);
        setInternal(lsGet(LS_INTERNAL, []));
        setMode("local");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(
    async (path, body, apply) => {
      setState((s) => {
        const next = apply(s);
        if (mode !== "server") lsSet(LS_KEY, next);
        return next;
      });
      if (mode === "server") {
        try {
          await api("PUT", path, body);
          setError(null);
        } catch (e) {
          setError(`Couldn't save — ${e.message}. Your change shows here but may not be stored.`);
        }
      }
    },
    [mode],
  );

  const setAction = useCallback(
    (id, patch) =>
      persist(`state/actions/${encodeURIComponent(id)}`, patch, (s) => ({
        ...s,
        actions: { ...s.actions, [id]: { ...s.actions[id], ...patch, updated: new Date().toISOString() } },
      })),
    [persist],
  );

  const setReview = useCallback(
    (id, reviewed) =>
      persist(`state/reviews/${encodeURIComponent(id)}`, { reviewed }, (s) => {
        const reviews = { ...s.reviews };
        if (reviewed) reviews[id] = { at: new Date().toISOString() };
        else delete reviews[id];
        return { ...s, reviews };
      }),
    [persist],
  );

  const setNote = useCallback(
    (id, text) =>
      persist(`state/notes/${encodeURIComponent(id)}`, { text }, (s) => ({
        ...s,
        notes: { ...s.notes, [id]: { text, updated: new Date().toISOString() } },
      })),
    [persist],
  );

  const saveInternal = useCallback(
    async (entry) => {
      const withId = { ...entry, id: entry.id ?? crypto.randomUUID(), updated: new Date().toISOString() };
      if (mode === "server") {
        const saved = await api("POST", "internal", withId);
        setInternal((list) => [saved, ...list.filter((x) => x.id !== saved.id)]);
        return saved;
      }
      setInternal((list) => {
        const next = [withId, ...list.filter((x) => x.id !== withId.id)];
        lsSet(LS_INTERNAL, next);
        return next;
      });
      return withId;
    },
    [mode],
  );

  const deleteInternal = useCallback(
    async (id) => {
      if (mode === "server") await api("DELETE", `internal/${encodeURIComponent(id)}`);
      setInternal((list) => {
        const next = list.filter((x) => x.id !== id);
        if (mode !== "server") lsSet(LS_INTERNAL, next);
        return next;
      });
    },
    [mode],
  );

  const value = useMemo(
    () => ({ mode, state, internal, error, setAction, setReview, setNote, saveInternal, deleteInternal }),
    [mode, state, internal, error, setAction, setReview, setNote, saveInternal, deleteInternal],
  );
  return createElement(Ctx.Provider, { value }, children);
}

export function useAppState() {
  return useContext(Ctx);
}

export function actionStatus(state, id) {
  return state.actions[id]?.status ?? "open";
}

export function isReviewed(state, item) {
  return !!state.reviews[item.id] || item.reviewed;
}
