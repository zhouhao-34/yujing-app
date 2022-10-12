<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-28 09:35:56
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-12 09:44:12
 * @FilePath: \yujing-app\src\components\container.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <van-nav-bar
      :title="condition"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="container-bottom">
      <overview v-if="condition === '看板'"></overview>
      <task v-if="condition === '生产任务'"></task>
      <everyday v-if="condition === '每日数据'"></everyday>
      <maintain v-if="condition === '保养信息'"></maintain>
      <maintenance v-if="condition === '维保信息'"></maintenance>
      <mould v-if="condition === '模具管理'"></mould>
      <Warehouse v-if="condition === '仓库管理'"></Warehouse>
      <WarehouseIn v-if="condition === '入库记录'"></WarehouseIn>
      <WarehouseOut v-if="condition === '出库记录'"></WarehouseOut>
      <news v-if="condition === '通知'"></news>
    </div>
  </div>
</template>

<script>
// 看板
import overview from "./overview/zonglan.vue";
// 生产任务
import task from "./overview/task.vue";
// 每日数据
import everyday from "./overview/everyday.vue";
// 保养信息
import maintain from "./equipment/maintain.vue";
//维保信息
import maintenance from "./equipment/maintenance.vue";
//模具管理
import mould from "./equipment/mould.vue";
//仓库管理
import Warehouse from "./equipment/Warehouse.vue";
//入库记录
import WarehouseIn from "./equipment/WarehouseIn.vue";
//出库记录
import WarehouseOut from "./equipment/WarehouseOut";
// 消息
import news from "./news/news.vue";
export default {
  name: "",
  components: {
    overview,
    task,
    everyday,
    maintain,
    maintenance,
    mould,
    Warehouse,
    WarehouseIn,
    WarehouseOut,
    news,
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      condition: "",
    };
  },
  watch: {
    //***: {
    //immediate: false,
    // handler: function(v) {
    //console.log(v);
    //}
    //}
  },
  created() {
    this.condition = localStorage.getItem("condition");
  },
  mounted() {},
  methods: {
    onClickLeft() {
      if (process.env.NODE_ENV === "development") {
        this.$router.push({ path: "/user", query: {} });
      }
      window.android.Tiaozhuan("我的");
      sessionStorage.setItem("menu", 3);
    },
  },
};
</script>

<style  lang="scss">
.container {
  height: 100%;
  background: #f2f6fc;
  .van-nav-bar {
    .van-nav-bar__title {
      font-size: 20px;
    }
  }
  .container-bottom {
    overflow: auto;
    height: calc(100% - 46px);
    box-sizing: border-box;
  }
}
</style>
