
const path = require('path');
const defaultConfig = require('./default.config');

// 处理配置项
module.exports = async function initOptions(ctx, opts) {
    if (!opts.browsersList) {
        opts.browsersList = opts.isMobile
            ? ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4']
            : ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9'];
    }
    opts.folders = Object.assign({}, defaultConfig.Folder, (opts.folders || {}));
    const commonSplitChunks = {
        automaticNameDelimiter: '-',
        minSize: 10000,
    }
    let webpackConfig = {
        context: ctx.cwd,
        entry: opts.entry,
        mode: opts.env || (opts._dev_ ? 'development' : 'production'),
        output: {
            publicPath: opts.publicPath || '/',
            path: path.resolve(ctx.cwd, (opts.output || './build')),
            filename: `${opts.folders.js}/[name].js`,
            chunkFilename: opts.chunkFilename || 'chunks/[name].js'
        },
        module: {
            rules: []
        },
        devtool: opts.devtool === true ? 'source-map' : (opts.devtool || false),
        plugins: [],
        optimization: {
            splitChunks: opts.common ?
                {
                    ...commonSplitChunks,
                    cacheGroups: {
                        //打包公共模块
                        'common': {
                            name: 'common',
                            chunks: opts.chunks || "initial"
                        },
                        // default: false // 取消默认default打包
                    }
                } : commonSplitChunks
        }
    }
    opts._webpack_config_ = webpackConfig
}