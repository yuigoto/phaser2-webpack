/**
 * webpack.config
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
require("dotenv/config");

const autoprefixer = require("autoprefixer");
const fs = require("fs");
const htmlInterpolate = require("interpolate-html-plugin");
const htmlWebpack = require("html-webpack-plugin");
const miniCssExtract = require("mini-css-extract-plugin");
const path = require("path");
const sass = require("sass");
const webpack = require("webpack");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const info = require("./src/info.json");

/**
 * Current working directory.
 *
 * @type {string}
 */
const WORK_DIR = process.cwd();

/**
 * Returns the entry point file name for the desired folder.
 *
 * @param {string} folder
 *     Path to the folder, relative to the repository root
 * @returns {string}
 */
const getEntryPointFile = (folder) => {
  const files = fs.readdirSync(path.resolve(WORK_DIR, folder));
  const extensions = ["ts", "js", "mjs"];
  for (let extension of extensions) {
    if (files.includes(`index.${extension}`)) return `index.${extension}`;
  }
  return `index.js`;
};

/**
 * Builds the configuration data for Webpack.
 *
 * @param {*} env
 *     Object containing environment variables
 * @param {*} argv
 *     Object containing command line arguments
 * @returns {import("webpack").Configuration}
 */
module.exports = (env, argv) => {
  const ASSET_PATHS = ["", "img", "fonts", "media", "data"].map(
    (item) =>
      new htmlWebpack({
        inject: false,
        filename:
          item.trim() !== ""
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

  const PRODUCTION = argv.mode === "production";

  const RESOLVE_PATHS = [path.resolve(WORK_DIR, "./src")];

  // LOADERS
  // --------------------------------------------------------------------

  /** @type {import("webpack").RuleSetUseItem} */
  const cssLoader = {
    loader: "css-loader",
    options: {
      importLoaders: 2,
      sourceMap: false,
    },
  };

  /** @type {import("webpack").RuleSetUseItem} */
  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      sourceMap: false,
      postcssOptions: {
        plugins: [
          autoprefixer({
            flexbox: "no-2009",
          }),
        ],
      },
    },
  };

  /** @type {import("webpack").RuleSetUseItem} */
  const sassLoader = {
    loader: "sass-loader",
    options: {
      implementation: sass,
      sourceMap: false,
      sassOptions: {
        precision: 8,
        outputStyle: "compressed",
        sourceComments: false,
        quietDeps: false,
        includePaths: [path.resolve(WORK_DIR, "src", "styles")],
      },
    },
  };

  /** @type {import("webpack").RuleSetUseItem} */
  const styleLoader = PRODUCTION ? miniCssExtract.loader : "style-loader";

  // CONFIGURATION
  // --------------------------------------------------------------------

  /** @type {import("webpack").Configuration} */
  const config = {};

  config.devServer = {
    historyApiFallback: true,
    hot: true,
    port: 1280,
  };

  config.devtool = PRODUCTION ? "source-map" : false;

  /**
   * The key order DOES matter in here.
   *
   * Vendor should ALWAYS come first.
   */
  config.entry = {
    vendor: ["p2", "pixi", "phaser"],
    index: {
      import: path.resolve(WORK_DIR, "./src", getEntryPointFile("./src")),
      dependOn: ["vendor"],
    },
  };

  config.mode = PRODUCTION ? "production" : "development";

  config.module = {
    rules: [
      {
        test: /\.(m?js|ts)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
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
          loader: "file-loader",
          options: {
            name: "[hash:8].[ext]",
            esModule: false,
            outputPath: "assets/img/",
            publicPath: "/assets/img/",
          },
        },
      },
      {
        test: /\.(eot|fnt|otf|ttf|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[hash:8].[ext]",
            esModule: false,
            outputPath: "assets/fonts/",
            publicPath: "/assets/fonts/",
          },
        },
      },
      {
        test: /\.(wav|mp3|mp4|avi|mpg|mpeg|mov|ogg|webm)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[hash:8].[ext]",
            esModule: false,
            outputPath: "assets/media/",
            publicPath: "/assets/media/",
          },
        },
      },
      {
        test: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[hash:8].[ext]",
            esModule: false,
            outputPath: "assets/data/",
            publicPath: "/assets/data/",
          },
        },
      },

      // PHASER DEPENDENCIES
      {
        test: /pixi\.js/,
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: {
                globalName: "PIXI",
                override: true,
              },
            },
          },
        ],
      },
      {
        test: /phaser-split\.js/,
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: {
                globalName: "Phaser",
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
            loader: "expose-loader",
            options: {
              exposes: {
                globalName: "p2",
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
  };

  config.output = {
    clean: true,
    filename: "[name].[hash:8].js",
    path: path.resolve(WORK_DIR, "build"),
    pathinfo: !PRODUCTION,
    publicPath: "/",
  };

  config.plugins = [
    ...ASSET_PATHS,

    new htmlWebpack({
      inject: true,
      filename: "index.html",
      template: path.resolve(WORK_DIR, "public", "index.html"),
      hash: true,
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),

    new htmlInterpolate({
      GAME_TITLE: `${info.name} | ${info.version} | ${info.author}`,
      GAME_AUTHOR: info.author,
      GAME_DESCRIPTION: info.description,
      GAME_URL: info.url,
      GAME_LANG: info.lang,
      GAME_KEYWORDS: info.keywords.join(", "),
      GAME_CANVAS_ID: process.env.GAME_CANVAS_ID,
      GAME_CANVAS_WIDTH: process.env.GAME_CANVAS_WIDTH,
      GAME_CANVAS_HEIGHT: process.env.GAME_CANVAS_HEIGHT,
    }),

    new miniCssExtract({
      filename: "css/[name].css",
      chunkFilename: "css/[name].[chunkname].css",
    }),

    new webpack.DefinePlugin({
      // Phaser canvas renderer type globals
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),

      // Passing environment variables as globals
      GAME_CANVAS_ID: process.env.GAME_CANVAS_ID,
      GAME_CANVAS_WIDTH: process.env.GAME_CANVAS_WIDTH,
      GAME_CANVAS_HEIGHT: process.env.GAME_CANVAS_HEIGHT,
    }),
  ];

  config.resolve = {
    modules: [...RESOLVE_PATHS, "node_modules"],
    extensions: [".js", ".mjs", ".ts"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "tsconfig.json",
      }),
    ],
    alias: {
      pixi: path.resolve(
        WORK_DIR,
        "node_modules",
        "phaser-ce/build/custom/pixi.js"
      ),
      phaser: path.resolve(
        WORK_DIR,
        "node_modules",
        "phaser-ce/build/custom/phaser-split.js"
      ),
      p2: path.resolve(
        WORK_DIR,
        "node_modules",
        "phaser-ce/build/custom/p2.js"
      ),
    },
  };

  config.stats = {
    colors: true,
    hash: false,
    version: false,
    timings: true,
    assets: true,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: false,
  };

  config.target = "web";

  return config;
};
