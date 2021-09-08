/**
 * core/types
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Basic hash map.
 */
export type HashMap<T> = {
  [key: string]: T;
};

/**
 * 2-item tuple type.
 */
export type Couple<T, S> = [T, S];

/**
 * 3-item tuple type.
 */
export type Triplet<T, S, C> = [T, S, C];

/**
 * 4-item tuple type.
 */
export type Quad<T, S, C, X> = [T, S, C, X];

/**
 * 5-item tuple type.
 */
export type Quint<T, S, C, X, Y> = [T, S, C, X, Y];

/**
 * 6-item tuple type.
 */
export type Sextet<T, S, C, X, Y, Z> = [T, S, C, X, Y, Z];

/**
 * Describes a generic, responsive-type and mobile-first, object.
 */
export type Responsive<T> = {
  default: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};
