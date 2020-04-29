const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");

module.exports = function (ctx, webpackConfig, opts) {
  const compiler = webpack(webpackConfig);
  const { port = 8080, host = "localhost", hot, devServer = {} } = opts || {};

  const devServerOption = {
    hot: hot,
    host,
    open: opts.autoOpen === false ? false : true,
    noInfo: true,
    ...devServer,
  };
  const server = new webpackDevServer(compiler, devServerOption);
  server.listen(port, host, function (err) {
    if (err) {
      ctx.log.error("webpack 构建出错");
      process.exit(4);
    }
    ctx.log.info(`开启服务... \n path: http://${host}:${port}`);
  });
};
