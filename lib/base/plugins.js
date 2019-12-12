const utils = require('./utils'); // 工具函数

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 处理html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css 文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包文件分析

// plugins
module.exports = async function (ctx, opts) {
const plugins = opts._webpack_config_.plugins || [];
// html 模板生成
const template = utils.isString(opts.template) ? 
    { template: opts.template} : opts.template;
plugins.push(new HtmlWebpackPlugin(Object.assign({

}, template)));
// css文件拆分
const filename = `${opts.folders.css}/[name].css`;
const chunkFilename = `${opts.folders.css}/[name].css`;
plugins.push(new MiniCssExtractPlugin({
    filename,
    chunkFilename
}));
if(opts.analyze === true) {
    plugins.push(new BundleAnalyzerPlugin());
}
if (opts._hot_) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

opts._webpack_config_.plugins = plugins;
}