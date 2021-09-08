/**
 * utils
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Alias for `hasOwnProperty`.
 */
const HAS_OWN = Object.prototype.hasOwnProperty;

/**
 * Checks if an object has the specified own property.
 *
 * @param object
 * @param property
 * @returns
 */
export const hasOwn = (object: any, property: string): boolean => {
  return HAS_OWN.call(object, property);
};

/**
 * Describes a log message, when using grouped logs.
 */
type LoggerConfig = {
  /**
   * Place where the log is being called.
   */
  place: string;

  /**
   * Message to log.
   */
  message?: string;

  /**
   * A callable, with additional data to log.
   */
  additionalLog?: () => any | void;
};

/**
 * Logs data to console.
 *
 * @param data
 * @param config
 */
export const logger = (data: any, config: LoggerConfig | null = null) => {
  if (config) {
    console.groupCollapsed(`[${config.place}]`);
    if (config.message) {
      console.log(config.message);
    }
    if (config.additionalLog instanceof Function) {
      config.additionalLog();
    }
    console.log(e);
    console.groupEnd();
  } else {
    console.log(data);
  }
};
