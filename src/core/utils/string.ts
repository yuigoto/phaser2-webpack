/**
 * core/utils/string
 * ----------------------------------------------------------------------
 * Core string utility functions.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Normalizes a string, leaving only letters, numbers and spaces.
 *
 * @param value
 *     String to normalize
 * @param compatibilityMode
 *     Defines which type of normalization to use, if NFKD (compatibility mode)
 *     or NFD (decomposition mode)
 * @returns
 */
export function normalizeString(
  value: string,
  compatibilityMode: boolean = false
): string {
  return value
    .normalize(compatibilityMode ? 'NFKD' : 'NFD')
    .replace(/[^a-zA-Z0-9\s]/g, '');
}

/**
 * Transforms a string into url-safe format.
 *
 * @param value
 *     String to transform
 * @param compatibilityMode
 *     Defines which type of normalization to use, if NFKD (compatibility mode)
 *     or NFD (decomposition mode)
 * @returns
 */
export function slugify(
  value: string,
  compatibilityMode: boolean = false
): string {
  return normalizeString(value, compatibilityMode)
    .replace(/\s/g, '-')
    .toLowerCase();
}
