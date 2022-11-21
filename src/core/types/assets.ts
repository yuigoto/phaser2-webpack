/**
 * core/types/assets
 * ----------------------------------------------------------------------
 * Core types for assets.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Basic asset.
 */
export type Asset = Record<string, any> & {
  /**
   * Asset name, must be unique.
   */
  name: string;

  /**
   * Asset file path.
   */
  file: string;

  /**
   * If the asset should be ignored by the loader.
   */
  ignore: boolean;
};

/**
 * Bitmap font asset type.
 */
export type AssetBitmapFont = Asset & {
  /**
   * Path to the file containing the bitmap font's texture atlas, in JSON/XML
   * formats.
   */
  atlas?: string | undefined;

  /**
   * String with the atlas data in JSON/XML format, required if atlas is not
   * provided.
   */
  atlasData?: string | undefined;
};

/**
 * Image asset type.
 */
export type AssetImage = Asset & {
  /**
   * Defines if this sprite should overwrite an unloaded file with the same
   * name or key.
   */
  overwrite?: boolean;
};

/**
 * Sound asset type.
 */
export type AssetSound = Omit<Asset, 'file'> & {
  /**
   * Path to a file, or array of paths, for the current sound.
   *
   * Overwrites the parent `file`, since sounds can be loaded on multiple
   * formats (mp3, ogg, wav).
   */
  file: string | Array<string>;

  /**
   * If the sound should be automatically decoded during the load process.
   *
   * If false, the sound will be decoded when it is first played.
   *
   * IMPORTANT:
   * Decoding web audio is expensive, so it's best to leave this set to false
   * and let the browser do it when it needs to.
   */
  autoDecode: boolean;
};

/**
 * Sprite sheet asset type.
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
   * How many frames are in the sprite sheet.
   *
   * If not provided, it will be calculated based on the image size.
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
   * Number of frames to skip when reading the sprite sheet, useful if the
   * spritesheet contains more than one animation.
   */
  skipFrames?: number;
};

/**
 * Asset list, used to group all assets under a single tree.
 */
export type AssetList = Record<string, any> & {
  /**
   * Bitmap font asset list.
   */
  bitmapFont?: Array<AssetBitmapFont>;

  /**
   * Image asset list.
   */
  image?: Array<AssetImage>;

  /**
   * Sound asset list.
   */
  sound?: Array<AssetSound>;

  /**
   * Sprite sheet asset list.
   */
  spriteSheet?: Array<AssetSpriteSheet>;
};
