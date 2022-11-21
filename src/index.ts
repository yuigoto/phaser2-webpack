/**
 * index
 * ----------------------------------------------------------------------
 * Main application entry point.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import Main from '@/main';
import { onDocumentReady } from '@/core/utils';
import '@/assets/scss/main.scss';

/**
 * Main entry point.
 */
onDocumentReady(() => {
  new Main();
});
