module.exports = {
  server: [
    [
      'server',
      {
        port: 2000,
        root: './build'
      }
    ]
  ],
  dev: [
    [
      'webpack4',
      {
        __path__: '../lib/index.js',
        entry: "./src/index.js",
        template: "./src/assets/index.html",
        cssModules: true, // css 模块化时不支持 通过less 方式的主题替换
        devtool: true, // 是否开启调试
        manifest: false,
        watch: true, //
        autoOpen: true, // 本地开发是否自动在浏览器中打开
        port: 8888, // 本地服务端口
        modifyVars: {  // 配置less 变量，常用于 库主题替换
          'primary-color': '#1DA57A',
        }
      }
    ]
  ],
  build: [
    [
      'webpack4',
      {
        __path__: '../lib/index.js',
        entry: "./src/index.js",
        output: './build',
        cssModules: true,
        manifest: true,
        minimize: false,
        template: './src/assets/index.html',
        common: true,// 是否提取通用引用
        devtool: false, 
        gzip: false,
        analyze: true,  // 启动打包文件分析
        externals: {
          react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
          },
          'react-dom': {
            root: 'ReactDom',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
          },
          antd: {
            root: 'antd',
            commonjs: 'antd',
            commonjs2: 'antd',
            amd: 'antd',
          }
        },
        folders: {
          css: 'css',
          js: 'js',
          font: 'font'
        },
        modifyVars: {  // 配置less 变量，常用于 库主题替换
          'primary-color': '#1DA57A',
        },
      }
    ]
  ]
}