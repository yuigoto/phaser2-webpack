/**
 * core/utils
 * ----------------------------------------------------------------------
 * Core utility functions.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import { DOCUMENT_READY_STATE } from '@/core/constants';

/**
 * Executes callback when document is ready.
 *
 * @param callback
 *     Callback to execute when document is ready.
 */
export function onDocumentReady(callback: (event: Event) => void) {
  if (DOCUMENT_READY_STATE.includes(document.readyState)) {
    setTimeout(callback, 1);
  } else {
    try {
      document.addEventListener('DOMContentLoaded', callback, false);
    } catch (e) {
      window.addEventListener('DOMContentLoaded', callback, false);
      console.groupCollapsed('[ON DOCUMENT READY]: Error');
      console.error(e);
      console.groupEnd();
    }
  }
}

/**
 * Guarantees that `property` exists in `value`.
 *
 * @param value
 *     Value to check
 * @param property
 *     Property to check
 * @returns
 */
export function hasOwn(value: any, property: string): boolean {
  return value && Object.prototype.hasOwnProperty.call(value, property);
}

/**
 * Describes a log message, when grouping logs.
 */
type LoggerConfig = {
  /**
   * Location where the log is coming from.
   */
  location: string;

  /**
   * Message to log.
   */
  message?: string;

  /**
   * Callable with additional data for logging.
   */
  additionalData?: () => any | void;
};

/**
 * Logs a message to the console.
 *
 * @param data
 *     Data to log
 * @param config
 *     Optional configuration for the log
 */
export function logger(data: any, config: LoggerConfig | null = null) {
  if (config) {
    console.groupCollapsed(
      `[${config.location}]${': ' + config.message || ''}`
    );
    console.log(data);
    if (config.additionalData && config.additionalData instanceof Function) {
      console.log(config.additionalData());
    }
    console.groupEnd();
  } else {
    console.log(data);
  }
}
