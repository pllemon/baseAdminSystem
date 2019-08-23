<template>
  <div class="login-container">
    <img src="@/assets/bg1.png" class="bg1">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <img src="@/assets/logo2.png" class="logo">

      <el-form-item prop="username">
        <img src="@/assets/icon/login_person.png">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <img src="@/assets/icon/login_pwd.png">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-checkbox v-model="loginForm.remember" style="margin-bottom: 50px;">记住密码</el-checkbox>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getLoginStorage } from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('账户不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      isSaveLoginInfo: '',
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.loginForm = getLoginStorage()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container{
  .el-form-item{
    padding: 0;
    position: relative;
    margin-bottom: 40px;
    img{
      position: absolute;
      z-index: 10;
      top: 8px;
    }
    .el-input__inner{
      border: none !important;
      border-radius: 0;
      border-bottom: 1px solid rgba(204,204,204,0.4) !important;
      padding: 0px 30px;
      height: 40px;
      font-size: 18px;
    }
  }
  .el-button{
    font-size: 18px;
  }
  .el-form .el-form-item__error{
    padding-top: 8px;
  }
}
</style>
<style lang="scss" scoped>
.bg1{
  position: fixed;
  left: 0;
  bottom: 0;
}
.logo{
  margin: 0 auto;
  display: block;
  margin-bottom: 60px;
}

.login-container {
  height: 100%;
  width: 100%;
  background: url('../../assets/bg.jpg') no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;

  .login-form {
    position: absolute;
    width: 480px;
    padding: 60px 70px;
    background: #fff;
    right: 10%;
    top: 50%;
    margin-top: -288px;
    box-sizing: border-box;
    color: #333;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #333;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 2px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    user-select: none;
  }
}
</style>
