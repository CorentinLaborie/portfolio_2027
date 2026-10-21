import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

const MINUTE = 60_000;

function clock(start = 0) {
  let current = start;
  return {
    now: () => current,
    advance: (ms: number) => {
      current += ms;
    },
  };
}

describe("createRateLimiter", () => {
  it("allows the first attempts up to the limit, then refuses the next one", () => {
    const limiter = createRateLimiter({ limit: 5, windowMs: 10 * MINUTE, now: clock().now });

    for (let attempt = 0; attempt < 5; attempt++) {
      expect(limiter.hit("203.0.113.7")).toEqual({ allowed: true });
    }
    expect(limiter.hit("203.0.113.7")).toEqual({ allowed: false, retryAfterSeconds: 600 });
  });

  it("counts each key on its own", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 10 * MINUTE, now: clock().now });

    expect(limiter.hit("203.0.113.7")).toEqual({ allowed: true });
    expect(limiter.hit("198.51.100.2")).toEqual({ allowed: true });
    expect(limiter.hit("203.0.113.7").allowed).toBe(false);
  });

  it("gives the seconds left in the window, rounded up", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 10 * MINUTE, now: time.now });

    limiter.hit("ip");
    time.advance(MINUTE + 1);

    expect(limiter.hit("ip")).toEqual({ allowed: false, retryAfterSeconds: 540 });
  });

  it("allows the key again once its window has ended", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 10 * MINUTE, now: time.now });

    limiter.hit("ip");
    expect(limiter.hit("ip").allowed).toBe(false);

    time.advance(10 * MINUTE);

    expect(limiter.hit("ip")).toEqual({ allowed: true });
  });

  it("does not extend the block with refused attempts", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 10 * MINUTE, now: time.now });

    limiter.hit("ip");
    time.advance(5 * MINUTE);
    expect(limiter.hit("ip").allowed).toBe(false);

    time.advance(5 * MINUTE);

    expect(limiter.hit("ip")).toEqual({ allowed: true });
  });

  it("forgets the windows that have ended, and keeps counting the live ones", () => {
    const time = clock();
    const limiter = createRateLimiter({ limit: 2, windowMs: 10 * MINUTE, now: time.now });

    limiter.hit("old");
    time.advance(6 * MINUTE);
    limiter.hit("recent");
    time.advance(5 * MINUTE);

    expect(limiter.hit("old")).toEqual({ allowed: true });
    expect(limiter.hit("recent")).toEqual({ allowed: true });
    expect(limiter.hit("recent").allowed).toBe(false);
  });
});
