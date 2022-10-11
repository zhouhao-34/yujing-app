/*
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-02 10:09:36
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-28 12:31:05
 * @FilePath: \yujing-app\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      //看板
      {
        path: '/',
        name: 'overview',
        component: () => import(/* webpackChunkName: "overview" */ '../components/overview/zonglan.vue')
       },
        //生产任务
      {
        path: '/task',
        name: 'task',
        component: () => import(/* webpackChunkName: "task" */ '../components/overview/task.vue')
       },
        //每日数据
      {
        path: '/everyday',
        name: 'everyday',
        component: () => import(/* webpackChunkName: "everyday" */ '../components/overview/everyday.vue')
       },
       //保养信息
      {
        path: '/maintain',
        name: 'maintain',
        component: () => import(/* webpackChunkName: "maintain" */ '../components/equipment/maintain.vue')
       },
         //维保信息
      {
        path: '/maintenance',
        name: 'maintenance',
        component: () => import(/* webpackChunkName: "maintenance" */ '../components/equipment/maintenance.vue')
       },
         //模具管理
      {
        path: '/mould',
        name: 'mould',
        component: () => import(/* webpackChunkName: "mould" */ '../components/equipment/mould.vue')
       },
         //仓库管理
      {
        path: '/Warehouse',
        name: 'Warehouse',
        component: () => import(/* webpackChunkName: "Warehouse" */ '../components/equipment/Warehouse.vue')
       },
         //入库记录
      {
        path: '/WarehouseIn',
        name: 'WarehouseIn',
        component: () => import(/* webpackChunkName: "WarehouseIn" */ '../components/equipment/WarehouseIn.vue')
       },
          //出库记录
      {
        path: '/WarehouseOut',
        name: 'WarehouseOut',
        component: () => import(/* webpackChunkName: "WarehouseOut" */ '../components/equipment/WarehouseOut.vue')
       },
       {
        path: '/news',
        name: 'news',
        component: () => import(/* webpackChunkName: "news" */ '../components/news/news.vue')
       },
       {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../components/userAssembly/user.vue')
       },
    ]
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import(/* webpackChunkName: "sign" */ '../components/userAssembly/sign.vue')
   },
   {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '../components/userAssembly/account.vue')
   },
   {
    path: '/addAccount',
    name: 'addAccount',
    component: () => import(/* webpackChunkName: "addAccount" */ '../components/userAssembly/addAccount.vue')
   },
   {
    path: '/container',
    name: 'container',
    component: () => import(/* webpackChunkName: "container" */ '../components/container.vue')
   },
   {
    path: '/menu',
    name: 'menu',
    component: () => import(/* webpackChunkName: "menu" */ '../components/menu.vue')
   },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
