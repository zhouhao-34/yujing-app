<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-23 16:20:41
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-27 16:11:26
 * @FilePath: \yujing-app\src\components\overview\task.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="task">
    <div class="task-top">
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
    <div class="task-bottom">
      <div class="block" v-for="(v, i) in dataList" :key="i">
        <div class="title">{{ v.title }}</div>
        <el-descriptions
          class="margin-top"
          :column="2"
          size="small"
          border
          v-for="(x, y) in v.val"
          :key="y"
        >
          <el-descriptions-item
            v-for="(q, w) in dataLabel"
            :key="w"
            width="50px"
          >
            <template #label>
              <div class="cell-item">{{ q.label }}</div>
            </template>
            {{ x[q.prop] }}
          </el-descriptions-item>
        </el-descriptions>
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
      dataLabel: [
        { label: "班次", prop: "Shift" },
        { label: "型号", prop: "ModelName" },
        { label: "计划产量", prop: "Planproduction" },
        { label: "实际产量", prop: "ActualProduction" },
        { label: "开始时间", prop: "startTime" },
        { label: "结束时间", prop: "endTime" },
      ],
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
    this.listplan();
  },
  methods: {
    listplan() {
      console.log("value1", this.value1);
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
        .request("post", this.$API.listplan, params)
        .then((res) => {
          console.log("listplan", res);
          if (res.status === "1") {
            let arr = [];
            for (let i = 0; i < res.msg.data.length; i++) {
              if (arr.length === 0) {
                arr.push({
                  title: res.msg.data[i].planTime,
                  val: [res.msg.data[i]],
                });
              } else {
                let bool = false;
                for (let y = 0; y < arr.length; y++) {
                  if (res.msg.data[i].planTime === arr[y].title) {
                    bool = y;
                  }
                }
                if (bool !== false) {
                  arr[bool].val.push(res.msg.data[i]);
                } else {
                  arr.push({
                    title: res.msg.data[i].planTime,
                    val: [res.msg.data[i]],
                  });
                }
              }
            }
            console.log("arr: ", arr);
            this.dataList = arr;
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
  },
};
</script>

<style lang="scss">
.task {
  height: 100%;
  .task-top {
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
  .task-bottom {
    height: calc(100% - 90px);
    padding: 0px 10px;
    overflow: auto;
    .block {
      background: #fff;
      margin: 10px 0px;
      padding: 10px;
      .title {
        margin-top: 10px;
      }
      .el-descriptions {
        margin: 10px 0px;
        // .cell-item {
        //   width: 50px;
        // }
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
