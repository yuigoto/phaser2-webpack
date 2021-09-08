/**
 * global.d
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

// GLOBALS
// ----------------------------------------------------------------------

/**
 * Game canvas ID.
 *
 * Comes from the `.env` file.
 */
declare const GAME_CANVAS_ID: string;

/**
 * Game canvas width.
 *
 * Comes from the `.env` file.
 */
declare const GAME_CANVAS_WIDTH: number;

/**
 * Game canvas height.
 *
 * Comes from the `.env` file.
 */
declare const GAME_CANVAS_HEIGHT: number;

// IMAGE
// ----------------------------------------------------------------------
declare module "*.bmp";
declare module "*.gif";
declare module "*.ico";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
declare module "*.tif";
declare module "*.webp";

// FILE
// ----------------------------------------------------------------------
declare module "*.7zip";
declare module "*.doc";
declare module "*.docx";
declare module "*.exe";
declare module "*.msi";
declare module "*.pdf";
declare module "*.ppt";
declare module "*.pptx";
declare module "*.rar";
declare module "*.tar.gz";
declare module "*.xls";
declare module "*.xlsx";
declare module "*.zip";

// FONT
// ----------------------------------------------------------------------
declare module ".eot";
declare module ".fnt";
declare module ".otf";
declare module ".ttf";
declare module ".woff";
declare module ".woff2";

// MEDIA
// ----------------------------------------------------------------------
declare module "*.avi";
declare module "*.flac";
declare module "*.m4a";
declare module "*.mp3";
declare module "*.mp4";
declare module "*.mpeg";
declare module "*.mpg";
declare module "*.ogg";
declare module "*.wav";
declare module "*.webm";
declare module "*.wma";
declare module "*.wmv";
