<template>
  <div>
    <div style="margin-top: 0.1rem">
      <van-nav-bar title="网易严选" @click-left="onClickLeft">
        <template #left>
          <van-icon name="wap-home-o" size="60" />
        </template>
        <template #right>
          <van-icon name="cart-o" size="60" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 中间的图标 -->
    <div class="logoWrap">
      <img src="../assets/logo-img.png" />
    </div>
    <!-- 点击登录 -->
    <div class="btnWrap">
      <van-button
        color="#ee0a24"
        plain
        block
        icon="envelop-o"
        @click="loginBtn"
        style="margin-bottom: 0.37rem"
        >邮箱登录</van-button
      >
      <van-button color="#ee0a24" block icon="envelop-o" @click="registerBtn"
        >邮箱注册用户名</van-button
      >
      <span class="other">其它登录方式>></span>
    </div>
    <!-- 用户登录模块 -->
    <div v-show="isloginshow" class="loginWrap">
      <input type="text" v-model="username" placeholder="邮箱账号" />
      <input type="text" v-model="password" placeholder="密码" />
      <input
        type="button"
        value="登录"
        style="width: 92%; margin-top: 0.3rem"
        @click="loginFn"
      />
    </div>
    <!-- 用户注册模块 -->
    <div v-show="isRegistershow" class="loginWrap">
      <input type="text" v-model="register_name" placeholder="邮箱账号" />
      <input type="text" v-model="register_password" placeholder="密码" />
      <input
        type="button"
        value="注册"
        style="width: 92%; margin-top: 0.3rem"
        @click="registerFn"
      />
    </div>
  </div>
</template>

<script>
//在需要用的组件中引入
import { Dialog } from "vant";
export default {
  name: "login",
  data() {
    return {
      msg: "登录",
      //   登录信息
      username: "",
      password: "",

      isloginshow: false,
      isRegistershow: false,
      //注册信息
      register_name: "",
      register_password: "",
      // 保存多个用户注册信息
      reArrObj: [],
      //保存获取到的所有信息
      saveUserInfo: [],
    };
  },
  mounted() {
    let getReObj = JSON.parse(localStorage.getItem("registerObj"));
    //console.log(getReObj);
    this.saveUserInfo = getReObj;
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    // 出现或隐藏登录框
    loginBtn() {
      this.isloginshow = true;
      this.isRegistershow = false;
    },
    registerBtn() {
      this.isloginshow = false;
      this.isRegistershow = true;
    },
    // 登录按钮
    loginFn() {
      for (var i = 0; i < this.saveUserInfo.length; i++) {
        if (
          this.saveUserInfo[i].u === this.username &&
          this.saveUserInfo[i].p === this.password
        ) {
          Dialog.alert({
            title: "登录成功",
            message: "欢迎回来：" + this.username + "您好",
          }).then(() => {
            this.$router.push("/");
          });
          break;
        } else {
          Dialog.alert({
            title: "登录失败",
            message: "请先注册",
          }).then(() => {
            this.username = "";
            this.password = "";
          });
        }
      }
    },
    registerFn() {
      let reObj = {
        u: this.register_name,
        p: this.register_password,
      };
      this.reArrObj.push(reObj);
      //本地保存注册信息
      localStorage.setItem("registerObj", JSON.stringify(this.reArrObj));
      //重置注册输入框
      this.register_name = "";
      this.register_password = "";
    },
  },
};
</script>
<style scoped>
.logoWrap {
  text-align: center;
  padding-top: 2.13333rem;
  padding-bottom: 3.09333rem;
}
.logoWrap img {
  width: 3.57333rem;
  height: 1.2rem;
}

.btnWrap {
  padding: 0 0.53333rem;
  margin-bottom: 2.73333rem;
}
.other {
  display: block;
  margin: 0.1rem auto;
  text-align: center;
  font-size: 0.373333rem;
}
.loginWrap {
  margin: -1rem auto;
  width: 50%;
}
.loginWrap input {
  display: block;
  font-size: 0.37rem;
  line-height: 1rem;
}
</style>