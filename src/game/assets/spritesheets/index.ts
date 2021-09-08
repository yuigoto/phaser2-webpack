/**
 * game/assets/spritesheet
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import { AssetSpriteSheet } from "core/types/assets";

/**
 * Stores all sprite sheet data.
 */
export const SpriteSheetList: Array<AssetSpriteSheet> = [
  {
    name: "spritesheet.corridor",
    file: require("assets/img/spritesheet.corridor.png"),
    frameWidth: 64,
    frameHeight: 64,
    frameMax: 12,
    margin: 0,
    spacing: 0,
    skipFrames: 0,
    ignore: false,
  },
];
