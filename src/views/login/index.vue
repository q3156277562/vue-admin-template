<template>
  <div class="login-container">
    <form class="form">
      <p class="form-title">{{!isSign?"登录":"注册"}}</p>
      <div class="input-container">
        <input ref="username" v-model="loginForm.account" placeholder="请输入账号" type="text">
        <span>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
      </div>
      <div class="input-container">
        <input ref="password" v-model="loginForm.password" placeholder="请输入密码" type="password">
        <span>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
      </div>
      <button :loading="loading" v-show="!isSign" @click.prevent="handleLogin" class="submit" type="submit">登录</button>
      <button :loading="loading" v-show="isSign" @click.prevent="handleSign" class="submit" type="submit">注册</button>
      <p class="signup-link" v-show="!isSign">
        还没有账号?
        <a @click="toSign">Sign up</a>
      </p>
      <p class="signup-link" v-show="isSign">
        已经有账号了?
        <a @click="toLogin">login</a>
      </p>
      <div class="back" @click="toLogin" v-show="isSign">
        <i class="el-icon-back"></i><span>返回</span>
      </div>
    </form>
    <div class="full"></div>
  </div>
</template>

<script>
import {register} from '@/api/user.js'
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      title: "",
      loading: false,
      passwordType: "password",
      redirect: undefined,
      // title: "登录",
      isSign: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.$router.replace({ path: this.redirect || "/" });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleSign() {
      register(this.loginForm).then(res=>{
        this.$message.success(res.msg)
      })
    },
    toLogin(){
      this.isSign = false;
    },
    toSign() {
      this.isSign = true;
    },
  },
};
</script>



<style scoped>
.login-container {
  height: 100%;
  background: radial-gradient(
      ellipse farthest-side at 76% 77%,
      rgba(245, 228, 212, 0.25) 4%,
      rgba(255, 255, 255, 0) calc(4% + 1px)
    ),
    radial-gradient(circle at 76% 40%, #fef6ec 4%, rgba(255, 255, 255, 0) 4.18%),
    linear-gradient(135deg, #ff0000 0%, #000036 100%),
    radial-gradient(ellipse at 28% 0%, #ffcfac 0%, rgba(98, 149, 144, 0.5) 100%),
    linear-gradient(180deg, #cd6e8a 0%, #f5eab0 69%, #d6c8a2 70%, #a2758d 100%);
  background-blend-mode: normal, normal, screen, overlay, normal;
}
.form {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: block;
  padding: 1rem;
  max-width: 340px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
}

.input-container {
  position: relative;
}

.input-container input,
.form button {
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.input-container span {
  display: grid;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  place-content: center;
}

.input-container span svg {
  color: #9ca3af;
  width: 1rem;
  height: 1rem;
}

.submit {
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
}

.signup-link {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}
.back{
  position: absolute;
  top: 20px;
  font-size: 14px;
  cursor: pointer;
}
.full {
  /* height: 100px; */
}
</style>

