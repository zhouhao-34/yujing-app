/*
 * @Author: your name
 * @Date: 2021-07-07 12:52:18
 * @LastEditTime: 2022-09-23 15:29:54
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Description: In User Settings Edit
 * @FilePath: \tableERP\vue.config.js
 */


module.exports = {
  // 基本路径
  publicPath: "./",
  // 项目打包的目录
  outputDir: "dist",
  devServer: {
    port: 8083,
    proxy: {
      //配置跨域
      "/api": {
        target: "http://192.168.3.51:8010/",
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "api",
        },
      },
    },
  },
};
