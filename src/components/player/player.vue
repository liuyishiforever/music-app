<template>
  <div class="player" v-if="playList.length">
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
            <div class="cd" :class="cdCls">
              <img class="image" v-if="currentSong.al" :src="currentSong.al.picUrl">
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div v-if="currentLyric" class="playing-lyric">
              <p ref="lyricLine"
                 class="text"
                 v-for="(line,index) in currentLyric.lines" v-if="index === currentLineNum">{{line.txt}}</p>
            </div>
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
          <div class="icon i-center" @click="togglePlaying">
            <i class="icon iconfont icon-play" :class="playIcon"></i>
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
        <img :class="cdCls" v-if="currentSong.al" :src="currentSong.al.picUrl">
      </div>
      <div class="text">
        <h2 class="name">{{currentSong.name}}</h2>
        <p class="desc" v-if="currentSong.ar && currentSong.ar.length>0">{{currentSong.ar[0].name}}</p>
      </div>
      <div class="control" @click.stop.prevent="togglePlaying">
        <i class="icon iconfont playIcon" :class="playIcon"></i>
      </div>
      <div class="control">
        <i class="icon iconfont icon-play-list"></i>
      </div>
    </div>
    <audio ref="audio" :src="currentSongUrl" preload loop autoplay></audio>

  </div>
</template>

<script>

  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import Playlist from '../../components/playlist/playlist'
  import Lyric from 'lyric-parser';
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        currentSongUrl: '',
        lyric: '',
        currentLyric: null,
        currentLineNum: 0,
        playingLyric: ''
      }
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'pause'
      },

      playIcon() {
        return this.playing ? 'icon-play' : 'icon-pause'
      },

      ...mapGetters([
        'playList',
        'fullScreen',
        'playing',
        'currentSong',
      ])
    },
    watch: {
      playing(newPlaying) {
        const audio = this.$refs.audio;
        if (audio) {
          this.$nextTick(() => {
            newPlaying ? audio.play() : audio.pause();
          })
        }
      },

      currentSong(val) {
        this.getCurrentSongUrl(val);
        document.title = '🎶️' + val.name;
        if (val == null && !playing) {
          document.title = 'music-app';
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$refs.audio.play();
          this.getLyric(val);
        }, 200)

      }
    },
    methods: {

      togglePlaying() {
        this.setPlaying(!this.playing);
      },

      back() {
        this.setFullScreen(false);
      },
      open() {
        this.setFullScreen(true);
      },
      getCurrentSongUrl(song) {
        let id = song.id;
        let url = `http://localhost:3000/music/url?id=${id}`;
        this.$axios.get(url).then((res) => {
          this.currentSongUrl = res.data.data[0].url;
        });
      },

      getLyric(song) {
        // 获取歌词
        let id = song.id;
        this.$axios.get(`http://localhost:3000/lyric?id=${id}`).then((res) => {
          if (res.data.nolyric) {
            this.playingLyric = '纯音乐, 无歌词';
            return;
          }
          this.playingLyric = res.data.lrc.lyric;
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric);
          console.log(this.currentLyric);
          if (this.playing) {
            this.currentLyric.play();
          }
        })
      },
      handleLyric({lineNum, text}) {
        this.currentLineNum = lineNum;
        this.playingLyric = text;
      },
      ...mapMutations([
        'setFullScreen',
        'setPlaying'
      ])


    },
    created() {
    },
    components: {
      Playlist
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
          }
        }
        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 60px;
          text-align: center;
          font-size: 28px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .subtitle {
          line-height: 42px;
          text-align: center;
          font-size: 26px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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
              &.play {
                animation: rotate 20s linear infinite;
              }
              &.pause {
                animation-play-state: paused;
              }
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
          .playing-lyric-wrapper {
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
            .playing-lyric {
              height: 40px;
              font-size: 24px;
              color: #7e8c8d;
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
          border: 1px solid #ccc;
          &.play {
            animation: rotate 10s linear infinite;
          }
          &.pause {
            animation-play-state: paused
          }

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
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .desc {
          font-size: 22px;
          color: #7e8c8d;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .control {
        flex: 0 0 90px;
        width: 90px;
        text-align: center;
        .playIcon {
          font-size: 60px;
        }
        .icon-play-list {
          font-size: 60px;
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }


</style>
