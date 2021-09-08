/**
 * utils/array
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Removes an item from the array.
 *
 * Important to note that `item` must be a reference to the same item inside
 * the `array` value.
 *
 * @param array
 * @param item
 * @returns
 */
export const arrayErase = <T>(array: T[], item: T): T[] => {
  return array.filter((current) => current !== item);
};

/**
 * Flips a 2D array horizontally or vertically.
 *
 * @param array
 * @param vertical
 * @returns
 */
export const arrayFlip = <T>(
  array: Array<Array<T>>,
  vertical: boolean = false
): Array<Array<T>> => {
  let flipped: Array<Array<T>> = [];
  for (let y in array) {
    let column = array[y];
    for (let x in column) {
      let _x: number = vertical
        ? parseInt(x)
        : (parseInt(x) - (array.length - 1)) * -1;
      let _y: number = vertical
        ? (parseInt(y) - (column.length - 1)) * -1
        : parseInt(y);

      if (!flipped[_y]) flipped[_y] = [];
      if (array[_y][_x]) flipped[_y][_x] = array[y][x];
    }
  }
  return flipped;
};

/**
 * Returns the linear index of an item inside a 2D array, as if it was 1D.
 *
 * @param x
 * @param y
 * @param width
 * @returns
 */
export const arrayIndex = (x: number, y: number, width: number): number => {
  return y * width + x;
};

/**
 * Returns the linear index of an item inside a 3D array, as if it was 1D.
 *
 * @param x
 * @param y
 * @param z
 * @param width
 * @param height
 * @returns
 */
export const arrayIndex3D = (
  x: number,
  y: number,
  z: number,
  width: number,
  height: number
): number => {
  return z * width * height + y * width + x;
};

/**
 * Returns a random item from an array.
 *
 * @param array
 * @returns
 */
export const arrayRandom = <T>(array: Array<T>): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Rotates a 2D array clockwiser/counterclockwise, works best with fixed
 * width/height in the array.
 *
 * @param array
 * @param counterclockwise
 * @returns
 */
export const arrayRotate = <T>(
  array: Array<Array<T>>,
  counterclockwise: boolean = false
): Array<Array<T>> => {
  let rotated: Array<Array<T>> = [];

  for (let y in array) {
    let column = array[y];
    for (let x in column) {
      let _x = counterclockwise
        ? parseInt(y)
        : (parseInt(y) - (array.length - 1)) * -1;
      let _y = counterclockwise
        ? (parseInt(x) - (column.length - 1)) * -1
        : parseInt(x);

      if (!rotated[_y]) rotated[_y] = [];
      if (array[y][x]) rotated[_y][_x] = array[y][x];
    }
  }

  return rotated;
};

/**
 * Shuffles a 1D array.
 *
 * @param array
 * @returns
 */
export const arrayShuffle = <T>(array: Array<T>): Array<T> => {
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
};
