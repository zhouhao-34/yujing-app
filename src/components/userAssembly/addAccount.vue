<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-21 12:49:29
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-22 13:06:13
 * @FilePath: \yujing-app\src\components\userAssembly\addAccount.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="addAccount">
    <van-nav-bar
      :title="addAccountTitle"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="addAccountForm">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            label="姓名"
            :colon="true"
            :required="true"
            label-align="right"
            v-model="form.name"
            name="name"
            placeholder="姓名"
            :rules="[{ validator: validatorName }]"
          />
          <van-field
            label="手机号"
            :colon="true"
            :required="true"
            label-align="right"
            v-model="form.phone"
            name="phone"
            placeholder="手机号"
            :rules="[{ validator: validatorPhone }]"
          />
          <van-field
            label="密码"
            :colon="true"
            :required="true"
            label-align="right"
            v-model="form.password"
            name="password"
            type="password"
            placeholder="密码"
            :rules="[{ validator: validatorMessage }]"
          />
          <van-field
            v-model="form.type"
            :colon="true"
            :required="true"
            label-align="right"
            is-link
            readonly
            name="type"
            label="账号类型"
            placeholder="点击选择账号类型"
            @click="showPicker = true"
            :rules="[{ validator: validatorType }]"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
              :columns="columns"
              :columns-field-names="columnsField"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            label="邮箱"
            :colon="true"
            :required="true"
            label-align="right"
            v-model="form.mailbox"
            name="mailbox"
            placeholder="邮箱"
            :rules="[{ validator: validatorMailbox }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
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
      addAccountTitle: "",
      form: {
        name: "",
        phone: "",
        password: "",
        type: "",
        mailbox: "",
      },
      showPicker: false,
      columns: ["管理员", "维保人员"],
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
    this.addAccountTitle = this.$store.state.addAccountTitle;
  },
  methods: {
    validatorName(val) {
      if (val === "") {
        return "姓名不可为空";
      }
    },
    validatorPhone(val) {
      if (val === "") {
        return "手机号不可为空";
      }
    },
    validatorMessage(val) {
      if (val === "") {
        return "密码不可为空";
      }
    },
    validatorType(val) {
      if (val === "") {
        return "请选择账号类型";
      }
    },
    validatorMailbox(val) {
      if (val === "") {
        return "邮箱不可为空";
      }
    },
    onClickLeft() {
      this.$router.push({ path: "/account", query: {} });
    },
    onSubmit() {},
    onConfirm(val) {
      this.form.type = val;
      this.showPicker = false;
    },
  },
};
</script>

<style lang="scss">
.addAccount {
  height: 100%;
  background: #f2f6fc;
  .van-nav-bar {
    .van-nav-bar__title {
      font-size: 18px;
    }
  }
  .addAccountForm {
    padding: 10px 0px;
  }
}
</style>
