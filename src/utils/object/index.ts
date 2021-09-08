/**
 * utils/object
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import { hasOwn } from "utils";

/**
 * Data serialization helper, like `param` from `jQuery`.
 *
 * @param value
 * @returns
 */
export const serialize = (value: any): string => {
  const serialized: string[] = [];

  /**
   * Adds a key/value pair to the serialized data.
   *
   * @param name
   * @param value
   */
  const add = (name: string, value: any) => {
    let _value = value instanceof Function ? value() : value;
    if (!_value) _value = "";
    serialized.push(
      `${encodeURIComponent(name)}=${encodeURIComponent(_value)}`
    );
  };

  /**
   * Builds serialized data.
   *
   * @param data
   * @param prefix
   * @returns
   */
  const build = (data: any, prefix?: string): string[] => {
    if (prefix) {
      if (Array.isArray(data)) {
        for (let key in data) {
          const _key = typeof data[key] === "object" && data[key] ? key : "";
          build(data[key], `[${_key}]`);
        }
      } else if (String(data) === "[object Object]") {
        for (let key in data) {
          build(data[key], `[${key}]`);
        }
      } else {
        add(data, prefix);
      }
    } else if (Array.isArray(data)) {
      for (let key in data) {
        if (hasOwn(data[key], "name") && hasOwn(data[key], "value")) {
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

  return build(value).join("&");
};
