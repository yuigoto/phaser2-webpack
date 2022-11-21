/**
 * webpack.config
 * ----------------------------------------------------------------------
 * Webpack configuration file.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
require('dotenv/config');

const { readdirSync } = require('fs');
const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const sass = require('sass');
const copyWebpackPlugin = require('copy-webpack-plugin');
const interpolateHtmlPlugin = require('interpolate-html-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const packageInfo = require('./package.json');

// CONSTANTS
// ----------------------------------------------------------------------

/**
 * Current working directory, relative to the directory of the main caller,
 * usually the repository's root.
 *
 * @type {string}
 */
const WORK_DIR = process.cwd();

/**
 * SASS root directory, so we don't have to import everything and are able
 * to make auto imports possible.
 *
 * @type {string}
 */
const SASS_ROOT = resolve(WORK_DIR, 'src', 'assets', 'scss').replace(
  /\\/g,
  '/'
);

/**
 * Global SASS/SCSS imports, so we don't have to manually add global utilities
 * and variables.
 *
 * @type {string}
 */
const SASS_GLOBAL_IMPORTS = `@import "${SASS_ROOT}/variables";
@import "${SASS_ROOT}/functions";
@import "${SASS_ROOT}/mixins";`;

// HELPERS
// ----------------------------------------------------------------------

/**
 * Retrieves the entry point file from the desired folder.
 *
 * @param {string} folder
 *     Path to the folder to check, relative to the repository root
 * @returns {string}
 */
function getEntryPointFromFolder(folder) {
  const files = readdirSync(resolve(WORK_DIR, folder));
  // Order of priority!
  const extensions = ['ts', 'js', 'mjs'];
  for (let extension of extensions) {
    if (files.includes(`index.${extension}`)) return `index.${extension}`;
  }
  return `index.js`;
}

// WEBPACK CONFIGURATION
// ----------------------------------------------------------------------

/**
 *
 * @param {*} env
 * @param {*} argv
 * @returns {import("webpack").Configuration}
 */
