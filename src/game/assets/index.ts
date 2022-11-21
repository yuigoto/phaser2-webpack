/**
 * game/assets
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import { AssetList } from '@/core/types/assets';
import { BitmapFontList } from '@/game/assets/fonts';
import { ImageList } from '@/game/assets/image';
import { SoundList } from '@/game/assets/sound';
import { SpriteSheetList } from '@/game/assets/spritesheet';

/**
 * Asset store master.
 */
const Assets: AssetList = {
  bitmapFont: BitmapFontList,
  image: ImageList,
  sound: SoundList,
  spriteSheet: SpriteSheetList,
};

export default Assets;
