// Where Tab or Shift+Tab moves focus inside a closed loop of `count` items, given the index of the focused item (-1 when focus is outside the loop).
// Returns null when the browser's own Tab order should apply.
export function cycleFocusIndex(count: number, current: number, backwards: boolean): number | null {
  if (count === 0) return null;
  if (current === -1) return backwards ? count - 1 : 0;
  if (!backwards && current === count - 1) return 0;
  if (backwards && current === 0) return count - 1;
  return null;
}
