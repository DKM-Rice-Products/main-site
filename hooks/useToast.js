"use client";

import { useState, useCallback } from "react";

// Simple toast queue. Returns the active toasts plus a `push` function.
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((msg, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  return { toasts, push };
}
