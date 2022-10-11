<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-03 09:20:42
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-28 15:00:02
 * @FilePath: \yujing-app\src\components\user.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="user">
    <!-- <van-nav-bar title="设置" :border="false" /> -->
    <!-- <div class="title">我的</div> -->
    <div class="top">
      <div class="content">
        <div class="img">
          <el-avatar
            :size="70"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </div>
        <div class="userName">
          {{ userData.userName }}
        </div>
        <div class="contact">
          <span>{{ mobileDesensitization(userData.mobile) }}</span>
          <span>{{ EmailDesensitization(userData.Email) }}</span>
        </div>
      </div>
    </div>
    <div class="setUp">
      <van-cell-group>
        <van-cell
          title="看板"
          is-link
          @click="jump('看板')"
          :clickable="true"
        />
        <van-cell title="生产任务" is-link @click="jump('生产任务')" />
        <van-cell title="每日数据" is-link @click="jump('每日数据')" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="保养信息" is-link @click="jump('保养信息')" />
        <van-cell title="维保信息" is-link @click="jump('维保信息')" />
        <van-cell title="模具管理" is-link @click="jump('模具管理')" />
        <van-cell title="仓库管理" is-link @click="jump('仓库管理')" />
        <van-cell title="入库记录" is-link @click="jump('入库记录')" />
        <van-cell title="出库记录" is-link @click="jump('出库记录')" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="通知" is-link @click="jump('通知')" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="账号管理" is-link to="/account" />
        <van-cell title="菜单设置" is-link to="/menu" />
      </van-cell-group>

      <div class="button">
        <van-button type="danger" block round to="/sign">退出登录</van-button>
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
      userData: {
        Email: "",
        mobile: "",
        password: null,
        status: 1,
        updateTime: null,
        userID: 1,
        userName: "zhou",
      },
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
  computed: {},
  created() {},
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    mobileDesensitization(v) {
      return v.replace(v.substring(3, 7), "****");
    },
    EmailDesensitization(v) {
      return v.replace(/(\w{1}).*(\w{1})@(.*)/, "$1***$2@$3");
    },
    jump(title) {
      sessionStorage.setItem("condition", title);
      this.$router.push({ path: "/container", query: {} });
    },
  },
};
</script>

<style  lang="scss">
.user {
  height: 100%;
  background: #f2f6fc;
  .van-nav-bar {
    background: #409eff;
    .van-nav-bar__title {
      font-size: 18px;
      color: #fff;
    }
  }
  .title {
    height: 45px;
    color: #fff;
    background: rgb(121, 187, 255);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .top {
    background: linear-gradient(to bottom, #409eff, #ecf5ff);
    height: 150px;
    padding: 10px;
    padding-top: 50px;
    box-sizing: border-box;
    .content {
      border-radius: 5px;
      background: #fff;
      height: 100px;
      position: relative;
      padding-top: 40px;
      .img {
        position: absolute;
        top: -35px;
        left: calc(50% - 35px);
      }
      .userName {
        text-align: center;
      }
      .contact {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        margin-top: 20px;
      }
    }
  }
  .setUp {
    margin-top: 50px;
    padding-bottom: 10px;
    box-sizing: border-box;
    height: calc(100% - 200px);
    overflow: auto;
    .van-cell-group {
      margin-bottom: 10px;
    }
    .button {
      padding: 0px 10px;
    }
  }
}
</style>
