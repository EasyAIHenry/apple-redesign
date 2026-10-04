// Apple-style springs for the web, from the Designed by Claude Ep1 redesign.
// Usage:
//   import { Spring } from './spring.js';
//   const s = new Spring({ damping: 1, response: 0.4, onUpdate: (v) => (el.style.transform = `translateX(${v}px)`) });
//   s.to(200);                                        // settles, no bounce
//   s.to(0, { velocity: -1800, damping: 0.85 });      // after a flick: carries the speed, a little bounce

// Apple-style springs: damping ratio + response (seconds), not mass/stiffness/damping.
// Interruptible by design: a new target keeps the current value and velocity.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

const active = new Set();
let last = 0;
function tick(now) {
  const dt = Math.min((now - last) / 1000, 1 / 30);
  last = now;
  for (const s of active) s._step(dt);
  if (active.size) requestAnimationFrame(tick);
}
function wake(s) {
  if (!active.size) { last = performance.now(); requestAnimationFrame(tick); }
  active.add(s);
}

export class Spring {
  constructor({ value = 0, damping = 1, response = 0.4, epsilon = 0.01, onUpdate = () => {}, onRest = () => {} } = {}) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.epsilon = epsilon;
    this.onUpdate = onUpdate;
    this.onRest = onRest;
    this.configure({ damping, response });
  }
  configure({ damping = this.damping, response = this.response } = {}) {
    this.damping = damping;
    this.response = response;
    this.k = (2 * Math.PI / response) ** 2; // stiffness for mass 1
    this.c = (4 * Math.PI * damping) / response; // damping coefficient for mass 1
    return this;
  }
  // Retarget from the live value. Pass velocity (units/s) to hand off a gesture.
  to(target, { velocity, damping, response } = {}) {
    if (damping !== undefined || response !== undefined) this.configure({ damping, response });
    if (velocity !== undefined) this.velocity = velocity;
    this.target = target;
    if (reduced.matches) return this.set(target);
    wake(this);
    return this;
  }
  // Jump with no animation (used while a finger is tracking 1:1).
  set(value) {
    active.delete(this);
    this.value = this.target = value;
    this.velocity = 0;
    this.onUpdate(value);
    return this;
  }
  stop() { // freeze at the presentation value, keep it grabbable
    active.delete(this);
    this.target = this.value;
    this.velocity = 0;
    return this;
  }
  get moving() { return active.has(this); }
  _step(dt) {
    const h = 1 / 240;
    for (let t = 0; t < dt; t += h) {
      const step = Math.min(h, dt - t);
      const a = -this.k * (this.value - this.target) - this.c * this.velocity;
      this.velocity += a * step;
      this.value += this.velocity * step;
    }
    if (Math.abs(this.velocity) < this.epsilon * 10 && Math.abs(this.value - this.target) < this.epsilon) {
      this.value = this.target;
      this.velocity = 0;
      active.delete(this);
      this.onUpdate(this.value);
      this.onRest(this.value);
      return;
    }
    this.onUpdate(this.value);
  }
}

// Momentum projection from the Designing Fluid Interfaces sample code.
export function project(velocity, decelerationRate = 0.998) {
  return (velocity / 1000) * decelerationRate / (1 - decelerationRate);
}

// Progressive resistance past a boundary.
export function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

// Velocity from the last ~100 ms of pointer samples, in px/s.
export class VelocityTracker {
  constructor() { this.samples = []; }
  reset() { this.samples = []; }
  add(pos, t = performance.now()) {
    this.samples.push({ pos, t });
    while (this.samples.length > 2 && t - this.samples[0].t > 100) this.samples.shift();
  }
  get velocity() {
    const s = this.samples;
    if (s.length < 2) return 0;
    const a = s[0], b = s[s.length - 1];
    const dt = (b.t - a.t) / 1000;
    return dt > 0 ? (b.pos - a.pos) / dt : 0;
  }
}

export const prefersReducedMotion = reduced;
