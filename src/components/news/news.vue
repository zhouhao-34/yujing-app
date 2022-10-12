<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-20 10:04:39
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-12 12:52:18
 * @FilePath: \yujing-app\src\components\news.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="news">
    <div class="news-top">
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="全部通知" name=""></van-tab>
        <van-tab title="已处理" name="是"></van-tab>
        <van-tab title="未处理" name="否"></van-tab>
      </van-tabs>
    </div>
    <div class="news-bottom">
      <div class="bottom-block" v-for="(v, i) in dataList" :key="i">
        <div class="block-title">{{ v.menuName }}</div>
        <div class="block-container">
          <div class="container-title">{{ v.proName }}</div>
          <div class="container-label">
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
              <div class="label">剩余寿命:</div>
              <div>{{ v.surplusLife }}</div>
            </div>
            <div class="time">
              <div class="label">预警时间:</div>
              <div>{{ v.manageCreateTime }}</div>
            </div>
          </div>
        </div>
        <div class="bottom-label stay" v-if="v.manageStatus !== '是'">
          待处理
        </div>
        <div class="bottom-label already" v-else>已处理</div>
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
      active: "",
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
    this.listbaojing();
  },
  methods: {
    async listbaojing() {
      const params = {
        manageStatus: this.active,
      };
      this.$http
        .request("post", this.$API.listbaojing, params)
        .then((res) => {
          console.log("listbaojing", res.msg);
          if (res.status === "1") {
            this.dataList = res.msg.data;
            for (let i = 0; i < this.dataList.length; i++) {
              if (this.dataList[i].manageCreateTime !== null) {
                this.dataList[i].manageCreateTime = this.dataList[
                  i
                ].manageCreateTime.slice(0, 10);
              }
              res.msg.data[i].surplusLife =
                res.msg.data[i].lifeValue * 1 - res.msg.data[i].DValue * 1 > 0
                  ? res.msg.data[i].meitian * 1 > 0
                    ? (
                        ((res.msg.data[i].lifeValue * 1 -
                          res.msg.data[i].DValue * 1) /
                          res.msg.data[i].meitian) *
                        1
                      ).toFixed(1)
                    : "/"
                  : "寿命已尽";
            }
            this.menulistid();
            console.log("this.dataList: ", this.dataList);
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    menulistid() {
      for (let i = 0; i < this.dataList.length; i++) {
        const params = {
          menuID: this.dataList[i].menuID,
        };
        this.$http
          .request("post", this.$API.menulistid, params)
          .then((res) => {
            if (res.status === "1") {
              for (let y = 0; y < res.msg.length; y++) {
                this.dataList[i].menuName = res.msg[y].menuName;
              }
            }
          })
          .catch((err) => {
            console.log("err:", err);
          });
      }
    },
    onClickTab(title) {
      console.log("title: ", title);
      this.active = title.name;
      this.listbaojing();
    },
  },
};
</script>

<style  lang="scss">
.news {
  height: 100%;
  background: #f2f6fc;
  .news-bottom {
    height: calc(100% - 44px);
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    .bottom-block {
      position: relative;
      .block-title {
        line-height: 30px;
        font-size: 14px;
        color: #909399;
      }
      .block-container {
        background: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        .container-title {
          line-height: 30px;
          border-bottom: 1px solid #dcdfe6;
          text-align: center;
        }
        .container-label {
          display: flex;
          flex-wrap: wrap;
          padding: 5px;
          > div {
            width: 50%;
            display: flex;
            box-sizing: border-box;
            line-height: 20px;
            padding: 5px;
            font-size: 14px;
            .label {
              text-align: right;
              width: 70px;
              color: #909399;
            }
          }
          .time {
            width: 100%;
          }
        }
      }
      .bottom-label {
        position: absolute;
        bottom: 5px;
        right: 5px;
        font-size: 14px;
        padding: 5px 10px;
        background: #db001c;
        color: #fff;
        border-radius: 5px;
      }
      .already {
        background: #67c23a;
      }
    }
  }
}
</style>
