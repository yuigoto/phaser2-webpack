/**
 * core/utils/math
 * ----------------------------------------------------------------------
 * Core math utility functions.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import { Axis } from '@/core/types/math';

/**
 * Precomputed value for the `toDeg` function.
 */
const TO_DEG: number = 180 / Math.PI;

/**
 * Precomputed values for the `toRad` function.
 */
const TO_RAD: number = Math.PI / 180;

/**
 * Shifts `current` towards `target` by `step`.
 *
 * Useful for simple acceleration and deceleration.
 *
 * @param current
 *     Current or initial value
 * @param target
 *     Target value
 * @param step
 *     Step value
 * @returns
 */
export function approach(
  current: number,
  target: number,
  step: number
): number {
  return current < target
    ? Math.min(current + step, target)
    : Math.max(current - step, target);
}

/**
 * Limits `value` between `min` and `max`.
 *
 * @param value
 *     Value to limit
 * @param min
 *     Minimum value
 * @param max
 *     Maximum value
 * @returns
 */
export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

/**
 * Returns the angle between two points, in degrees, in a 2D plane.
 *
 * The angle is calculated from the `from` point to the `to` point.
 *
 * @param x1
 *     X coordinate of the first point
 * @param y1
 *     Y coordinate of the first point
 * @param x2
 *     X coordinate of the second point
 * @param y2
 *     Y coordinate of the second point
 * @returns
 */
export function getAngleBetweenPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return toDeg(Math.atan2(y2 - y1, x2 - x1));
}

/**
 * Returns the angle between two points, in degrees, in a 3D plane, relative to
 * the `axis` parameter.
 *
 * @param x1
 *     X coordinate of the first point
 * @param y1
 *     Y coordinate of the first point
 * @param z1
 *     Z coordinate of the first point
 * @param x2
 *     X coordinate of the second point
 * @param y2
 *     Y coordinate of the second point
 * @param z2
 *     Z coordinate of the second point
 * @param axis
 *     Axis to calculate the angle relative to
 * @returns
 */
export function getAngleBetweenPoints3d(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  axis: Axis = 'y'
): number {
  let x: number = x2 - x1;
  let y: number = y2 - y1;
  let z: number = z2 - z1;
  let angle: number = 0;

  switch (axis) {
    case 'x':
      angle = Math.atan2(y, z);
      break;
    case 'y':
      angle = Math.atan2(z, x);
      break;
    case 'z':
      angle = Math.atan2(x, y);
      break;
  }

  return toDeg(angle);
}

/**
 * Returns the distance, in pixels, between two points on a 2D plane.
 *
 * @param x1
 *     X coordinate of the first point
 * @param y1
 *     Y coordinate of the first point
 * @param x2
 *     X coordinate of the second point
 * @param y2
 *     Y coordinate of the second point
 */
export function getDistanceBetweenPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Returns the distance, in pixels, between two points on a 3D space.
 *
 * @param x1
 *     X coordinate of the first point
 * @param y1
 *     Y coordinate of the first point
 * @param z1
 *     Z coordinate of the first point
 * @param x2
 *     X coordinate of the second point
 * @param y2
 *     Y coordinate of the second point
 * @param z2
 *     Z coordinate of the second point
 * @returns
 */
export function getDistanceBetweenPoints3d(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}

/**
 * Returns the relative distance, on the X axis, between two pixels, given the
 * `length` of the line and the `angle` of the line.
 *
 * @param length
 *     Length of the line, in pixels
 * @param angle
 *     Angle of the line, in degrees
 * @returns
 */
export function lengthDirX(length: number, angle: number): number {
  return length * Math.cos(toRad(angle));
}

/**
 * Returns the relative distance, on the Y axis, between two pixels, given the
 * `length` of the line and the `angle` of the line.
 *
 * @param length
 *     Length of the line, in pixels
 * @param angle
 *     Angle of the line, in degrees
 * @returns
 */
export function lengthDirY(length: number, angle: number): number {
  return length * Math.sin(toRad(angle));
}

/**
 * Guarantees that `angle` will always remain between `-180` and `180` degrees,
 * while keeping the same direction.
 *
 * @param angle
 *     Angle, in degrees
 * @returns
 */
export function normalizeAngle(angle: number): number {
  let _angle: number = angle;
  while (_angle <= -180) _angle += 360;
  while (_angle > 180) _angle -= 360;
  return _angle;
}

/**
 * Returns a random number between `min` and `max`.
 *
 * @param min
 *     Minimum value
 * @param max
 *     Maximum value
 * @returns
 */
export function random(min: number = 0, max: number = 2147483647): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Maps a value from one range to another, without clamping it.
 *
 * @param input
 *     Value to map
 * @param iStart
 *     Start of the input range
 * @param iEnd
 *     End of the input range
 * @param oStart
 *     Start of the output range
 * @param oEnd
 *     End of the output range
 * @returns
 */
export function rangeMap(
  input: number,
  iStart: number,
  iEnd: number,
  oStart: number,
  oEnd: number
): number {
  return oStart + (oEnd - oStart) * ((input - iStart) / (iEnd - iStart));
}

/**
 * Rounds `value` to the desired `precision`.
 *
 * @param value
 *     Value to round
 * @param precision
 *     Decimal precision
 * @returns
 */
export function round(value: number, precision: number = 0): number {
  const factor: number = 10 ** (precision || 0);
  return Math.round(value * factor) / factor;
}

/**
 * Converts radians to degrees.
 *
 * @param radians
 *     Value in radians
 * @returns
 */
export function toDeg(radians: number): number {
  return radians * TO_DEG;
}

/**
 * Converts `value` to a hexadecimal string.
 *
 * @param value
 *     Value to convert
 * @returns
 */
export function toHex(value: number): string {
  return value.toString(16).padStart(2, '0');
}

/**
 * Converts `value` to an integer value, ignoring the decimal part, and without
 * using ceiling or floor.
 *
 * @param value
 *     Value to convert
 * @returns
 */
export function toInt(value: number): number {
  return value | 0;
}

/**
 * Converts degrees to radians.
 *
 * @param degrees
 *     Value in degrees
 * @returns
 */
export function toRad(degrees: number): number {
  return degrees * TO_RAD;
}
