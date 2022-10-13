<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-27 16:12:46
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-13 13:53:09
 * @FilePath: \yujing-app\src\components\overview\everyday.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="everyday">
    <div class="everyday-top">
      <div class="date">
        <el-date-picker
          style="width: 100%"
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="不限"
          end-placeholder="不限"
          size="mini"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div class="button">
        <el-input
          v-model="input"
          placeholder="型号名称"
          class="input-with-select"
        >
          <template #append>
            <el-button @click="listplan" :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
    <div class="everyday-bottom">
      <div class="block" v-for="(v, i) in dataList" :key="i">
        <div class="block-title">{{ v.ModelName }}</div>
        <div class="block-container">
          <div>
            <div class="label">班次:</div>
            <div>{{ v.ShiftName }}</div>
          </div>
          <div>
            <div class="label">换模次数:</div>
            <div>{{ v.ChangeNumber }}</div>
          </div>
          <div>
            <div class="label">计划产量:</div>
            <div>{{ v.PlanNumber }}</div>
          </div>
          <div>
            <div class="label">实际产量:</div>
            <div>{{ v.Actual }}</div>
          </div>
          <div>
            <div class="label">产量差异:</div>
            <div>{{ v.Differences }}</div>
          </div>
          <div>
            <div class="label">完成率:</div>
            <div>{{ v.completion }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup >
import { Search } from "@element-plus/icons-vue";
</script>
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
      value1: "",
      input: "",
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
    this.listsavedata();
  },
  methods: {
    listsavedata() {
      let startTime = "";
      let endTime = "";
      if (this.value1 !== null) {
        startTime = this.value1[0];
        endTime = this.value1[1];
      }
      const params = {
        startTime,
        endTime,
        modelName: this.input,
      };
      this.$http
        .request("post", this.$API.listsavedata, params)
        .then((res) => {
          console.log("listsavedata", res);
          if (res.status === "1") {
            this.dataList = res.msg.data;
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
  },
};
</script>

<style  lang="scss">
.everyday {
  height: 100%;
  .everyday-top {
    padding: 10px 20px;
    box-sizing: border-box;
    .date {
      width: 100%;
      display: flex;
    }
    .button {
      display: flex;
      margin-top: 5px;
      .van-field {
        height: 30px;
      }
    }
  }
  .everyday-bottom {
    padding: 0px 10px;
    overflow: auto;
    height: calc(100% - 90px);
    .block {
      background: #fff;
      border: 1px solid #a19f9f;
      border-radius: 5px;
      margin: 10px 0px;
      .block-title {
        line-height: 30px;
        font-size: 16px;
        text-align: center;
        border-bottom: 1px solid #dcdfe6;
      }
      .block-container {
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
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
      }
    }
  }
}
.el-popper {
  width: calc(100% - 10px);
  padding: 0px 10px;
  .el-picker-panel {
    width: 100%;
    .el-picker-panel__body {
      min-width: 0px;
      .el-picker-panel__content {
        padding: 8px;
        .el-date-range-picker__header {
          > div {
            margin: 0px;
            line-height: 45px;
          }
        }
        .el-date-table {
          .el-date-table__row {
            .prev-month {
              padding: 0px;
            }
          }
        }
      }
    }
  }
}
</style>
