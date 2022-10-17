<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-03 09:06:27
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-14 16:31:59
 * @FilePath: \yujing-app\src\components\mould.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mould">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="block" v-for="(v, i) in dataList" :key="i">
        <div class="block-title">{{ v.mojuName }}</div>
        <div class="block-container">
          <div>
            <div class="label">使用次数:</div>
            <div>{{ v.mojuNub }}</div>
          </div>
          <div>
            <div class="label">设定寿命:</div>
            <div>{{ v.liftNub }}</div>
          </div>
          <div>
            <div class="label">添加时间:</div>
            <div>{{ v.createTime }}</div>
          </div>
          <div>
            <div class="label">适用型号:</div>
            <div>{{ v.mojuNub }}</div>
          </div>
          <div class="time">
            <div class="label">上次保养时间:</div>
            <div>{{ v.baoyangTime }}</div>
          </div>
        </div>
      </div>
    </van-list>
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
      loading: false,
      finished: false,
      dataList: [],
      current_page: 1,
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
    this.queryMojulist();
  },
  methods: {
    queryMojulist() {
      const params = {
        current_page: this.current_page,
        per_page: 10,
      };
      this.$http
        .request("post", this.$API.mojulist, params)
        .then((res) => {
          console.log("res", res);
          if (res.status === "1") {
            if (res.msg.data.length === 0) {
              this.finished = true;
            }
            for (let i = 0; i < res.msg.data.length; i++) {
              res.msg.data[i].createTime = res.msg.data[i].createTime.slice(
                0,
                10
              );
              this.dataList.push(res.msg.data[i]);
            }
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    onLoad() {
      this.current_page++;
      this.loading = true;
      this.queryMojulist();
    },
  },
};
</script>

<style  lang="scss">
.mould {
  height: 100%;
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
          font-size: 12px;
          text-align: right;
          width: 60px;
          color: #909399;
        }
      }
      .time {
        width: 100%;
        .label {
          width: 80px;
        }
      }
    }
  }
}
</style>
