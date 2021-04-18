import { HashMap } from "core/types";

/**
 * core/types/assets
 * ----------------------------------------------------------------------
 * Typings for assets.
 * 
 * @since 0.0.1
 */

/**
 * Defines basic asset properties.
 */
export type Asset = HashMap<any> & {
  /**
   * In-game asset name, used to retrieve this asset from cache.
   */
  name: string;

  /**
   * Asset file path.
   */
  file: string;

  /**
   * Defines if the asset should be ignored by the preloader.
   */
  ignore: boolean;
};

/**
 * Defines basic asset properties without the file.
 */
export type AssetNoFile<T = Asset> = T extends Asset ? Omit<T, "file"> : never;

/**
 * Defines properties for assets of type "bitmap font".
 */
export type AssetBitmapFont = Asset & {
  /**
   * Path to the file containing the texture atlas for the bitmap font, in 
   * XML/JSON formats.
   */
  atlas?: string | undefined;
  
  /**
   * String with the atlas data in XML/JSON format, optional.
   */
  atlasData?: string | undefined;
};

/**
 * Defines properties for assets of type "image".
 */
export type AssetImage = Asset & {
  /**
   * Defines if this sprite should overwrite an unloaded file with the same 
   * name/key.
   */
  overwrite: boolean;
};

/**
 * Defines properties for assets of type "sound".
 */
export type AssetSound = AssetNoFile & {
  /**
   * Path to the file, or array of paths, for the current sound.
   * 
   * Overwrites the parent `file`, since sounds can be loaded on multiple 
   * formats (mp3, ogg, wav).
   */
  file: string | Array<string>;

  /**
   * If the sound should be automatically decoded during load time.
   * 
   * If false, it is decoded during run time.
   * 
   * IMPORTANT:
   * Decoding for web audio consumes CPU.
   */
  autoDecode: boolean;
};

/**
 * Defines properties for assets of type "sprite sheet".
 */
export type AssetSpriteSheet = Asset & {
  /**
   * Fixed frame width.
   */
  frameWidth: number;

  /**
   * Fixed frame height.
   */
  frameHeight: number;

  /**
   * How many frames are in this sprite sheet, optional.
   * 
   * If not specified, it will be cut until the end.
   */
  frameMax?: number;

  /**
   * Margin around each frame, in pixels, optional.
   */
  margin?: number;

  /**
   * Spacing around each frame, in pixels, optional.
   */
  spacing?: number;

  /**
   * Number of frames to skip when reading the sprite sheet file, most useful 
   * for images with more than one animation.
   */
  skipFrames?: number;
};

/**
 * Asset list store type.
 *
 * Defines what you need to have a centralized asset store.
 */
export type AssetList = HashMap<any> & {
  image?: Array<AssetImage>,
  sound?: Array<AssetSound>,
  spriteSheet?: Array<AssetSpriteSheet>,
  bitmapFont?: Array<AssetBitmapFont>
};
