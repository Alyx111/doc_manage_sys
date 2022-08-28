<template>
  <div class="login">
    <el-form ref="form" :model="form" class="loginForm">
      <h3 class="title">文件管理</h3>
      <el-form-item>
        <el-input v-model="form.name" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.pass" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login" class="loginButton"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        pass: "",
      },
    };
  },
  methods: {
    async login() {
      console.log(1111, this.form.name, this.form.pass);

      // const res = await this.$axios({
      //   url: "/mpUser/login",
      //   method: "post",
      //   data: {
      //     mpAccount: this.form.name,
      //     mpPwd: this.form.pass,
      //   },
      // });
      const res = {
        data: {
          code: 0,
          data: "b4b32a6b84c545018395b3108ed0900c1615253929799",
          msg: "success",
        },
      };
      console.log(res.data.code);
      if (res.data.code == 0) {
        localStorage.setItem("token", res.data.data);
      }
      this.$router.push({
        path: "/home",
      });
    },
  },
};
</script>
<style>
.login {
  height: 100%;
  background-image: url("../assets/background_img.jpg");
  background-size: cover;
}
.loginForm {
  width: 300px;
  padding-top: 0.1px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.title {
  color: #fff;
  text-align: center;
}
.loginButton {
  width: 100%;
}
</style>
