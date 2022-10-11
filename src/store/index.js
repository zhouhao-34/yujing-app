/*
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-21 12:57:06
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-29 09:25:09
 * @FilePath: \yujing-app\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    addAccountTitle:'添加账号',
    // 路由信息
    routeList:[
      {id:1,label:'看板',address:'/',icon:'idcard'},
      {id:2,label:'生产任务',address:'/task',icon:'todo-list-o'},
      {id:3,label:'每日数据',address:'/everyday',icon:'notes-o'},
      {id:4,label:'保养信息',address:'/maintain',icon:'label-o'},
      {id:5,label:'维保信息',address:'/maintenance',icon:'desktop-o'},
      {id:6,label:'模具管理',address:'/mould',icon:'points'},
      {id:7,label:'仓库管理',address:'/Warehouse',icon:'home-o'},
      {id:8,label:'入库记录',address:'/WarehouseIn',icon:'completed'},
      {id:9,label:'出库记录',address:'/WarehouseOut',icon:'logistics'},
      {id:10,label:'通知',address:'/news',icon:"chat-o"}
    ]
  },
  mutations: {
    setAddAccountTitle(state,val){
      state.addAccountTitle=val
    }
  },
  actions: {
  },
  modules: {
  }
})
