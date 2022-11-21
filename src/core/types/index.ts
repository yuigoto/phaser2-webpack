/**
 * core/types
 * ----------------------------------------------------------------------
 * Core types.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Tuple of 2 elements.
 */
export type Couple<T, S> = [T, S];

/**
 * Tuple of 3 elements.
 */
export type Triplet<T, S, C> = [T, S, C];

/**
 * Tuple of 4 elements.
 */
export type Quad<T, S, C, X> = [T, S, C, X];

/**
 * Tuple of 5 elements.
 */
export type Quint<T, S, C, X, Y> = [T, S, C, X, Y];

/**
 * Tuple of 6 elements.
 */
export type Sextet<T, S, C, X, Y, Z> = [T, S, C, X, Y, Z];

/**
 * Responsive type.
 */
export type Responsive<T> = {
  /**
   * Default value, also serves as the xs (extra small) value.
   */
  default: T;

  /**
   * Small value.
   */
  sm?: T;

  /**
   * Medium value.
   */
  md?: T;

  /**
   * Large value.
   */
  lg?: T;

  /**
   * Extra large value.
   */
  xl?: T;

  /**
   * Extra extra large value.
   */
  xxl?: T;
};
