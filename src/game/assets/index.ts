/**
 * game/assets
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import { AssetList } from "core/types/assets";
import { BitmapFontList } from "game/assets/fonts";
import { ImageList } from "game/assets/images";
import { SoundList } from "game/assets/sounds";
import { SpriteSheetList } from "game/assets/spritesheets";

/**
 * Centralizes all asset lists for the game.
 */
export const Assets: AssetList = {
  bitmapFont: BitmapFontList,
  image: ImageList,
  sound: SoundList,
  spriteSheet: SpriteSheetList,
};
