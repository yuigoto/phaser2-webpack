import { AssetSpriteSheet } from "core/types/assets";

/**
 * game/assets/AssetListSpriteSheet
 * ----------------------------------------------------------------------
 * @since 0.0.1
 */
export const AssetListSpriteSheet: Array<AssetSpriteSheet> = [
  {
    name: "bg-corridor-sprite",
    file: require("assets/img/sprite-sheet-corridor.png"),
    frameWidth: 64,
    frameHeight: 64,
    frameMax: 12,
    margin: 0,
    spacing: 0,
    skipFrames: 0,
    ignore: false
  }
];
