/*
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-02 10:05:34
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-27 14:25:49
 * @FilePath: \yujing-app\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import dataV from '@jiaminghi/data-view'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import httpPlugin from "./request/http-plugin";
import API from "./request/api";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import md5 from 'js-md5';
const app = createApp(App).use(store);

app.use(Vant);
app.config.globalProperties.$API = API;
app.config.globalProperties.$http = httpPlugin;
app.config.globalProperties.$md5 = md5;
app.use(dataV)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(router).use(store).mount('#app')
