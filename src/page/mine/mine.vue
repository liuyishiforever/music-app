<template>
  <div class="mine" ref="mine">
    <div class="mine-content">
      <div class="login-panel" @click="goLogin" v-if="!isLogin">
        <span>登录云音乐</span>
        <span>320k高音质无限下载, 手机电脑多端同步</span>
        <div>
          <span class="login-btn">立即登录</span>
        </div>
      </div>
      <div class="userInfo" v-if="isLogin">
        <div class="avatar">
          <img :src="profile.avatarUrl">
        </div>
        <div class="content">
          <span class="username">{{profile.nickname}}<i class="icon iconfont icon-vip"></i></span>

          <span class="level">

            <span class="lv">lv.99</span>
          </span>
        </div>
      </div>
      <ul class="list">
        <li class="list-item local">
          <span class="icon iconfont icon-local"></span>
          <span class="text">本地音乐<i class="count">(0)</i></span>
        </li>
        <li class="list-item recent">
          <span class="icon iconfont icon-recent"></span>
          <span class="text">最近播放<i class="count">(12)</i></span>
        </li>
        <li class="list-item download">
          <span class="icon iconfont icon-download"></span>
          <span class="text">下载管理<i class="count">(0)</i></span>
        </li>
        <li class="list-item my-radio">
          <span class="icon iconfont icon-my-radio"></span>
          <span class="text">我的电台<i class="count">(0)</i></span>
        </li>
        <li class="list-item sati-space">
          <span class="icon iconfont icon-Sati"></span>
          <span class="text">Sati空间<i class="count">(特别的聆听模式)</i></span>
        </li>
      </ul>
      <transition-group name="list-complete">
        <div class="createdPlay list-complete-item" :key="1">
          <h1 class="title" @click="toggle1">
            <i class="icon iconfont icon-more" :class="{'left': !createdPlayShow}"></i><span
            class="text">创建的歌单</span><span
            class="count">({{createdPlaylist.length}})</span>
          </h1>
          <transition name="fade">
            <div class="content-wrapper" v-show="createdPlayShow" ref="createdPlayWrapper">
              <ul>
                <li class="item" v-for="item in createdPlaylist">
                  <div class="cover">
                    <img v-lazy="item.coverImgUrl">
                  </div>
                  <div class="content">
                    <h2 class="subtitle">{{item.name}}</h2>
                    <span class="count">87首</span>
                  </div>
                </li>
              </ul>
            </div>
          </transition>
        </div>
        <div class="subPlaylist list-complete-item" :key="2">
          <h1 class="title" @click="toggle2">
            <i class="icon iconfont icon-more" :class="{'left': !subPlaylistShow}"></i><span
            class="text">收藏的歌单</span><span
            class="count">({{subPlaylist.length}})</span>
          </h1>
          <transition name="fade">
            <div class="content-wrapper" v-show="subPlaylistShow" ref="subPlaylistWrapper">
              <ul>
                <li class="item" v-for="item in subPlaylist">
                  <div class="cover">
                    <img v-lazy="item.coverImgUrl">
                  </div>
                  <div class="content">
                    <h2 class="subtitle">{{item.name}}</h2>
                    <span class="desc" v-if="item.creator">{{item.trackCount}}首 by {{item.creator.nickname}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </transition-group>

    </div>
    <router-view></router-view>

  </div>
</template>

<script>

  import BScroll from 'better-scroll'

  import store from "../../store/store.js";
  import {mapGetters} from 'vuex';


  export default {
    name: "mine",
    store,
    data() {
      return {
        createdPlaylist: [],
        subPlaylist: [],
        createdPlayFold: false,
        subPlaylistFold: false,
      }
    },
    mounted() {
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.mine, {
          click: true
        })
      }, 20)
    },
    watch: {
      isLogin(val, oldVal) {
        if (val) {
          this._initData();
        }
        this.scroll.refresh();
      }
    },

    created() {
      if (this.account) {
        this._initData();
      }

    },
    computed: {
      createdPlayShow() {
        return !this.createdPlayFold;
      },
      subPlaylistShow() {
        return !this.subPlaylistFold;
      },
      ...mapGetters([
        'isLogin',
        'profile',
        'account'
      ])


    },
    methods: {

      _initData() {
        let userId = this.account.id;
        let url = `http://localhost:3000/user/playlist?uid=${userId}`;
        this.$axios.get(url).then((res) => {
          let list = res.data.playlist;
          this._normalizeData(list, userId);
        })
      },


      toggle1() {
        if (!this.createdPlaylist.length) {
          return;
        }
        this.createdPlayFold = !this.createdPlayFold;
      },

      toggle2() {
        if (!this.subPlaylist.length) {
          return;
        }
        this.subPlaylistFold = !this.subPlaylistFold;

      },
      goLogin() {
        this.$router.push({
          path: '/login'
        })
      },
      _normalizeData(list, userid) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if (item.userId === userid) {
            this.createdPlaylist.push(item);
          } else {
            this.subPlaylist.push(item);
          }
        }
      },

    }

  }
