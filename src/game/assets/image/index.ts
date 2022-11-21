/**
 * game/assets/fonts
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import { AssetImage } from '@/core/types/assets';

/**
 * Image asset store.
 */
export const ImageList: Array<AssetImage> = [
  {
    name: 'sprite.dial',
    file: require('@/assets/img/sprite.dial.png'),
    overwrite: false,
    ignore: false,
  },
];
