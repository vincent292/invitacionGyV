import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CoverCloseGesture } from '../src/cover-gesture.ts';

test('a deliberate new upward gesture on the cover closes once', () => {
  const gesture = new CoverCloseGesture();
  assert.equal(gesture.push(-40, 0, true, false), false);
  assert.equal(gesture.push(-65, 30, true, false), true);
  assert.equal(gesture.push(-200, 60, true, false), false);
});
test('inertia arriving from a different chapter cannot close the cover', () => {
  const gesture = new CoverCloseGesture();
  assert.equal(gesture.push(-180, 0, false, false), false);
  assert.equal(gesture.push(-120, 100, true, true), false);
  assert.equal(gesture.push(-120, 200, true, false), false);
  assert.equal(gesture.push(-120, 600, true, false), true);
});
test('the gesture used immediately after opening remains blocked through its tail', () => {
  const gesture = new CoverCloseGesture();
  assert.equal(gesture.push(-150, 0, true, true), false);
  assert.equal(gesture.push(-150, 100, true, false), false);
  assert.equal(gesture.push(-150, 400, true, false), true);
});
test('scrolling down never closes, even when the gesture began on the cover', () => {
  const gesture = new CoverCloseGesture();
  assert.equal(gesture.push(200, 0, true, false), false);
  assert.equal(gesture.push(-200, 100, false, false), false);
  assert.equal(gesture.push(-200, 200, true, false), false);
});
test('a minor upward scroll is insufficient', () => {
  const gesture = new CoverCloseGesture();
  assert.equal(gesture.push(-10, 0, true, false), false);
  assert.equal(gesture.push(-10, 300, true, false), false);
  assert.equal(gesture.push(-10, 600, true, false), false);
});

test('a fresh downward gesture at the end closes once', () => {
  const gesture = new CoverCloseGesture(1);
  assert.equal(gesture.push(45, 0, true, false), false);
  assert.equal(gesture.push(60, 30, true, false), true);
  assert.equal(gesture.push(200, 60, true, false), false);
});
test('the gesture arriving at the final page cannot close it', () => {
  const gesture = new CoverCloseGesture(1);
  assert.equal(gesture.push(180, 0, false, false), false);
  assert.equal(gesture.push(180, 100, true, true), false);
  assert.equal(gesture.push(180, 200, true, false), false);
  assert.equal(gesture.push(180, 500, true, false), true);
});
test('reading upward on the last page never closes it', () => {
  const gesture = new CoverCloseGesture(1);
  assert.equal(gesture.push(-200, 0, true, false), false);
  assert.equal(gesture.push(200, 30, false, false), false);
});
test('a gesture while the final page still has content below cannot close', () => {
  const gesture = new CoverCloseGesture(1);
  assert.equal(gesture.push(200, 0, false, false), false);
  assert.equal(gesture.push(200, 100, true, false), false);
});
