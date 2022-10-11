<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-20 14:51:35
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-22 13:04:53
 * @FilePath: \yujing-app\src\components\userAssembly\account.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="account">
    <van-nav-bar
      title="账号管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="addButton" @click="addClick">
      <el-icon><Plus /></el-icon>
    </div>
    <div class="account-content">
      <div class="content-block">
        <div class="teble">
          <el-row>
            <el-col :span="6" class="label">姓名</el-col>
            <el-col :span="18" class="text">zhou</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="label">账号类型</el-col>
            <el-col :span="18" class="text">维保人员</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="label">手机号</el-col>
            <el-col :span="18" class="text">13133333333</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="label">邮箱</el-col>
            <el-col :span="18" class="text">11@1163.com</el-col>
          </el-row>
        </div>
        <div class="operation">
          <div class="EditButton">
            <el-icon><Edit /></el-icon>
          </div>
          <div class="DeleteButton">
            <el-icon><Delete /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script  >
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
export default {
  name: "",
  components: { Delete, Edit, Plus },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {};
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
  mounted() {},
  methods: {
    addClick() {
      this.$router.push({ path: "/addAccount", query: {} });
      this.$store.commit("setAddAccountTitle", "添加账号");
    },
    onClickLeft() {
      this.$router.push({ path: "/user", query: {} });
      sessionStorage.setItem("menu", 4);
    },
  },
};
</script>

<style  lang="scss">
.account {
  height: 100%;
  background: #f2f6fc;
  .van-nav-bar {
    .van-nav-bar__title {
      font-size: 20px;
    }
  }
  .addButton {
    margin: 10px;
    background: #fff;
    border-radius: 5px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #dcdfe6;
  }
  .account-content {
    padding: 10px 10px;
    height: calc(100% - 125px);
    overflow: auto;
    .content-block {
      border: 1px solid #dcdfe6;
      background: #fff;
      border-radius: 5px;
      .operation {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        .EditButton,
        .DeleteButton {
          width: 30px;
          height: 30px;
          border-radius: 15px;
          background: #238cf5af;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .DeleteButton {
          background: #f56c6c;
          margin-left: 10px;
        }
      }
      .teble {
        .el-row {
          line-height: 30px;
          .label,
          .text {
            text-align: center;
            border-bottom: 1px solid #dcdfe6;
          }
          .text {
            font-size: 14px;
          }
          .label {
            border-right: 1px solid #dcdfe6;
          }
        }
      }
    }
  }
}
</style>
