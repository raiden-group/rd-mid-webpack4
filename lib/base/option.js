const path = require("path");
const defaultConfig = require("./default.config");
const utils = require("./utils");

// 处理配置项
module.exports = async function initOptions(ctx, opts) {
  if (!opts.browsersList) {
    opts.browsersList = opts.isMobile
      ? [
          "last 2 versions",
          "Firefox ESR",
          "> 1%",
          "ie >= 9",
          "iOS >= 8",
          "Android >= 4",
        ]
      : ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 9"];
  }
  opts.folders = Object.assign({}, defaultConfig.Folder, opts.folders || {});
  const manifest = utils.format("manifest", opts);
  const common = utils.format("common", opts);
  // optimization
  const optimization = {
    splitChunks: {
      automaticNameDelimiter: "-",
    },
    minimize: opts._dev_ ? false : opts.minimize !== false,
  };
  if (manifest.enable) {
    optimization.runtimeChunk = {
      name: manifest.name,
    };
  }
  if (common.enable) {
    optimization.splitChunks = Object.assign({}, optimization.splitChunks, {
      cacheGroups: {
        common: {
          name: common.name,
          chunks: opts.chunks || "initial",
        },
        default: false, // 取消默认default打包
      },
    });
  }
  let webpackConfig = {
    context: ctx.cwd,
    entry: opts.entry,
    mode: opts.env || (opts._dev_ ? "development" : "production"),
    output: {
      publicPath: opts.publicPath || "/",
      path: path.resolve(ctx.cwd, opts.output || "./build"),
      filename: `${opts.folders.js}/[name].js`,
      chunkFilename:
        opts.chunkFilename ||
        `${opts.folders.chunks}/${opts.folders.js}/[name]-[chunkHash].js`,
    },
    resolve: {
      extensions: [".js", ".vue", ".json", "jsx"],
      modules: [path.resolve(ctx.cwd, "node_modules")],
    },
    module: {
      rules: [],
    },
    externals: opts.externals || {},
    devtool: opts.devtool === true ? "source-map" : opts.devtool || false,
    plugins: [],
    optimization,
  };
  opts._webpack_config_ = webpackConfig;
};