module.exports = (env, argv) => {
  const ASSET_PATH_INDEX = ['', 'audio', 'data', 'fonts', 'img'].map(
    (item) =>
      new htmlWebpackPlugin({
        inject: false,
        filename:
          item.trim() !== ''
            ? `assets/${item}/index.html`
            : `assets/index.html`,
        templateContent: `<!doctype html><html><head><title>Not Allowed</title><meta http-equiv="refresh" content="0; url=/"></head></html>`,
        hash: true,
        minify: {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true,
        },
      })
  );

  const PRODUCTION = argv?.mode === 'production';

  const RESOLVE_PATHS = [resolve(WORK_DIR, 'src')];

  // LOADERS
  // --------------------------------------------------------------------

  /** @type {import("webpack").RuleSetUseItem} */
  const cssLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: false,
    },
  };

  /** @type {import("webpack").RuleSetUseItem} */
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: false,
      postcssOptions: {
        plugins: [autoprefixer({ flexbox: 'no-2009' })],
      },
    },
  };

  /** @type {import("webpack").RuleSetUseItem} */
  const sassLoader = {
    loader: 'sass-loader',
    options: {
      additionalData: SASS_GLOBAL_IMPORTS,
      implementation: sass,
      sassOptions: {
        includePaths: [resolve(SASS_ROOT)],
        precision: 8,
        quietDeps: true,
        outputStyle: 'compressed',
        sourceComments: false,
      },
      sourceMap: false,
    },
  };

  /** @type {import("webpack").RuleSetUseItem} */
  const styleLoader = PRODUCTION ? miniCssExtractPlugin.loader : 'style-loader';

  /** @type {import("webpack").Configuration} */
  const config = {};

  config.devServer = {
    historyApiFallback: true,
    hot: true,
    port: 1280,
  };

  config.devtool = PRODUCTION ? false : 'source-map';

  /**
   * The key order is important here, vendors first, then the rest.
   */
  config.entry = {
    vendor: ['p2', 'pixi', 'phaser'],
    index: {
      import: resolve(WORK_DIR, 'src', getEntryPointFromFolder('src')),
      dependOn: ['vendor'],
    },
  };

  config.mode = PRODUCTION ? 'production' : 'development';

  config.module = {
    rules: [
      {
        test: /\.(m?js|ts)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              babelrc: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [styleLoader, cssLoader, postcssLoader, sassLoader],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            esModule: false,
            outputPath: 'assets/img/',
            publicPath: '/assets/img/',
          },
        },
      },
      {
        test: /\.(eot|fnt|otf|ttf|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            esModule: false,
            outputPath: 'assets/fonts/',
            publicPath: '/assets/fonts/',
          },
        },
      },
      {
        test: /\.(wav|mp3|mp4|avi|mpg|mpeg|mov|ogg|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            esModule: false,
            outputPath: 'assets/media/',
            publicPath: '/assets/media/',
          },
        },
      },
      {
        test: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            esModule: false,
            outputPath: 'assets/data/',
            publicPath: '/assets/data/',
          },
        },
      },

      // Handling Phaser Dependencies
      {
        test: /pixi\.js/,
        use: [
          {
            loader: 'expose-loader',
            options: {
              exposes: {
                globalName: 'PIXI',
                override: true,
              },
            },
          },
        ],
      },
      {
        test: /phaser-split\.js$/,
        use: [
          {
            loader: 'expose-loader',
            options: {
              exposes: {
                globalName: 'Phaser',
                override: true,
              },
            },
          },
        ],
      },
      {
        test: /p2\.js/,
        use: [
          {
            loader: 'expose-loader',
            options: {
              exposes: {
                globalName: 'p2',
                override: true,
              },
            },
          },
        ],
      },
    ],
  };

  config.optimization = {
    minimize: PRODUCTION,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: (module) => {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // If you want vendor modules grouped together in a single file:
            // return `npm.libs`;

            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  };

  config.output = {
    clean: true,
    filename: '[name].[contenthash].js',
    path: resolve(WORK_DIR, 'build').replace(/\\/g, '/'),
    pathinfo: !PRODUCTION,
    publicPath: '/',
  };

  config.performance = {
    maxEntrypointSize: 512000 * 8, // 4MB entry point size
    maxAssetSize: 512000 * 8, // 4MB asset size
  };

  config.plugins = [
    ...ASSET_PATH_INDEX,

    new copyWebpackPlugin({
      patterns: [
        {
          from: resolve(WORK_DIR, 'public'),
          to: '',
          toType: 'dir',
          globOptions: {
            dot: true,
            ignore: ['**/*.html'],
          },
        },
      ],
    }),

    new htmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: resolve(WORK_DIR, 'public', 'index.html'),
      hash: true,
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
    }),

    new interpolateHtmlPlugin({
      GAME_TITLE: `${packageInfo.name} | ${packageInfo.version} | ${packageInfo.author}`,
      GAME_AUTHOR: packageInfo.author,
      GAME_DESCRIPTION: packageInfo.description,
      GAME_URL: packageInfo.homepage,
      GAME_LANG: packageInfo.lang,
      GAME_KEYWORDS: packageInfo.keywords.join(', '),
      GAME_CANVAS_ID: process.env.GAME_CANVAS_ID,
      GAME_CANVAS_WIDTH: process.env.GAME_CANVAS_WIDTH,
      GAME_CANVAS_HEIGHT: process.env.GAME_CANVAS_HEIGHT,
    }),

    new miniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),

    new webpack.DefinePlugin({
      // Phaser canvas renderer type globals
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),

      // Passing environment variables as globals
      GAME_CANVAS_ID: process.env.GAME_CANVAS_ID,
      GAME_CANVAS_WIDTH: process.env.GAME_CANVAS_WIDTH,
      GAME_CANVAS_HEIGHT: process.env.GAME_CANVAS_HEIGHT,
    }),
  ];

  config.resolve = {
    modules: [...RESOLVE_PATHS, 'node_modules'],
    alias: {
      '@': resolve(WORK_DIR, 'src').replace(/\\/g, '/'),
      pixi: resolve(WORK_DIR, 'node_modules', 'phaser-ce/build/custom/pixi.js'),
      phaser: resolve(
        WORK_DIR,
        'node_modules',
        'phaser-ce/build/custom/phaser-split.js'
      ),
      p2: resolve(WORK_DIR, 'node_modules', 'phaser-ce/build/custom/p2.js'),
    },
    extensions: ['.js', '.mjs', '.ts'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.json',
      }),
    ],
    fallback: {
      fs: false,
      path: false,
    },
  };

  config.stats = {
    assets: true,
    children: false,
    chunkModules: true,
    chunks: false,
    colors: true,
    errorDetails: true,
    errors: true,
    errorsCount: true,
    errorStack: true,
    hash: false,
    modules: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: true,
    version: false,
    warnings: true,
  };

  config.target = 'web';

  return config;
};
