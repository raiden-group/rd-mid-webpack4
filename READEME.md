### 基于 webpack 4.x 构建中间件
#### 配置
entry
    
    项目的入口文件

output

    文件输出位置

template

    html 模板


cssModuless

    是否开启 css 模块化

devtool

    调试模式

watch

    监听文件的变化， 一般用于dev模式下

autoOpen

    dev 模式下开启本地服务自动打开浏览器

port 

    dev 模式下 本地服务端口

host

    dev 模式下 本地服务host 默认 localhost 

modifyVars

    配置less-loader 变量 详见：http://lesscss.org/usage/#command-line-usage-options

externals 

    详见 webpack externals , 用于排除打包文件

common

    提取公共文件

analyze

    打包结果分析


folders
   
    文件名配置：
    {
        js: 'js',
        css: 'css',
        img: 'img',
        html: '',
        font: 'font',
        chunks: 'chunks'
    }

gzip

    是否开启 gzip