</script>

<style lang="scss">
  .mine {
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .login-panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 160px;
      justify-content: center;
      font-size: 24px;
      border-bottom: 1px solid #ddd;
      .login-btn {
        padding: 10px 32px;
        border: 2px solid red;
        border-radius: 32px;
        line-height: 80px;
      }

    }

    .userInfo {
      display: flex;
      height: 160px;
      background-size: 100%;
      background-image: url("../../assets/bcg.jpg");

      .avatar {
        display: flex;
        align-items: center;
        flex: 0 0 96px;
        margin-left: 24px;
        width: 96px;
        img {
          width: 96px;
          height: 96px;
          border-radius: 50%;
        }
      }
      .content {
        display: flex;
        flex: 1;
        margin-left: 40px;
        flex-direction: column;
        justify-content: center;
        .username {
          font-size: 26px;
          font-weight: bold;
          color: #fff;
          .icon-vip {
            font-size: 26px;
            color: #fff;
          }
        }

        .level {
          font-size: 22px;
          color: #ddd;
          font-weight: bold;
          .lv {
            padding: 0 12px;
            border: 2px solid #ddd;
            border-radius: 12px;
            font-weight: bold;
          }
        }
      }

    }
    .list {
      .list-item {
        display: flex;
        height: 80px;
        line-height: 80px;
        text-align: center;
        .icon {
          flex: 0 0 80px;
          width: 80px;
          font-size: 48px;
          color: #e8483d;
        }
        &:last-child {
          .text {
            border-bottom: none;
          }
        }
        .text {
          flex: 1;
          text-align: left;
          font-size: 24px;
          border-bottom: 1px solid #eee;
          .count {
            margin-left: 6px;
            font-size: 22px;
            font-style: normal;
            color: #7e8c8d;
          }
        }

      }
    }
    .createdPlay {
      .title {
        height: 46px;
        line-height: 46px;
        background: #eee;
        font-size: 26px;
        .icon-more {
          display: inline-block;
          vertical-align: top;
          margin: 0 16px;
          font-size: 32px;
          transform: rotate(90deg);
          transition: all 0.2s linear;
          &.left {
            transform: rotate(0);
          }
        }
        .text {
          vertical-align: top;
          display: inline-block;
        }
        .count {
          display: inline-block;
        }
      }
      .content-wrapper {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        &.fade-enter-active, &.fade-leave-active {
          transition: all 0.2s linear;
        }
        &.fade-enter, &.fade-leave-to {
          opacity: 0;
          transform: translate3d(0, -10px, 0);
        }
        .item {
          display: flex;
          align-items: center;
          padding: 8px 20px;
          .cover {
            flex: 0 0 120px;
            width: 120px;
            height: 120px;
            img {
              width: 120px;
              height: 120px;
              border-radius: 4px;
            }
          }
          .content {
            display: flex;
            flex-direction: column;
            align-content: center;
            font-size: 0;
            margin-left: 32px;
            .subtitle {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .count {
              font-size: 22px;
            }
          }
        }
      }
    }
    .subPlaylist {
      .title {
        height: 46px;
        line-height: 46px;
        background: #eee;
        font-size: 26px;
        .icon-more {
          display: inline-block;
          vertical-align: top;
          margin: 0 16px;
          font-size: 32px;
          transform: rotate(90deg);
          transition: all 0.2s linear;
          &.left {
            transform: rotate(0);
          }
        }
        .text {
          vertical-align: top;
          display: inline-block;
        }
        .count {
          display: inline-block;
        }
      }
      .content-wrapper {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        &.fade-enter-active, &.fade-leave-active {
          transition: all 0.2s linear;
        }
        &.fade-enter, &.fade-leave-to {
          opacity: 0;
          transform: translate3d(0, -10px, 0);
        }
        .item {
          display: flex;
          align-items: center;
          padding: 8px 20px;
          .cover {
            flex: 0 0 120px;
            width: 120px;
            height: 120px;
            img {
              width: 120px;
              height: 120px;
              border-radius: 4px;
            }
          }
          .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 0;
            margin-left: 32px;
            .subtitle {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .desc {
              font-size: 22px;
            }
          }
        }
      }
    }
  }

  .list-complete-item {
    transition: all 0.2s linear;
  }

  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }


</style>
