/**
 * core/utils/array
 * ----------------------------------------------------------------------
 * Core array utility functions.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

import { Axis } from '@/core/types/math';

/**
 * Removes an item from an array.
 *
 * @param array
 *     Array to remove item from
 * @param item
 *     Item to remove
 * @returns
 */
export function arrayErase<T = any>(array: Array<T>, item: T): Array<T> {
  return array.filter((i) => i !== item);
}

/**
 * Flips an array.
 *
 * @param array
 *     Array to flip
 * @returns
 */
export function arrayFlip<T = any>(array: Array<T>): Array<T> {
  return [...array.reverse()];
}

/**
 * Flips a 2D array horizontally or vertically.
 *
 * I know, it could be done without any loop, by using `array.reverse`, but
 * made it this way so you can understand what's going on.
 *
 * @param array
 *     Array to flip
 * @param vertical
 *     Whether to flip vertically or horizontally
 * @returns
 */
export function arrayFlip2d<T = any>(
  array: Array<Array<T>>,
  vertical: boolean = false
): Array<Array<T>> {
  let flipped: Array<Array<T>> = [];
  for (let y in array) {
    for (let x in array[y]) {
      let _x: number = vertical
        ? parseInt(x)
        : array[y].length - 1 - parseInt(x);
      let _y: number = vertical ? array.length - 1 - parseInt(y) : parseInt(y);

      if (!flipped[_y]) flipped[_y] = [];
      if (!flipped[_y][_x]) flipped[_y][_x] = array[y][x];
    }
  }
  return flipped;
}

/**
 * Returns the linear index of a 2D array.
 *
 * IMPORTANT: the array must be a square matrix.
 *
 * @param x
 *     X coordinate
 * @param y
 *     Y coordinate
 * @param width
 *     Width of the array
 * @returns
 */
export function arrayIndex(x: number, y: number, width: number): number {
  return y * width + x;
}

/**
 * Returns the linear index of a 3D array.
 *
 * IMPORTANT: the array must be a cube matrix.
 *
 * @param x
 *     X coordinate
 * @param y
 *     Y coordinate
 * @param z
 *     Z coordinate
 * @param width
 *     Width of the array
 * @param height
 *     Height of the array
 * @returns
 */
export function arrayIndex3d(
  x: number,
  y: number,
  z: number,
  width: number,
  height: number
): number {
  return z * width * height + y * width + x;
}

/**
 * Returns a random element from an array.
 *
 * @param array
 *     Array to get random element from
 * @returns
 */
export function arrayRandom<T = any>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Rotates an array clockwise or counter-clockwise.
 *
 * IMPORTANT: the array must be a square matrix.
 *
 * @param array
 *     Array to rotate
 * @param counterClockwise
 *     Whether to rotate counter-clockwise
 * @returns
 */
export function arrayRotate<T = any>(
  array: Array<Array<T>>,
  counterClockwise: boolean = false
): Array<Array<T>> {
  let rotated: Array<Array<T>> = [];
  for (let y in array) {
    for (let x in array[y]) {
      let _x = counterClockwise ? parseInt(y) : array.length - 1 - parseInt(y);
      let _y = counterClockwise ? array.length - 1 - parseInt(x) : parseInt(x);

      if (!rotated[_y]) rotated[_y] = [];
      if (!rotated[_y][_x]) rotated[_y][_x] = array[y][x];
    }
  }
  return rotated;
}

/**
 * Rotates a 3d array around an axis, clockwise or counter-clockwise.
 *
 * IMPORTANT: the array must be a cube matrix.
 *
 * @param array
 *     Array to rotate
 * @param axis
 *     Axis to rotate around
 * @param counterClockwise
 *     Whether to rotate counter-clockwise
 * @returns
 */
export function arrayRotate3d<T = any>(
  array: Array<Array<Array<T>>>,
  axis: Axis = 'x',
  counterClockwise: boolean = false
): Array<Array<Array<T>>> {
  let rotated: Array<Array<Array<T>>> = [];
  for (let z in array) {
    for (let y in array[z]) {
      for (let x in array[z][y]) {
        let _x: number;
        let _y: number;
        let _z: number;

        if (axis === 'x') {
          _x = parseInt(x);
          _y = counterClockwise
            ? array[z].length - 1 - parseInt(z)
            : parseInt(z);
          _z = counterClockwise
            ? parseInt(y)
            : array[z][y].length - 1 - parseInt(y);
        } else if (axis === 'y') {
          _x = counterClockwise
            ? parseInt(z)
            : array[z][y].length - 1 - parseInt(z);
          _y = parseInt(y);
          _z = counterClockwise
            ? array[z].length - 1 - parseInt(x)
            : parseInt(x);
        } else {
          _x = counterClockwise
            ? array[z][y].length - 1 - parseInt(y)
            : parseInt(y);
          _y = counterClockwise
            ? parseInt(x)
            : array[z].length - 1 - parseInt(x);
          _z = parseInt(z);
        }

        if (!rotated[_z]) rotated[_z] = [];
        if (!rotated[_z][_y]) rotated[_z][_y] = [];
        if (!rotated[_z][_y][_x]) rotated[_z][_y][_x] = array[z][y][x];
      }
    }
  }
  return rotated;
}

/**
 * Shuffles an array.
 *
 * @param array
 *     Array to shuffle
 * @returns
 */
export function arrayShuffle<T = any>(
  array: Array<T>,
  deep: boolean = true
): Array<T> {
  let shuffled: Array<T> = [...array];
  let length: number = shuffled.length;
  let temp: T;
  let index: number;

  while (length > 0) {
    index = Math.floor(Math.random() * length--);
    temp = shuffled[length];
    shuffled[length] = shuffled[index];
    shuffled[index] = temp;
  }

  return shuffled;
}

/**
 * Guarantees that every element in the array is unique.
 *
 * @param array
 *     Array to check
 * @returns
 */
export function arrayUnique<T = any>(array: Array<T>): Array<T> {
  return Array.from(new Set(array));
}
