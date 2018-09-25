<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" v-if="currentSong.al" :src="currentSong.al.picUrl">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="icon iconfont icon-back"></i>
        </div>
        <h1 class="title">{{currentSong.name}}</h1>
        <h2 class="subtitle" v-if="currentSong.ar && currentSong.ar.length>0">{{currentSong.ar[0].name}}</h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image" v-if="currentSong.al" :src="currentSong.al.picUrl">
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric"></div>
          </div>
        </div>
        <div class="middle-r">
          <div class="lyric-wrapper">
            <div>
              <p></p>
            </div>
          </div>

        </div>
      </div>
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot active"></span>
          <span class="dot"></span>
        </div>
        <div class="tool-bar">
          <div class="tool-item favorite active">
            <span class="icon iconfont icon-favorite"></span>
          </div>
          <div class="tool-item download">
            <i class="icon iconfont icon-download"></i>
          </div>
          <div class="tool-item comment">
            <i class="icon iconfont icon-comment-count"><em class="count">999+</em></i>
          </div>
          <div class="tool-item share">
            <i class="icon iconfont icon-share"></i>
          </div>
        </div>
        <div class="progress-wrapper">
          <Tooltip style="width: 100%">
            <Progress :percent="60" :hide-info="true"/>
          </Tooltip>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i class="icon iconfont icon-single-loop"></i>
          </div>
          <div class="icon i-left">
            <i class="icon iconfont icon-prev"></i>
          </div>
          <div class="icon i-center">
            <i class="icon iconfont icon-play"></i>
          </div>
          <div class="icon i-right">
            <i class="icon iconfont icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon iconfont icon-play-list"></i>
          </div>

        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img v-if="currentSong.al" :src="currentSong.al.picUrl" alt="">
      </div>
      <div class="text">
        <h2 class="name">{{currentSong.name}}</h2>
        <p class="desc" v-if="currentSong.ar && currentSong.ar.length>0">{{currentSong.ar[0].name}}</p>
      </div>
      <div class="control">
        <i class="icon iconfont icon-play"></i>
      </div>
      <div class="control">
        <i class="icon iconfont icon-play-list"></i>
      </div>

    </div>
    <audio ref="audio" src="http://m10.music.126.net/20180925192313/34e7784a8310a27f402e230e6de18ad2/ymusic/8af2/e130/063a/aebb396665cc36bad70eb508c2788121.mp3" preload controls loop></audio>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        fullScreen: true,
        currentSongUrl: '',
        currentSong: {}
      }
    },
    methods: {
      back() {
        this.fullScreen = false;
      },
      open() {
        this.fullScreen = true;
      }
    },
    created() {
      let url = 'http://localhost:3000/music/url?id=30612793';
      this.$axios.get(url).then((res) => {
        this.currentSongUrl = res.data.url;
      });
      this.$axios.get('https://api.myjson.com/bins/15r9p0').then((res) => {
        this.currentSong = res.data;
      })
    }
  }
</script>

<style lang="scss">
  .player {
    .normal-player {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 250;
      background: #fff;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(80px);
      }
      .top {
        position: relative;
        margin-bottom: 50px;
        .back {
          position: absolute;
          top: 18px;
          left: 12px;
          z-index: 50;
          transform: rotate(-90deg);
          .icon-back {
            display: block;
            padding: 12px;
            font-size: 36px;
            color: #000;
          }
        }
        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 60px;
          text-align: center;
          font-size: 28px;
        }
        .subtitle {
          line-height: 26px;
          text-align: center;
          font-size: 26px;
          color: #7e8c8d;
        }

      }
      .middle {
        position: fixed;
        width: 100%;
        top: 160px;
        bottom: 280px;
        white-space: nowrap;
        font-size: 0;
        .middle-l {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            border: 80px solid #000;
            border-radius: 50%;
            .cd {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

          }
        }
        .middle-r {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;

        }
      }
      .bottom {
        position: absolute;
        bottom: 25px;
        width: 100%;
        .dot-wrapper {
          text-align: center;
          font-size: 0;
          .dot {
          }
        }
        .progress-wrapper {
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0 auto;
          padding: 10px 0;
          .ivu-progress-bg {
            height: 4px !important;
            background: #E8483D;
          }
        }
        .tool-bar {
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0 auto;
          .tool-item {
            flex: 1;
            text-align: center;
            .icon {
              font-size: 48px;
              &.icon-favorite {
                color: #E8483D;
              }
              &.icon-comment-count {
                position: relative;
                .count {
                  font-size: 22px;
                  font-style: normal;
                  position: absolute;
                  top: -12px;
                  left: 32px
                }
              }
            }
          }

        }
        .operators {
          display: flex;
          align-items: center;
          .icon {
            flex: 1;
          }
          .i-left {
            text-align: right;
            i {
              font-size: 48px;
            }
          }
          .i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 72px;
            }
          }
          .i-right {
            text-align: left;
            i {
              font-size: 48px;
            }
          }

        }

      }

    }
    .mini-player {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 120px;
      background: #fff;
      border-top: 2px solid #eee;
      .icon {
        flex: 0 0 120px;
        width: 120px;
        text-align: center;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 40px;
        overflow: hidden;
        .name {
          margin-bottom: 4px;
          font-size: 24px;
          font-weight: bold;
        }
        .desc {
          font-size: 22px;
          color: #7e8c8d;
        }
      }
      .control {
        flex: 0 0 90px;
        width: 90px;
        text-align: center;
        .icon-play {
          font-size: 60px;
        }
        .icon-play-list {
          font-size: 60px;

        }
      }

    }

  }

</style>