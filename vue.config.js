/*
 * @Author: your name
 * @Date: 2021-07-07 12:52:18
 * @LastEditTime: 2022-10-11 15:05:20
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
        // target: "http://192.168.3.51:8010/",
        target: "http://yujingapi.s-easy.cn/",
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "api",
        },
      },
    },
  },
};
