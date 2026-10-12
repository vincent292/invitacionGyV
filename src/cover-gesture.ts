/** Closing requires a fresh outward gesture at a scroll boundary.
 * A gesture arriving from another chapter cannot close the invitation. */
export class CoverCloseGesture {
  private lastEvent = -Infinity;
  private eligible = false;
  private distance = 0;

  private direction: -1 | 1;
  constructor(direction: -1 | 1 = -1) { this.direction = direction; }

  push(deltaY: number, now: number, atBoundary: boolean, blocked: boolean) {
    const outward = deltaY * this.direction;
    const fresh = now - this.lastEvent > 220 || outward <= 0;
    if (fresh) {
      this.distance = 0;
      this.eligible = atBoundary && !blocked;
    }
    this.lastEvent = now;
    if (blocked || !atBoundary) this.eligible = false;
    if (outward <= 0 || blocked || !this.eligible) {
      this.distance = 0;
      return false;
    }
    this.distance += outward;
    if (this.distance < 100) return false;
    this.eligible = false;
    return true;
  }
}
