
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 处理html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css 文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包文件分析
const HappyPack = require('happypack');
const CompressionPlugin = require('compression-webpack-plugin');

const utils = require('./utils'); // 工具函数

const getName = (str) => {
    if (utils.isString(str)) {
        const name = str.split('/').pop();
        return name ? name.split('.')[0] : str;
    } 
    return str;
}

const getEntres = (entry) => {
   if (utils.isObject(entry)) {
        return Object.keys(entry).map((key) => {
            const path = entry[key];
            return {
                name: key
            }
        })
    } else if (utils.isString(entry)) {
        return [
            {
                name: getName(entry)
            }
        ]
    }
    return [];
}
// plugins
module.exports = async function (ctx, opts) {
    const plugins = opts._webpack_config_.plugins || [];
    const common = utils.format('common', opts); 
    opts.devServer = opts.devServer || {};
    opts.devServer.historyApiFallback = opts.devServer.historyApiFallback || {};
    opts.devServer.historyApiFallback.rewrites = opts.devServer.historyApiFallback.rewrites || [];
    // html 模板生成
    if (opts.template) {
        const entres = getEntres(opts.entry);
        const template = utils.isString(opts.template) ?
        { template: opts.template } : opts.template;
        
        if (utils.isArray(opts.devServer.historyApiFallback.rewrites)) {
            const appstr = entres.map(item => item.name);
            opts.devServer.historyApiFallback.rewrites.push({
                from: new RegExp(`^\/(${appstr.join('|')})\.html`, 'g'),
                to: ({match}) => {
                    return match[0];
                }
            });
            opts.devServer.historyApiFallback.rewrites.push({
                from: '/',
                to: () => `/${appstr[0]}.html`
            });
        }
        entres.forEach(item => {
            plugins.push(
                new HtmlWebpackPlugin(Object.assign({
                    filename: `${item.name}.html`,
                    chunks: [ item.name, 'manifest', 'main', common.name ]
                }, template))
            )
        })
    }
    plugins.push(
        new HappyPack({
            id: 'babel',
            verbose: false,
            loaders: [{
                loader: 'babel-loader',
                options: opts._babel_option_,
            }]
        })
    )
    // css文件拆分
    const filename = `${opts.folders.css}/[name].css`;
    const chunkFilename = `${opts.folders.chunks}/${opts.folders.css}/[name]-[chunkHash].css`;
    plugins.push(new MiniCssExtractPlugin({
        filename,
        chunkFilename
    }));
    if (opts.analyze === true) {
        plugins.push(new BundleAnalyzerPlugin());
    }
    if (opts._hot_) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    if(opts.gzip) {
        plugins.push(new CompressionPlugin());
    }

    opts._webpack_config_.plugins = plugins;
}