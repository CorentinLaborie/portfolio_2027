export type RateLimitOptions = {
  /** Attempts allowed for one key in one window. */
  limit: number;
  /** Length of the window in milliseconds. */
  windowMs: number;
  /** Clock in milliseconds. Tests pass their own; the default is the real clock. */
  now?: () => number;
};

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export type RateLimiter = {
  /** Counts one attempt for this key and tells whether it is still within the limit. */
  hit(key: string): RateLimitResult;
};

type Window = { start: number; count: number };

/**
 * Fixed-window limit per key, kept in this process's memory: it starts empty after a restart and is not shared
 * between servers. A window starts at the first attempt and lasts windowMs; refused attempts do not extend it.
 */
export function createRateLimiter({ limit, windowMs, now = Date.now }: RateLimitOptions): RateLimiter {
  const windows = new Map<string, Window>();
  let nextSweep = 0;

  // Drops the windows that have ended, so the map does not grow with every address that ever wrote.
  function sweep(current: number) {
    for (const [key, window] of windows) {
      if (current - window.start >= windowMs) {
        windows.delete(key);
      }
    }
    nextSweep = current + windowMs;
  }

  return {
    hit(key) {
      const current = now();
      if (current >= nextSweep) {
        sweep(current);
      }

      let window = windows.get(key);
      if (window === undefined || current - window.start >= windowMs) {
        window = { start: current, count: 0 };
        windows.set(key, window);
      }

      if (window.count >= limit) {
        const remainingMs = window.start + windowMs - current;
        return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil(remainingMs / 1000)) };
      }

      window.count += 1;
      return { allowed: true };
    },
  };
}
