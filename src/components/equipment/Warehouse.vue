<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-23 08:08:19
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-28 16:16:11
 * @FilePath: \yujing-app\src\components\equipment\Warehouse.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="Warehouse">
    <div class="top">
      <van-button
        class="top-left"
        round
        type="primary"
        icon="plus"
        size="small"
      ></van-button>
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
      <van-popover
        v-model:show="showPopover"
        :actions="actions"
        :offset="[40, -80]"
        :show-arrow="false"
        trigger="manual"
        v-for="(v, i) in dataList"
        :key="i"
      >
        <template #reference>
          <div
            class="bottom-block"
            @touchstart="blockTouchstart"
            @touchend="blockTouchend"
            @click="backClick"
          >
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
                <div class="label">库存数量:</div>
                <div>{{ v.ckNub }}</div>
              </div>
            </div>
          </div>
        </template>
      </van-popover>
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
      showPopover: false,
      actions: [
        { text: "适用设备" },
        { text: "增加库存" },
        { text: "出库" },
        { text: "修改" },
        { text: "删除" },
      ],
      timer: null,
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
    this.listcangku();
  },
  methods: {
    listcangku() {
      const params = { ...this.form };
      this.$http
        .request("post", this.$API.listcangku, params)
        .then((res) => {
          console.log("listcangku", res);
          if (res.status === "1") {
            this.dataList = res.msg.data;
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    onSubmit(val) {
      console.log("val: ", val);
      this.show = false;
      this.listcangku();
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
.Warehouse {
  height: 100%;
  .top {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    .top-left {
      width: calc(100% - 60px);
      margin-right: 10px;
    }
    .top-right {
      width: 50px;
    }
  }
  .bottom {
    height: calc(100% - 52px);
    padding: 0px 10px;
    overflow: auto;
    .van-popover__wrapper {
      width: 100%;
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
