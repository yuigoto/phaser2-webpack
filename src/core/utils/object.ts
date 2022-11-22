/**
 * core/utils/object
 * ----------------------------------------------------------------------
 * Core object utility functions.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import { hasOwn } from '@/core/utils';

/**
 * Serializes an object to a string, based on jQuery's `param` function.
 *
 * @param value
 *     Object to serialize
 * @returns
 */
export function serialize(value: any): string {
  const serialized: Array<string> = [];

  /**
   * Adds a key/value pair to the serialized array.
   *
   * @param name
   *     Key name
   * @param value
   *     Value
   */
  const add = (name: string, value: any): void => {
    let _value = value instanceof Function ? value() : value;
    if (!_value) _value = '';
    serialized.push(
      encodeURIComponent(name) + '=' + encodeURIComponent(_value)
    );
  };

  /**
   * Builds a serialized string from an object.
   *
   * @param data
   *     Object to serialize
   * @param prefix
   *     Prefix to add to the key name
   * @returns
   */
  const build = (data: any, prefix?: string): Array<string> => {
    if (prefix) {
      if (Array.isArray(data)) {
        for (let key in data) {
          const _key = typeof data[key] === 'object' && data[key] ? key : '';
          build(data[key], `${prefix}[${_key}]`);
        }
      } else if (typeof data === 'object') {
        for (let key in data) {
          build(data[key], `${prefix}[${key}]`);
        }
      } else {
        add(prefix, data);
      }
    } else if (Array.isArray(data)) {
      for (let key in data) {
        if (hasOwn(data[key], 'name') && hasOwn(data[key], 'value')) {
          add(data[key].name, data[key].value);
        } else {
          build(data[key], `[${key}]`);
        }
      }
    } else {
      for (let key in data) {
        build(data[key], key);
      }
    }

    return serialized;
  };

  return build(value).join('&');
}
