<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-02 10:09:36
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-14 14:53:13
 * @FilePath: \yujing-app\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home">
    <van-nav-bar
      :title="barTitle"
      :border="false"
      :class="barTitleShow ? '' : 'back'"
    >
    </van-nav-bar>
    <div class="home-content">
      <router-view />
    </div>
    <van-tabbar v-model="menuSelect" @change="onChange">
      <van-tabbar-item
        :icon="v.icon"
        v-for="(v, i) in menuExhibition"
        :key="i"
        >{{ v.label }}</van-tabbar-item
      >
    </van-tabbar>
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
      barTitle: "",
      barTitleShow: false,
      menuExhibition: [],
      menuSelect: 0,
      showPopover: false,
      actions: [{ text: "全部通知" }, { text: "待处理" }, { text: "已处理" }],
      routeList: [],
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
  created() {
    this.routeList = JSON.parse(JSON.stringify(this.$store.state.routeList));
  },
  mounted() {
    this.usermenu();
    let menu = sessionStorage.getItem("menu");
    console.log("menu: ", menu);
    if (menu * 1 > 0) {
      this.menuSelect = menu * 1;
    }
  },
  methods: {
    usermenu() {
      let user = JSON.parse(localStorage.getItem("user"));
      const params = { userID: user.userID };
      this.$http
        .request("post", this.$API.usermenu, params)
        .then((res) => {
          this.menuExhibition = [];
          console.log("res", res);
          for (let i = 0; i < res.msg.length; i++) {
            this.menuExhibition.push({
              id: res.msg[i].menuUID * 1,
              label: res.msg[i].menuUName,
            });
          }
          for (let y = 0; y < this.menuExhibition.length; y++) {
            for (let i = 0; i < this.routeList.length; i++) {
              if (this.routeList[i].label === this.menuExhibition[y].label) {
                this.menuExhibition[y].address = this.routeList[i].address;
                this.menuExhibition[y].icon = this.routeList[i].icon;
              }
            }
          }
          this.menuExhibition.push({
            label: "我的",
            address: "user",
            icon: "manager-o",
          });
          let menu = sessionStorage.getItem("menu");
          this.onChange(menu * 1);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    onChange(index) {
      console.log("index: ", index);
      sessionStorage.setItem("menu", index);
      if (index !== -1) {
        this.barTitle = this.menuExhibition[index].label;
        this.$router.push({
          path: this.menuExhibition[index].address,
          query: {},
        });
      }
      if (index === 3) {
        this.barTitleShow = false;
      } else if (index === -1) {
        this.barTitleShow = true;
        this.barTitle = "看板";
        this.menuSelect = -1;
      } else {
        this.barTitleShow = true;
      }
    },
    onSelect(val) {
      console.log("val: ", val);
      this.$router.push({ path: "/news", query: {} });
    },
  },
};
</script>

<style  lang="scss">
.home {
  height: 100%;
  .van-nav-bar {
    .van-nav-bar__title {
      font-size: 20px;
    }
  }
  .back {
    background: #409eff;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .home-content {
    overflow: auto;
    height: calc(100% - 96px);
    background: #f2f6fc;
  }
  .height {
    height: calc(100% - 56px);
  }
}
</style>

