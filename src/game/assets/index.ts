import { AssetList } from "core/types/assets";
import { AssetListImage } from "game/assets/AssetListImage";
import { AssetListSound } from "game/assets/AssetListSound";
import { AssetListBitmapFont } from "game/assets/AssetListBitmapFont";
import { AssetListSpriteSheet } from "game/assets/AssetListSpriteSheet";

/**
 * game/assets
 * ----------------------------------------------------------------------
 * Main object that centralizes all assets.
 *
 * @since 0.0.1
 */
export const Assets: AssetList = {
  bitmapFont: AssetListBitmapFont,
  image: AssetListImage,
  sound: AssetListSound,
  spriteSheet: AssetListSpriteSheet,
};
