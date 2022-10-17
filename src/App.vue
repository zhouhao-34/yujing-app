<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-02 10:05:34
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-14 16:26:31
 * @FilePath: \yujing-app\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      aa: "默认",
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (process.env.NODE_ENV !== "development") {
      if (user !== null && user !== "") {
        if (user.userID !== undefined && user.userID !== "") {
          if (process.env.NODE_ENV === "development") {
            this.$router.push({ path: "/", query: {} });
          }
          window.android.Tiaozhuan("看板");
        }
      }
    }
    // eslint-disable-next-line no-unused-vars
    window["qingliMsg"] = (v) => {
      if (process.env.NODE_ENV === "development") {
        this.$router.push({ path: "/sign", query: {} });
      }
      localStorage.setItem("user", null);
      sessionStorage.setItem("menu", -1);
      window.android.Tiaozhuan("登录");
    };
    window.addEventListener("setItem", () => {
      let newVal = sessionStorage.getItem("refresh");
      console.log("newVal: ", newVal);
      if (process.env.NODE_ENV === "development") {
        this.$router.push({ path: "/sign", query: {} });
      }
      localStorage.setItem("user", null);
      sessionStorage.setItem("menu", -1);
      window.android.Tiaozhuan("登录");
      sessionStorage.setItem("refresh", false);
    });
  },
  methods: {},
};
</script>
<style>
html,
body {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
