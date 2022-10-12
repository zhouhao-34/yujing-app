<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-22 10:01:39
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-12 12:57:14
 * @FilePath: \yujing-app\src\components\equipment\maintenance.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="maintenance">
    <div class="block" v-for="(v, i) in dataList" :key="i">
      <div class="block-title">{{ v.proName }}</div>
      <div class="block-container">
        <div>
          <div class="label">当前值:</div>
          <div>{{ v.DValue }}</div>
        </div>
        <div>
          <div class="label">预警值:</div>
          <div>{{ v.yujingValue }}</div>
        </div>
        <div>
          <div class="label">设置寿命:</div>
          <div>{{ v.lifeValue }}</div>
        </div>
        <div>
          <div class="label">维保方式:</div>
          <div>{{ v.typeCL }}</div>
        </div>
        <div>
          <div class="label">维保时间:</div>
          <div>{{ v.createTimeCL }}</div>
        </div>
        <div>
          <div class="label">维保人:</div>
          <div>{{ v.userName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    // [Button.name]: Button // 此处是引入组件名字的方法
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      dataList: [],
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
  created() {},
  mounted() {
    this.listweibao();
  },
  methods: {
    listweibao() {
      const params = {};
      this.$http
        .request("post", this.$API.listweibao, params)
        .then((res) => {
          console.log("listweibao", res);
          if (res.status === "1") {
            this.dataList = res.msg.data;
            for (let i = 0; i < this.dataList.length; i++) {
              if (this.dataList[i].createTimeCL !== null) {
                this.dataList[i].createTimeCL = this.dataList[
                  i
                ].createTimeCL.slice(0, 10);
              }
            }
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.maintenance {
  height: 100%;
  padding: 5px 0px;
  box-sizing: border-box;
  .van-nav-bar {
    background: #fe0102;
    border-bottom: 0px;
    .van-nav-bar__title {
      color: #fff;
      font-size: 20px;
    }
  }
  .van-list {
    height: 100%;
    overflow: auto;
  }
  .block {
    border-radius: 5px;
    background: #fff;
    margin: 10px;
    .block-title {
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      border-bottom: 1px solid #dcdfe6;
    }
    .block-container {
      padding: 5px;
      display: flex;
      flex-wrap: wrap;
      > div {
        width: 50%;
        line-height: 20px;
        display: flex;
        box-sizing: border-box;
        padding: 5px;
        font-size: 14px;
        .label {
          text-align: right;
          width: 70px;
          color: #909399;
        }
      }
    }
  }
}
</style>
