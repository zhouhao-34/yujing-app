/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2021-05-08 11:11:40
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-29 08:35:39
 */
export default {
  login:'/api/login', //登录?userName=zhou&passWrod=E10ADC3949BA59ABBE56E057F20F883E
  kanban:'/api/kanban',//看板&今天生产任务
 // planmoju:'/api/planmoju',//看板当天生产任务模具查询
 // kbyujing:'/api/kbyujing',//看板预警值
  mojulist:'/api/mojulist',//模具管理 ?current_page=1&per_page=2
  prolist:'/api/prolist',//设备保养管理?menuID
  menulist:'/api/menulist',//所有菜单查询
  menulistid:'/api/menulistid',//菜单查询--指定ID?menuID=1
  listbaojing:'/api/listbaojing',//设备报警记录查询
  listweibao:'/api/listweibao',//设备维保记录查询
  listcangku:'/api/listcangku',//仓库列表 ?bandName=ab&modelName&productName
  listcangkuout:'/api/listcangkuout',//仓库--出库记录?bandName=&modelName&productName
  listcangkuin:'/api/listcangkuin',//仓库--入库记录?bandName=&modelName&productName
  listplan:'/api/listplan',//生产任务查询?startTime=2022-09-27&endTime=2022-09-28&modelName
  listsavedata:'/api/listsavedata',//每日数据查询?startTime&endTime&modelName
  usermenu:'/api/usermenu',//自定义菜单查询
  usermenuedit:'/api/usermenuedit',//修改自定义菜单
};