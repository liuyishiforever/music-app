<template>
  <div class="login">

    <div class="logo">
      <img src="../../common/image/default.png">
    </div>
    <div class="login-main">
      <input type="text" placeholder="账号" v-model="username">
      <input type="password" placeholder="密码" v-model="password">
      <Button class="loginbtn" @click="goLogin" long :disabled="disabled">登录</Button>
    </div>
    <div class="try" @click="goIndex"><span>游客试用</span></div>
    <div class="login-type">
      <div class="title">其他登录方式</div>
      <div class="type">
        <div class="type-content">
          <div class="type-item wechat">
            <div class="type-icon"><i class="icon iconfont icon-WeChat"></i></div>
            <div class="text">微信</div>
          </div>
          <div class="type-item qq">
            <div class="type-icon"><i class="icon iconfont icon-QQ"></i></div>
            <div class="text">QQ</div>
          </div>
          <div class="type-item weibo">
            <div class="type-icon"><i class="icon iconfont icon-Weibo"></i></div>
            <div class="text">微博</div>
          </div>
          <div class="type-item ntes">
            <div class="type-icon"><i class="icon iconfont icon-NTES"></i></div>
            <div class="text">网易</div>
          </div>
        </div>
      </div>
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
      goIndex() {
        this.$router.push({path: '/'})
      },
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
    .logo {
      width: 400px;
      height: 400px;
      margin: 40px auto;
      img {
        width: 400px;
        height: 400px;
        border-radius: 50%;
      }
    }
    .login-main {
      width: 80%;
      margin: 100px auto;
      line-height: 80px;
      input {
        width: 100%;
        height: 60px;
        border: 2px solid #ccc;
        border-radius: 8px;
        text-indent: 24px;
        &::-webkit-input-placeholder {
          padding-left: 12px;
        }
        &:focus {
          outline: none;
          border: 2px solid red;
        }
      }
      .loginbtn {
        line-height: 48px;
        background-color: #C92027;
        border-radius: 8px;
        color: #fff;
        span {
          font-size: 28px;
          font-weight: bold;
        }
      }
    }
    .try {
      width: 80%;
      margin: 20px auto;
      text-align: center;
      font-size: 26px;
    }
    .login-type {
      display: flex;
      width: 80%;
      margin: 400px auto;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      .title {
        height: 80px;
        line-height: 80px;
        font-size: 28px;
      }
      .type {
        .type-content {
          display: flex;
          justify-content: center;
          .type-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            .type-icon {
              line-height: 80px;
              width: 80px;
              height:80px;
              border: 2px solid #ccc;
              border-radius: 50%;
              text-align: center;
              .icon {
                font-size: 60px;
                &.icon-WeChat {
                  color: #00AC00;
                }
                &.icon-QQ {
                  color: #007DFF;
                }
                &.icon-Weibo {
                  color: #F80000;
                }
                &.icon-NTES {
                  color: #F30000;
                }
              }
            }
            .text {
              height: 80px;
              line-height: 80px;
              font-size: 24px;
            }
          }
        }



      }
    }
  }

</style>
