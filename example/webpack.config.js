const path =  require('path');

module.exports = async function(ctx, webpackConfig) {
  webpackConfig.resolve  = webpackConfig.resolve || { alias: {} };
  const alias = webpackConfig.resolve.alias;
  webpackConfig.resolve.alias = {
    ...alias,
    components: path.resolve(__dirname, './src/components'),
    static:path.resolve(__dirname, './src/static'),
    utils: path.resolve(__dirname, './src/common/utils'),
    view: path.resolve(__dirname, './src/view'),
    styles: path.resolve(__dirname, './src/common/styles'),
    stores: path.resolve(__dirname, './src/stores')
  }
  return webpackConfig;
}