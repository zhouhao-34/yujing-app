<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-03 09:53:37
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-28 08:25:02
 * @FilePath: \yujing-app\src\components\userAssembly\sign.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="sign">
    <div class="img">
      <img src="../../assets/signLogo.png" alt="" />
    </div>
    <div class="form">
      <el-input v-model="userName" placeholder="请输入账号"></el-input>
      <el-input
        v-model="passWrod"
        placeholder="请输入密码"
        type="password"
      ></el-input>
      <div class="sign-button" @click="signClick">登录</div>
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
      userName: "",
      passWrod: "",
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
  mounted() {},
  methods: {
    onSubmit(val) {
      console.log("val: ", val);
    },
    signClick() {
      const params = {
        userName: this.userName,
        passWrod: this.$md5(this.passWrod),
      };
      this.$http
        .request("post", this.$API.login, params)
        .then((res) => {
          console.log("res", res);
          if (res.status === "1") {
            localStorage.setItem("user", JSON.stringify(res.msg));
            this.$router.push({ path: "/", query: {} });
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });

      sessionStorage.setItem("menu", 0);
    },
  },
};
</script>

<style  lang="scss">
.sign {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 250px;
  .img {
    margin: 20px 0px;
  }
  .form {
    .el-input__wrapper {
      border-radius: 25px;
      margin: 10px 0px;
      height: 50px;
    }
    .sign-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      border-radius: 25px;
      background: #409eff;
      font-size: 20px;
      font-weight: 600;
      color: #fff;
    }
  }
}
</style>
