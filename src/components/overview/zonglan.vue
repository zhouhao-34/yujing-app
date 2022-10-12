<template>
  <div class="zonglan">
    <div class="overview-top">
      <div>
        <div>生产班次</div>
        <div>{{ topList.ShiftName }}班</div>
      </div>
      <div>
        <div>{{ dataTime }}</div>
      </div>
      <div>
        <div>生产型号</div>
        <div>{{ topList.ModelID }}</div>
      </div>
      <div>
        <div>换模次数</div>
        <div>{{ topList.ChangeNumber }}</div>
      </div>
      <div>
        <div>型号名称</div>
        <div>{{ topList.ModelName }}</div>
      </div>
      <div>
        <div>实际产量</div>
        <div>{{ topList.Actual }}</div>
      </div>
      <div>
        <div>计划产量</div>
        <div>{{ topList.PlanNumber }}</div>
      </div>
      <div>
        <div>目标产量</div>
        <div>{{ topList.Target }}</div>
      </div>
      <div>
        <div>完成率</div>
        <div>{{ topList.completion }}</div>
      </div>
      <div>
        <div>单项产量</div>
        <div>{{ topList.Single }}</div>
      </div>
      <div>
        <div>产量差异</div>
        <div>{{ topList.Differences }}</div>
      </div>
      <div>
        <div>OEE</div>
        <div>{{ topList.OEE }}</div>
      </div>
    </div>
    <div class="overview-bottom">
      <div class="block" v-for="(v, i) in overviewData" :key="i">
        <div class="title">
          <div class="title-title">{{ v.ModelName }}</div>
          <div class="title-model">{{ v.ModelID }}</div>
        </div>
        <div class="block-content">
          <div>
            <div class="label">计划生产：</div>
            <div>{{ v.Planproduction }}</div>
          </div>
          <div>
            <div class="label">实际生产：</div>
            <div>{{ v.ActualProduction }}</div>
          </div>
          <div>
            <div class="label">开始时间：</div>
            <div>{{ v.startTime }}</div>
          </div>
          <div>
            <div class="label">结束事件：</div>
            <div>{{ v.endTime }}</div>
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
      topList: {},
      dataTime: "",
      timer: null,
      overviewData: [],
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
    this.queryKanban();
    // this.queryPlanmoju();
    this.timer = setInterval(() => {
      var date = new Date();
      var year = date.getFullYear(); //获取当前年份
      var month = date.getMonth() + 1; //获取当前月份
      var dat = date.getDate(); //获取当前日
      var hour = date.getHours(); //获取小时
      var minutes = date.getMinutes(); //获取分钟
      var second = date.getSeconds(); //获取秒
      this.dataTime =
        year +
        "-" +
        month +
        "-" +
        dat +
        " " +
        hour +
        ":" +
        ((minutes + "").length === 1 ? "0" + minutes : minutes) +
        ":" +
        ((second + "").length === 1 ? "0" + second : second);
    }, 1000);
  },
  methods: {
    queryKanban() {
      const params = {};
      this.$http
        .request("post", this.$API.kanban, params)
        .then((res) => {
          console.log("queryKanban", res);
          if (res.status === "1") {
            this.topList = res.msg;
            this.overviewData = res.msg.planList;
            for (let i = 0; i < this.overviewData.length; i++) {
              this.overviewData[i].createTime = this.overviewData[
                i
              ].createTime.slice(0, 10);
              this.overviewData[i].endTime = this.overviewData[i].endTime.slice(
                0,
                10
              );
              this.overviewData[i].startTime = this.overviewData[
                i
              ].startTime.slice(0, 10);
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
.zonglan {
  height: 100%;
  .overview-top {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 0px;
    > div {
      width: calc((100% - 20px) / 2);
      margin-bottom: 20px;
      background: #0200ff;
      padding: 20px;
      box-sizing: border-box;
      line-height: 24px;
      text-align: center;
      color: #fff;
    }
  }
  .overview-bottom {
    padding: 0px 10px;
    .block {
      background: #fff;
      border: 1px solid #a19f9f;
      border-radius: 5px;
      padding: 10px;
      margin: 10px 0px;
      .title {
        display: flex;
        justify-content: space-between;
        .title-title {
          font-weight: 600;
        }
        .title-model {
          color: #362eab;
          font-weight: 600;
        }
      }
      .block-content {
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
            text-align: right;
            width: 80px;
            color: #909399;
          }
        }
      }
    }
  }
}
</style>
