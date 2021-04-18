import { AssetSound } from "core/types/assets";

/**
 * game/assets/AssetListSound
 * ----------------------------------------------------------------------
 * @since 0.0.1
 */
export const AssetListSound: Array<AssetSound> = [
  {
    name: "sound-door",
    file: [
      require("assets/audio/sound-door.mp3"),
      require("assets/audio/sound-door.ogg")
    ],
    autoDecode: false,
    ignore: false
  },
  {
    name: "sound-lock",
    file: [
      require("assets/audio/sound-lock.mp3"),
      require("assets/audio/sound-lock.ogg")
    ],
    autoDecode: false,
    ignore: false
  },
];
