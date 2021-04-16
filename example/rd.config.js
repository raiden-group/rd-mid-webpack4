module.exports = {
  server: [
    [
      "server",
      {
        __path__: "../../rd-mid-server/express.js",
        root: "./build",
        open: false,
        // historyApiFallback: true
        historyApiFallback: {
          rewrites: [
            {
              from: /^\/(app1|app2)\.html/g,
              to: (c) => {
                // console.log(11111, c.parsedUrl);
                return "/app1.html";
              },
            },
          ],
        },
      },
    ],
  ],
  dev: [
    [
      "webpack4",
      {
        __path__: "../lib/index.js",
        // entry: {
        //   app1: "./src/index.js",
        //   app2: "./src/index2.js",
        // },
        entry: "./src/index.js",
        template: "./src/assets/index.html",
        cssModules: true, // css 模块化时不支持 通过less 方式的主题替换
        devtool: "inline-source-map", // 是否开启调试
        common: true,
        autoOpen: false, // 本地开发是否自动在浏览器中打开
        port: 8888, // 本地服务端口
        modifyVars: {
          // 配置less 变量，常用于 库主题替换
          "primary-color": "#1DA57A",
        },
        output: "./build",
        devServer: {
          // historyApiFallback:{
          //   rewrites: [
          //     {
          //       from: /^\/(app1|app2)\.html/g, to: ({match}) => {
          //         return match[0];
          //       }
          //     },
          //     {
          //       from: '/', to: () => {
          //         console.log(11111);
          //         return '/app1.html';
          //       }
          //     },
          //   ]
          // }
        },
      },
    ],
  ],
  build: [
    [
      "webpack4",
      {
        __path__: "../lib/index.js",
        // entry:{
        //   app1:  "./src/index.js",
        //   app2: "./src/index2.js"
        // },
        entry: "./src/index.js",
        output: "./build",
        template: "./src/assets/index.html",
        common: false,
        cssModules: true,
        analyze: false, // 启动打包文件分析
        folders: {
          css: "css",
          js: "js",
          font: "font",
        },
        modifyVars: {
          // 配置less 变量，常用于 库主题替换
          "primary-color": "#1DA57A",
        },
      },
    ],
  ],
};
