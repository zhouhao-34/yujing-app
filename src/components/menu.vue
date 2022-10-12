<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-28 12:30:14
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-11 16:45:55
 * @FilePath: \yujing-app\src\components\menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="menu">
    <van-nav-bar
      title="菜单设置"
      left-text="返回"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar>
    <div class="menu-bottom">
      <div class="bottom-title">当前展示菜单</div>
      <draggable
        :list="menuExhibition"
        ghost-class="ghost"
        :force-fallback="true"
        chosen-class="chosenClass"
        animation="300"
        @end="onEnd"
      >
        <template #item="{ element }">
          <van-cell :border="false" :title="element.label" />
        </template>
      </draggable>
      <div class="bottom-title">全部菜单</div>
      <div>
        <van-cell
          :border="false"
          v-for="(v, i) in routeList"
          :key="i"
          :title="v.label"
        >
          <template #right-icon>
            <van-icon name="plus" @click="addMenu(v)" />
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
//导入draggable组件
import draggable from "vuedraggable";
export default {
  name: "",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    draggable,
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      menuExhibition: [
        { id: 1, label: "看板", address: "/" },
        { id: 5, label: "维保信息", address: "/maintain" },
        { id: 10, label: "通知", address: "/news" },
      ],
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
  },
  methods: {
    usermenu() {
      let user = JSON.parse(localStorage.getItem("user"));
      const params = {
        userID: user.userID,
      };
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
                this.routeList.splice(i, 1);
                i--;
                continue;
              }
            }
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    onClickLeft() {
      if (process.env.NODE_ENV === "development") {
        this.$router.push({ path: "/user", query: {} });
      }
      window.android.Tiaozhuan("我的");
      sessionStorage.setItem("menu", 3);
    },
    onClickRight() {
      let user = JSON.parse(localStorage.getItem("user"));
      let arr = [];
      for (let i = 0; i < this.menuExhibition.length; i++) {
        arr.push([this.menuExhibition[i].id, this.menuExhibition[i].label]);
      }
      const params = {
        userID: user.userID,
        menuArr: arr,
      };
      this.$http
        .request("post", this.$API.usermenuedit, params)
        .then((res) => {
          console.log("res", res);
          if (res.status === "1") {
            if (process.env.NODE_ENV === "development") {
              this.$router.push({ path: "/user", query: {} });
            }
            window.android.Tiaozhuan("我的");
            sessionStorage.setItem("menu", 3);
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },

    onEnd() {
      console.log("this.menuExhibition: ", this.menuExhibition);
    },
    addMenu(v) {
      this.menuExhibition.splice(2, 1);
      this.menuExhibition.unshift(v);
      this.routeList = JSON.parse(JSON.stringify(this.$store.state.routeList));
      for (let y = 0; y < this.menuExhibition.length; y++) {
        for (let i = 0; i < this.routeList.length; i++) {
          if (this.routeList[i].label === this.menuExhibition[y].label) {
            this.routeList.splice(i, 1);
            i--;
            continue;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
.menu {
  height: 100%;
  background: #f2f6fc;
  .van-nav-bar {
    .van-nav-bar__title {
      font-size: 20px;
    }
  }
  .menu-bottom {
    height: calc(100% - 56px);
    padding: 0px 10px;
    box-sizing: border-box;
    .bottom-title {
      color: #cdd0d6;
      font-size: 14px;
      margin: 10px 0px;
      box-sizing: border-box;
    }
  }
  .van-cell {
    .van-icon {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background: #67c23a;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
