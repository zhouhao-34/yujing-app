/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-05-08 11:11:40
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-11 15:14:44
 */
import axios from "axios";
import { Notify } from 'vant';
import resetSetItem from '../utils/session';
import { ElLoading } from 'element-plus'
var loading=null
// 设置请求超时时间
axios.defaults.timeout = 10000;
window.resetSetItem=resetSetItem
// post请求头的设置
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV === "production") {
  // axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
  axios.defaults.baseURL = "http://yujingapp.s-easy.cn";
}

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  //   状态码不是2开头的
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 404请求不存在
        case 404:
          // ElementUI.Message.error("网络请求不存在");
          break;
        // 其他错误，直接抛出错误提示
        default:
        // ElementUI.Message.error(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
);
function request(method, url, params, config) {
  return new Promise((resolve, reject) => {
    loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    console.log('localStorage.getItem(): ', localStorage.getItem('user'));
    let user=null
    if (localStorage.getItem('user')!=='') {
      user=JSON.parse(localStorage.getItem('user')) 
    }
   let obj={}
   if (user!==null) {
    if (url==='/api/login') {
      obj={...params}
     }else{
      obj={...params,userToken:user.userToken}
     }
   }else{
    obj={...params}
   }
    axios[method](url,obj , Object.assign({}, config))
      .then(
        (response) => {
          loading.close()
          if (response.data.msg==='验证失败'||response.data.msg==='非法访问！') {
            Notify({ type: 'danger', message: '身份信息失效，请重新登录' });
            resetSetItem('refresh',true)
          }else{
            resolve(response.data);
          }
         
        },
        (err) => {
          loading.close()
          if (err.Cancel) {
            console.log("canceled", err);
          } else {
            reject(err);
          }
        }
        
      )
      .catch((err) => {
        reject(err);
        loading.close()
      });
  });
}
export default {
  request,
};
