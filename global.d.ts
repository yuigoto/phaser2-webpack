/**
 * global.d.ts
 * ----------------------------------------------------------------------
 * This file is used to declare global types and interfaces.
 *
 * We also define default modules for some file types, so we can import'em
 * as modules without having type errors.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Game canvas ID, from environment file.
 */
declare const GAME_CANVAS_ID: string;

/**
 * Game canvas width, from environment file.
 */
declare const GAME_CANVAS_WIDTH: number;

/**
 * Game canvas height, from environment file.
 */
declare const GAME_CANVAS_HEIGHT: number;

declare module '*.bmp';
declare module '*.gif';
declare module '*.ico';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.tif';
declare module '*.webp';

declare module '*.7zip';
declare module '*.doc';
declare module '*.docx';
declare module '*.exe';
declare module '*.msi';
declare module '*.pdf';
declare module '*.ppt';
declare module '*.pptx';
declare module '*.rar';
declare module '*.tar.gz';
declare module '*.xls';
declare module '*.xlsx';
declare module '*.zip';

declare module '.eot';
declare module '.fnt';
declare module '.otf';
declare module '.ttf';
declare module '.woff';
declare module '.woff2';

declare module '*.avi';
declare module '*.flac';
declare module '*.m4a';
declare module '*.mp3';
declare module '*.mp4';
declare module '*.mpeg';
declare module '*.mpg';
declare module '*.ogg';
declare module '*.wav';
declare module '*.webm';
declare module '*.wma';
declare module '*.wmv';
