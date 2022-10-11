<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-26 12:49:14
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-28 16:20:03
 * @FilePath: \yujing-app\src\components\equipment\WarehouseIn.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="WarehouseIn">
    <div class="top">
      <van-button
        class="top-right"
        round
        type="default"
        icon="search"
        size="small"
        @click="show = true"
      ></van-button>
    </div>
    <div class="bottom">
      <div class="bottom-block" v-for="(v, i) in dataList" :key="i">
        <div class="block-title">{{ v.productName }}</div>
        <div class="block-content">
          <div>
            <div class="label">品牌名称:</div>
            <div>{{ v.bandName }}</div>
          </div>
          <div>
            <div class="label">型号名称:</div>
            <div>{{ v.modelName }}</div>
          </div>
          <div>
            <div class="label">入库数量:</div>
            <div>{{ v.inNub }}</div>
          </div>
          <div>
            <div class="label">入库人:</div>
            <div>{{ v.userName }}</div>
          </div>
          <div>
            <div class="label">入库时间:</div>
            <div>{{ v.ruTime }}</div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog v-model:show="show" :showConfirmButton="false">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            label="品牌名称"
            :colon="true"
            label-align="right"
            v-model="form.bandName"
            name="bandName"
            placeholder="品牌名称"
            label-width="60px"
          />
          <van-field
            label="型号名称"
            :colon="true"
            label-align="right"
            v-model="form.modelName"
            name="modelName"
            placeholder="型号名称"
            label-width="60px"
          />
          <van-field
            label="产品名称"
            :colon="true"
            label-align="right"
            v-model="form.productName"
            name="productName"
            placeholder="产品名称"
            label-width="60px"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            确定
          </van-button>
        </div>
      </van-form>
    </van-dialog>
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
      show: false,
      form: {
        bandName: "",
        modelName: "",
        productName: "",
      },
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
    this.listcangkuin();
  },
  methods: {
    listcangkuin() {
      const params = { ...this.form };
      this.$http
        .request("post", this.$API.listcangkuin, params)
        .then((res) => {
          console.log("listcangkuin", res);
          if (res.status === "1") {
            this.dataList = res.msg.data;
            for (let i = 0; i < this.dataList.length; i++) {
              if (this.dataList[i].ruTime !== null) {
                this.dataList[i].ruTime = this.dataList[i].ruTime.slice(0, 10);
              }
            }
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    onSubmit(val) {
      console.log("val: ", val);
      this.show = false;
      this.listcangkuin();
    },
    onLoad() {},
    blockTouchstart() {
      this.timer = setTimeout(() => {
        this.showPopover = true;
      }, 500);
    },
    blockTouchend() {
      clearInterval(this.timer);
    },
    backClick() {
      this.showPopover = false;
    },
  },
};
</script>

<style  lang="scss">
.WarehouseIn {
  height: 100%;
  .top {
    display: flex;
    padding: 10px;
    box-sizing: border-box;

    .top-right {
      width: 100%;
    }
  }
  .bottom {
    height: calc(100% - 52px);
    padding: 10px 10px;
    box-sizing: border-box;
    overflow: auto;
    .bottom-block {
      border-radius: 5px;
      background: #fff;
      margin-bottom: 10px;
      .block-title {
        border-bottom: 1px solid #dcdfe6;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
      }
      .block-content {
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
          .label {
            text-align: right;
            width: 70px;
            color: #909399;
          }
        }
      }
    }
    .bottom-block:active {
      background: #ebedf0;
    }
  }
  .van-dialog {
    .van-dialog__content {
      padding: 20px 0px;
    }
  }
}
</style>
