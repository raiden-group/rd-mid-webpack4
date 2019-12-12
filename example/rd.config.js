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
        watch: true, //
        autoOpen: false, // 本地开发是否自动在浏览器中打开
        port: 8888, // 本地服务端口
        modifyVars: {  // 配置less 变量，常用于 库主题替换
          'primary-color': '#1DA57A',
        },
        externals: {
          'antd': {
            root: 'antd',
            commonjs: 'antd',
            commonjs2: 'antd',
            amd: 'antd',
          }
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
        template: './src/assets/index.html',
        // minimize: true, //是否压缩
        common: true,// 是否提取通用引用
        devtool: true, 
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
          '@ant-design': {
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