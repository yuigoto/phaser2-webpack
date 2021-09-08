/**
 * game/assets/fonts
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import { AssetBitmapFont } from "core/types/assets";

/**
 * Holds data for all bitmap fonts.
 */
export const BitmapFontList: Array<AssetBitmapFont> = [
  {
    name: "yx_ui",
    file: require("assets/fonts/yx.ui.png"),
    atlas: require("assets/fonts/yx.ui.fnt"),
    atlasData: undefined,
    ignore: false,
  },
];
