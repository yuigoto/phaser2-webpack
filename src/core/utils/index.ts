/**
 * core/utils
 * ----------------------------------------------------------------------
 * Generic utilities.
 * 
 * @since 0.0.1
 */

/**
 * Clamps `value` between `min` and `max`.
 * 
 * @param value 
 *     Value to test
 * @param min 
 *     Minimum accepted value
 * @param max 
 *     Maximum accepted value
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(value, max));
};
