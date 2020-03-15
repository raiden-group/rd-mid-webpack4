const path = require('path');
const fs = require('fs');
const utils = require('./utils');

// 处理 babelOptions
module.exports = async function (ctx, opts) {
    const babelConfigPath = path.resolve(ctx.cwd, './babel.config.js');
    let babelOption = {};
    if (fs.existsSync(babelConfigPath)) {
        babelOption = require(babelConfigPath);
    }
    const options = {
        "babelrc": false,
        ...babelOption,
        cacheDirectory: true,
        presets: [
            [
                require.resolve('babel-preset-env'), {
                    useBuiltIns: 'usage'
                }
            ],
            [
                require.resolve('babel-preset-react')
            ],
            require.resolve('babel-preset-stage-0'),
            ...(babelOption.presets || [])
        ],
        plugins: [
            ...(babelOption.plugins || []),
            [
            "transform-decorators-legacy"
            ]
        ]
    };
    if (opts.transform !== false) {
        let transform = opts.transform || {};
        if (opts._hot_) {
            options.plugins.push(require.resolve("react-hot-loader/babel"));
        }
        options.plugins.push([
            require.resolve('babel-plugin-transform-runtime'), {
                'helpers': utils.isNull(transform.helpers) ? true : transform.helpers, // defaults to true
                'polyfill': utils.isNull(transform.polyfill) ? true : transform.polyfill, // defaults to true
                'regenerator': utils.isNull(transform.regenerator) ? true : transform.regenerator, // defaults to true
                'moduleName': transform.moduleName || 'babel-runtime', // defaults to 'babel-runtime'
                'useBuiltIns': transform.useBuiltIns || false
            }
        ]);
    }
    if (opts.chunks === true) {
        options.plugins.push('babel-plugin-syntax-dynamic-import');
    }
    return options;
}