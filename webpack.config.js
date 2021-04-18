require("dotenv/config");

const path = require("path");
const webpack = require("webpack");
const miniCssExtract = require("mini-css-extract-plugin");
const htmlMinimize = require("html-minimizer-webpack-plugin");
const htmlWebpack = require("html-webpack-plugin");
const htmlInterpolate = require("interpolate-html-plugin");
const copyWebpack = require("copy-webpack-plugin");
const info = require("./src/info.json");

/**
 * webpack.config
 * ----------------------------------------------------------------------
 * Webpack configuration file.
 * 
 * @type {import("webpack").Configuration}
 */
const config = {};

/**
 * Defines execution mode (more like "does some assertion").
 */
config.mode = (process.env.NODE_ENV === "production") 
  ? "production" 
  : "development";

/**
 * Build entry points.
 */
config.entry = {
  vendor: [
    "pixi",
    "p2", 
    "phaser",
  ],
  game: path.resolve(__dirname, "src", "index.ts"),
};

/**
 * Defines a devtool to help with debugging during development.
 */
config.devtool = (process.env.NODE_ENV === "development") ? "sourcemap" : false;

/**
 * Output file setup.
 */
config.output = {
  path: path.resolve(__dirname, "build"),
  filename: "js/[name].[chunkhash:8].js",
  chunkFilename: "js/[name].[chunkhash:8].chunk.js",
  publicPath: "/",
  clean: true,
};

/**
 * Rules for file matching.
 */
config.module = {
  /**
   * Media files, images and other data will be placed inside the `assets` 
   * folder when building/serving.
   */
  rules: [
    {
      test: /\.(wav|mp3|mp4|avi|mpg|mpeg|mov|ogg|webm)$/,
      use: {
        loader: "file-loader",
        options: {
          esModule: false,
          outputPath: "assets/media/",
          publicPath: "/assets/media/",
        }
      }
    },
    {
      test: /\.(png|jpg|jpeg|gif|webp)$/,
      use: {
        loader: "file-loader",
        options: {
          esModule: false,
          outputPath: "assets/img/",
          publicPath: "/assets/img/",
        }
      }
    },
    {
      test: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/,
      use: {
        loader: "file-loader",
        options: {
          esModule: false,
          outputPath: "assets/data/",
          publicPath: "/assets/data/",
        }
      }
    },
    {
      test: /\.(eot|fnt|otf|ttf|woff|woff2|svg)$/,
      use: {
        loader: "file-loader",
        options: {
          esModule: false,
          outputPath: "assets/fonts/",
          publicPath: "/assets/fonts/",
        }
      }
    },

    {
      test: /\.jsx?$/,
      use: "babel-loader",
      exclude: /node_modules/
    },
    {
      test: /\.tsx?/,
      loader: "ts-loader",
      exclude: /node_modules/
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader", 
        {
          loader: miniCssExtract.loader,
          options: {
            esModule: false
          }
        },
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            implementation: require("sass"),
            sourceMap: false,
            sassOptions: {
              precision: 8,
              outputStyle: "compressed",
              sourceComments: false,
              includePaths: [
                // This one resolves absolute imports for SCSS files
                path.resolve(__dirname, "src", "styles")
              ]
            }
          }
        }
      ]
    },

    /**
     * This part here is used to expose the Phaser dependencies for our project 
     * so they can be imported by our `vendor` entry point above.
     */
    {
      test: /pixi\.js/,
      use: [
        {
          loader: "expose-loader",
          options: {
            exposes: {
              globalName: "PIXI",
              override: true
            }
          }
        }
      ]
    },
    {
      test: /phaser-split\.js/,
      use: [
        {
          loader: "expose-loader",
          options: {
            exposes: {
              globalName: "Phaser",
              override: true
            }
          }
        }
      ]
    },
    {
      test: /p2\.js/,
      use: [
        {
          loader: "expose-loader",
          options: {
            exposes: {
              globalName: "p2",
              override: true
            }
          }
        }
      ]
    },
  ]
};

/**
 * Optimization setup.
 */
config.optimization = {
  minimize: true, 
  minimizer: [
    new htmlMinimize({
      minimizerOptions: {
        collapseWhitespace: true,
      },
    }),
  ],
  splitChunks: {
    cacheGroups: {
    }
  }
};

/**
 * Plugins for our build.
 */
config.plugins = [
  new htmlWebpack({
    inject: true,
    filename: "index.html",
    template: path.join(__dirname, "public", "index.html"),
    hash: true,
    minify: {
      minifyJS: true,
      minifyCSS: true,
      removeComments: true,
      collapseWhitespace: true
    }
  }),
  new miniCssExtract({
    filename: "css/[name].css",
    chunkFilename: "css/[name].[chunkname].css"
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

  /**
   * This works like `create-react-app`'s interpolation for HTML files.
   * 
   * The values here are used to replace the template tags on our `index.html` 
   * file.
   */
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

  /**
   * Ensuring our static assets are properly copied to the build folder.
   */
  new copyWebpack({
    patterns: [
      {
        from: "public",
        to: "",
        toType: "dir",
        globOptions: {
          dot: true,
          ignore: [
            "**/*.html",
          ]
        }
      }
    ]
  }),
];

/**
 * Module resolution handlers.
 */
config.resolve = {
  modules: [
    path.resolve(__dirname, "./src"),
    "node_modules"
  ],
  extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
  alias: {
    pixi: path.join(__dirname, "node_modules/phaser-ce/build/custom/pixi.js"),
    phaser: path.join(__dirname, "node_modules/phaser-ce/build/custom/phaser-split.js"),
    p2: path.join(__dirname, "node_modules/phaser-ce/build/custom/p2.js"),
  },

  // Required for Webpack 5 (no polyfill fallback)
  fallback: {
    path: false,
    fs: false
  }
};

module.exports = config;
