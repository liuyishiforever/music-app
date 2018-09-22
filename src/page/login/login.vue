<template>
  <div class="login">
    <div class="login-main">
      <input type="text" placeholder="账号" v-model="username">
      <input type="password" placeholder="密码" v-model="password">
      <Button ref='btn' type="success" class="loginbtn" @click="goLogin" long :disabled="disabled">SUBMIT</Button>
    </div>
  </div>
</template>

<script>

  const SUCCESS_CODE = 200;
  import {mapMutations} from 'vuex'

  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      disabled() {
        return !(this.username || this.password)

      }
    },
    methods: {
      goLogin() {
        if (!(this.username || this.password)) {
          return;
        }
        let url = `http://localhost:3000/login/cellphone?phone=${this.username}&password=${this.password}`;
        this.$axios.get(url).then((res) => {
          if (res.data.code === SUCCESS_CODE) {
            this.setIsLogin(true);
            let profile = res.data.profile;
            let account = res.data.account;
            this.setProfile(profile);
            this.setAccount(account);
          } else {
            console.log("账号密码错误");
            this.setIsLogin(false);
            this.removeProfile();
            this.removeAccount();
          }
        });
        this.$router.push({path: '/mine'})
      },
      ...mapMutations([
        'setIsLogin',
        'setAccount',
        'setProfile',
        'removeProfile',
        'removeAccount'
      ])
    }

  }
</script>

<style lang="scss">
  .login {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    .login-main {
      width: 80%;
      margin: 100px auto;
      height: 400px;
      line-height: 80px;
      input {
        width: 100%;
        height: 60px;
        border-radius: 8px;
        text-indent: 24px;
        &::-webkit-input-placeholder {
          padding-left: 12px;
        }
        &:focus {
          outline: none;
          border: 1px solid red;
        }
      }
      .loginbtn {
        line-height: 32px;
        font-size: 28px;
      }
    }
  }

</style>
