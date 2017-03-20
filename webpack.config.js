/*
  1.启动server  webpack-dev-server
  2. 模块化开发  commomjs
  3. 版本号控制 hash chunkhash
  4.生成htmll
  5. CSS,SASS 引入
  6.抽离css
  7.js代码压缩
  8.配置babelrc支持es6
  9.mock数据     ---假数据                        也可以用nginx
  10.externals外部文件
*/
var webpack=require('webpack');
var HtmlWebpackPlugin=require('html-webpack-plugin');    //声明快速声明获取一个html文件

var ExtractTextPlugin=require('extract-text-webpack-plugin');    //声明一个提取插件的包

module.exports={
  //入口文件
     entry:'./src/scripts/app.js',
    // entry:['./src/search.js','./src/app.js'],

    //串的方式
    // entry:{
    //   app:'./src/app.js',
    //   search:'./src/search.js'
    // },

    //出口
    output:{
      path: __dirname + '/build',    //   /代表当前文件夹   必须设置为相对路径
      //  filename:'[name]_[hash].js'     //自动取名为main
       filename:'app.js'
       // filename:'app_[hash].js'
      // filename:'[name]_[chunkhash].js'
    },

    devtool:'#source-map',

    //引入loaders
    module:{       //模块
        loaders:[
            //css-loader
          {
              test:/\.css$/,
              // loader:'style-loader,css-loader'  //从后往前执行
              loader:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:'css-loader'
          })
        },
          {
              test:/\.scss$/,
              // loader:'style-loader!css-loader!sass-loader'
              loader:ExtractTextPlugin.extract({
                fallback:'style-loader',   //用他进行反馈
                use:'css-loader!sass-loader'  //用这个进行编译
              })
          },
          {
            test:/\.js$/,
            exclude:/node_modules/,    //不让里边的代码被编译
            loader:'babel-loader',


          },
          {
            test:/\.jsx$/,
            exclude:/node_modules/,
            loader:"react-hot-loader!babel-loader"
          }
                  ]
    },

    //启动服务
    devServer:{
      contentBase:'./build',
      port:8668,        //端口号的设置
      proxy: {//配置一个代理
        "/api":{    //只要浏览器上边访问这个地址的时候  凡是带着api的时候 会自动跳转到你跨域后台的地址----下边的地址
          target:'http://localhost:9000',    //http://localhost:9000/相当与是http://localhost:9000/api/in_theaters
          pathRewrite:{'^/api':""}
        }
      }
    },

//配置插件
  plugins:[
    new HtmlWebpackPlugin({
      title:'showTime YohoBuy',
      filename:'app.html',
      template:'my-webpack.ejs'    //使用这个模板
    }),
    new ExtractTextPlugin({
      filename:'app.css',   //以 app_开头后边跟着hash值  就是每次当文件内容改变的时候，然后更新版本号
    //  filename:'app_[hash].css',   //以 app_开头后边跟着hash值  就是每次当文件内容改变的时候，然后更新版本号
      disable:false,          //disable 过期的
      allChunks:true          //是否全部在线编译  true
    }),
    // new webpack.optimize.UglifyJsPlugin({   //压缩
    //   compress:{
    //     warnings:false     //压缩的时候警告
    //   },
    //   output:{
    //     comments:false,    //把注释去掉
    //   }
    // }),


  ],

  //外部文件
    externals:{
      jquery:'window.jQuery',
        react:'window.React',
        'react-dom':'window.ReactDOM',
        'react-router':'window.ReactRouter'
    }



};