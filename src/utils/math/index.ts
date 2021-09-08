/**
 * utils/math
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Precomputed variable for degrees converson.
 */
const TO_DEG = 180 / Math.PI;

/**
 * Precomputed variable for radians converson.
 */
const TO_RAD = Math.PI / 180;

/**
 * Moves `value` towards `target` by adding/subtracting `step`.
 *
 * Use for simple tweens.
 *
 * @param value
 * @param target
 * @param step
 * @returns
 */
export const approach = (
  value: number,
  target: number,
  step: number
): number => {
  const _step = Math.abs(step);
  return value < target
    ? Math.min(value + _step, target)
    : Math.max(value - _step, target);
};

/**
 * Limits `value` between `min` and `max`.
 *
 * @param value
 * @param min
 * @param max
 * @returns
 */
export const clamp = (value: number, min: number, max: number): number => {
  return value > max ? max : value < min ? min : value;
};

/**
 * Returns the angle of a line between two points, always relative to the
 * first point, in degrees.
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */
export const getAngleFromPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  let _radians = Math.atan2(y2 - y1, x2 - x1);
  return toDeg(_radians);
};

/**
 * Returns the distance, in pixels, from points `x1, y1` and `x2, y2`.
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */
export const getPointsDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

/**
 * Returns the distance, in pixels, from points `x1, y1, z1` and `x2, y2, z2`.
 *
 * @param x1
 * @param y1
 * @param z1
 * @param x2
 * @param y2
 * @param z2
 * @returns
 */
export const getPointsDistance3D = (
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): number => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
};

/**
 * Returns the X coordinate of a point in a line, given the current X position,
 * angle and distance to travel.
 *
 * @param x
 * @param angle
 * @param distance
 * @returns
 */
export const lengthDirX = (
  x: number,
  angle: number,
  distance: number
): number => {
  return x + distance * Math.cos(toRad(angle));
};

/**
 * Returns the Y coordinate of a point in a line, given the current Y position,
 * angle and distance to travel.
 *
 * @param y
 * @param angle
 * @param distance
 * @returns
 */
export const lengthDirY = (
  y: number,
  angle: number,
  distance: number
): number => {
  return y + distance * Math.sin(toRad(angle));
};

/**
 * Guarantees that `degrees` will always remain between the `-180/180` range.
 *
 * @param degrees
 * @returns
 */
export const normalizeAngle = (degrees: number): number => {
  let _degs = degrees;
  while (_degs <= -180) _degs += 360;
  while (_degs >= 180) _degs -= 360;
  return _degs;
};

/**
 * Returns a pseudo-random value between `min` and `max`.
 *
 * @param min
 * @param max
 * @returns
 */
export const random = (min: number = 0, max: number = 2147483646): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Maps a `value` within the `iStart`/`iStop` range to the `oStart`/`oStop`
 * range, without clamping.
 *
 * @param input
 * @param iStart
 * @param iStop
 * @param oStart
 * @param oStop
 * @returns
 */
export const rangeMap = (
  input: number,
  iStart: number,
  iStop: number,
  oStart: number,
  oStop: number
): number => {
  return oStart + (oStop - oStart) * ((input - iStart) / (iStop / iStart));
};

/**
 * Rounds `value` to the desired precision, in decimal places.
 *
 * @param value
 * @param precision
 * @returns
 */
export const round = (value: number, precision: number = 0): number => {
  let _precision = 10 ** (precision || 0);
  return Math.round(value * _precision) / _precision;
};

/**
 * Converts `value` to degrees.
 *
 * @param value
 * @returns
 */
export const toDeg = (value: number): number => value * TO_DEG;

/**
 * Converts `value` to a hexadecimal string.
 *
 * @param value
 * @returns
 */
export const toHex = (value: number): string => value.toString(16);

/**
 * Converts `value` to an integer value, without ceil/floor, ignoress decimals.
 *
 * @param value
 * @returns
 */
export const toInt = (value: number): number => value | 0;

/**
 * Converts `value` to radians.
 *
 * @param value
 * @returns
 */
export const toRad = (value: number): number => value * TO_RAD;
