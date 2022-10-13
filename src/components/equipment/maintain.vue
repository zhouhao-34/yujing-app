<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-22 08:55:40
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-13 13:53:52
 * @FilePath: \yujing-app\src\components\equipment\maintain.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="maintain">
    <van-field
      placeholder="请选择设备"
      v-model="fieldValue"
      is-link
      readonly
      @click="show = true"
    />
    <van-popup v-model:show="show" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        :options="options"
        :field-names="fieldNames"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
    <div class="maintain">
      <div class="maintain-title">设备保养项</div>
      <div class="maintain-content">
        <div class="content-block" v-for="(v, i) in dataList" :key="i">
          <div class="block-title">{{ v.proName }}</div>
          <div class="bottom">
            <div class="right-label">
              <div>
                <div class="label">当前值:</div>
                <div>{{ v.DValue }}</div>
              </div>
              <div>
                <div class="label">预警值:</div>
                <div>{{ v.yujingValue }}</div>
              </div>
              <div>
                <div class="label">设定寿命:</div>
                <div>{{ v.lifeValue }}</div>
              </div>
              <div>
                <div class="label">剩余寿命:</div>
                <div>{{ v.surplusLife }}</div>
              </div>
            </div>
          </div>
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
      fieldValue: "全部",
      menuID: "",
      show: false,
      cascaderValue: "",
      fieldNames: { text: "menuName", value: "menuID", children: "son" },
      options: [],
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
    this.queryProlist();
    this.queryMenulist();
  },
  methods: {
    queryProlist() {
      const params = {
        menuID: this.menuID,
      };
      this.$http
        .request("post", this.$API.prolist, params)
        .then((res) => {
          console.log("prolist", res);
          if (res.status === "1") {
            this.dataList = res.msg.data;
            for (let i = 0; i < res.msg.data.length; i++) {
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
            // this.loading = false;
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    queryMenulist() {
      const params = {
        current_page: this.current_page,
        per_page: 4,
      };
      this.$http
        .request("post", this.$API.menulist, params)
        .then((res) => {
          console.log("res", res);
          if (res.status === "1") {
            for (const key in res.msg) {
              if (typeof res.msg[key].son === "object") {
                res.msg[key].son = this.handle(res.msg[key].son);
              }
              if (res.msg[key].menuType === "2") {
                delete res.msg[key].son;
              }
              this.options.push(res.msg[key]);
            }
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    handle(val) {
      let arr = [];
      for (const key in val) {
        arr.push(val[key]);
        if (typeof val[key].son === "object") {
          val[key].son = this.handle(val[key].son);
        }
        if (val[key].menuType === "2") {
          delete val[key].son;
        }
      }
      return arr;
    },
    onFinish(val) {
      console.log("val: ", val);
      this.menuID = val.selectedOptions[val.selectedOptions.length - 1].menuID;
      this.queryProlist();
      this.show = false;
      this.fieldValue = val.selectedOptions
        .map((option) => option.menuName)
        .join("/");
    },
  },
};
</script>

<style scoped lang="scss">
.maintain {
  height: 100%;
  .van-card {
    .card-custom-content {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      .laft {
        width: 50%;
      }
      .right {
        width: 50%;
      }
    }
  }
  .maintain {
    padding: 10px;
    height: calc(100% - 65px);
    .maintain-title {
      font-weight: 600;
      margin-bottom: 10px;
    }
    .maintain-content {
      height: calc(100% - 30px);
      border-radius: 5px;
      box-sizing: border-box;
      overflow: auto;
      .content-block {
        border: 1px solid #dcdfe6;
        background: #fff;
        box-sizing: border-box;
        margin: 10px 0px;
        border-radius: 5px;
        width: 100%;
        .block-title {
          border-bottom: 1px solid #dcdfe6;
          text-align: center;
          line-height: 30px;
          font-size: 16px;
        }

        .bottom {
          .right-label {
            display: flex;
            flex-wrap: wrap;
            font-size: 14px;
            padding: 5px;
            > div {
              width: 50%;
              display: flex;
              padding: 5px;
              box-sizing: border-box;
              line-height: 20px;
              font-size: 14px;
              .label {
                font-size: 12px;
                text-align: right;
                width: 60px;
                color: #909399;
              }
            }
          }
        }
      }
    }
  }
}
</style>
