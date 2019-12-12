const fs = require('fs');
const path = require('path');
const option = require('./base/option');
const babel = require('./base/babel');
const style = require('./base/style');
const pligins = require('./base/plugins');

const utils = require('./base/utils'); // 工具函数
const dev = require('./dev');
const build = require('./build');

module.exports = async function (ctx, opts) {
  opts._dev_ = opts.env === 'development' || ctx.command.cmd === 'dev'; // 是否是开发环境
  opts._hot_ = (opts._dev_ && opts.hot === true);
  opts._customer_config_path_ = path.resolve(ctx.cwd, './webpack.config.js');

  // loaders
  async function loader(ctx, opts) {
    let rules = opts._webpack_config_.module.rules || [];
    const babelOption = await babel(ctx, opts);
    const cssLoader = await style(ctx, opts);
    rules = rules.concat([
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: babelOption
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|gif|jpeg|gif)\?*.*$/,
        loader: `url-loader?limit=8192&name=${opts.folders.img}/[hash].[ext]`
      },
      {
        test: /\.(eot|woff|woff2|webfont|ttf|svg)\?*.*$/,
        loader: `url-loader?limit=8192&name=${opts.folders.font}/[hash].[ext]`
      },
      ...cssLoader
    ]);
    opts._webpack_config_.module.rules = rules;
  }
  async function run() {
    await option(ctx, opts);
    await loader(ctx, opts);
    await pligins(ctx, opts);
    if (fs.existsSync(opts._customer_config_path_)) {
      ctx.log.info("合并自定义配置...");
      const customerConfig = require(opts._customer_config_path_);
      if (utils.isFunction(customerConfig) || utils.isAsync(customerConfig)) {
        webpackConfig = await customerConfig(ctx, opts._webpack_config_);
      }
    }
    // 当前执行指令
    const { cmd } = ctx.command;
    if (cmd === 'dev') {
      dev(ctx, webpackConfig, opts);
    } else {
      ctx.fs.emptyDirSync(webpackConfig.output.path);
      build(ctx, webpackConfig, opts);
    }
  };
  await run();
}