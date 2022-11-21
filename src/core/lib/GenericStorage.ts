/**
 * core/lib/GenericStorage
 * ----------------------------------------------------------------------
 * Generic storage utilities, by default using `localStorage` as the storage,
 * falling back to `IncognitoStorage` if not available (like when using private
 * navigation).
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import IncognitoStorage from '@/core/lib/IncognitoStorage';

/**
 * Clears the entire storage.
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (err) {
    console.groupCollapsed('[STORAGE/clear]: Clearing in-memory storage');
    console.error(err);
    console.groupEnd();
  }
}

/**
 * Retrieves a value from storage.
 *
 * @param key
 *     Key to retrieve
 * @returns
 */
export function getStorage(key: string): any {
  let data: any = null;

  try {
    data = localStorage.getItem(key);
  } catch (err) {
    console.groupCollapsed(
      `[STORAGE/get]: Using in-memory storage for "${key}"`
    );
    console.error(err);
    console.groupEnd();

    IncognitoStorage.getItem(key);
  }

  return JSON.parse(data);
}

/**
 * Removes a value from storage.
 *
 * @param key
 *     Key to remove
 */
export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.groupCollapsed(
      `[STORAGE/remove]: Removing from in-memory storage "${key}"`
    );
    console.error(err);
    console.groupEnd();

    IncognitoStorage.removeItem(key);
  }
}

/**
 * Stores a value in storage.
 *
 * @param key
 *     Key to store
 * @param data
 *     Data to store
 */
export function setStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.groupCollapsed(
      `[STORAGE/set]: Setting in-memory storage for "${key}"`
    );
    console.error(err);
    console.groupEnd();

    IncognitoStorage.setItem(key, data);
  }
}

/**
 * Retrieves a key from its index.
 *
 * @param index
 *     Index to retrieve
 * @returns
 */
export function storageKey(index: number): string | null {
  let key: string | null = null;

  try {
    key = localStorage.key(index);
  } catch (err) {
    console.groupCollapsed('[STORAGE/key]: Retrieving in-memory storage key');
    console.error(err);
    console.groupEnd();

    key = IncognitoStorage.key(index);
  }

  return key;
}

/**
 * Returns the number of keys in storage.
 *
 * @returns
 */
export function storageLength(): number {
  let length: number = 0;

  try {
    length = localStorage.length;
  } catch (err) {
    console.groupCollapsed(
      '[STORAGE/length]: Retrieving in-memory storage length'
    );
    console.error(err);
    console.groupEnd();

    length = IncognitoStorage.length;
  }

  return length;
}
