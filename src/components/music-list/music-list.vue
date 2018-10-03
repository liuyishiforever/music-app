<template>
  <div class="music-list">
    <div class="header">
      <div class="header-img">
        <img :src="songs.coverImgUrl">
        <div class="play-count"><i class="icon iconfont icon-headset"></i>{{songs.playCount|unitConvert}}</div>
        <div class="detail-btn"><i class="icon iconfont icon-detail"></i></div>
      </div>
      <div class="header-content">
        <div class="name">{{songs.name}}</div>
        <div class="tags" v-show="songs.tags">
          <span>标签: </span><span class="tag" v-for="tag in songs.tags">{{tag}}</span>
        </div>
        <div class="subname" v-if="songs.subscribers && songs.subscribers.length > 0">
          {{songs.subscribers[0].nickname}}<span class="create-time">创建于{{songs.createTime|timestampToTime}}</span>
        </div>
      </div>
      <div class="back" @click="back">
        <i class="icon iconfont icon-close"></i>
      </div>
      <div class="background">
        <img :src="songs.coverImgUrl">
      </div>
    </div>
    <div class="body">
      <div class="header-bar">
        <i class="icon iconfont icon-play"></i><span class="playAll">播放全部<i
        class="count">(共{{detail.length}}首)</i></span>
        <span class="collect"><i class="icon iconfont icon-add"></i>收藏({{subscribedCount|unitConvert}})</span>
      </div>
      <div class="songList-wrapper" ref="listWrapper">
        <ul class="songlist">
          <transition-group name="list-complete">
            <li class="song-item" v-for="(item, index) in detail" :key="index" @click="selectItem(item, index, $event)">
              <div class="line-number">
                <span>{{index+1}}</span>
              </div>
              <div class="item-content">
                <div class="songname">{{item.name}}</div>
                <div class="songer">{{item.ar[0].name}} - {{item.al.name}}</div>
              </div>
              <div class="tool">
                <i class="icon iconfont icon-tool"></i>
              </div>
            </li>
          </transition-group>
        </ul>

      </div>

    </div>

  </div>
</template>

<script>

  import {unitConvert} from 'common/js/unitConvert'
  import {timestampToTime} from 'common/js/date'
  import BSCroll from 'better-scroll'
  import {mapGetters, mapActions} from 'vuex'


  export default {
    name: "music-list",
    props: {
      songs: {
        type: Object
      },
      id: {
        type: [String, Number]
      }
    },
    data() {
      return {
        detail: [],
        subscribedCount: ''
      }
    },
    computed: {
      ...mapGetters([
        'currentIndex',
        'playing',
        'fullScreen'
      ])
    },
    created() {
      if (this.id) {
        let url = `http://localhost:3000/playlist/detail?id=${this.id}`;
        this.$axios.get(url).then((res) => {
          this.detail = res.data.playlist.tracks;
          this.subscribedCount = res.data.playlist.subscribedCount;
          this.$nextTick(() => {
            this.scroll = new BSCroll(this.$refs.listWrapper, {
              click: true
            })
          })

        })
      }
    },
    methods: {
      selectItem(item, index, event) {
        if (!event._constructed) {
          return;
        }
        this.selectPlay({
          list: this.detail,
          index
        })
      },
      back() {
        this.$router.back(-1);
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    filters: {
      timestampToTime(timestamp) {
        return timestampToTime(timestamp);
      },
      unitConvert(num) {
        return unitConvert(num);
      }
    }
  }
</script>

<style lang="scss">
  .music-list {
    position: fixed;
    z-index: 200;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    .header {
      position: relative;
      display: flex;
      width: 100%;
      height: 400px;
      align-items: center;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.2);
      .header-img {
        display: flex;
        position: relative;
        justify-content: center;
        flex: 0 0 300px;
        width: 300px;
        height: 250px;
        img {
          width: 250px;
          height: 250px;
        }
        .play-count {
          position: absolute;
          top: 0;
          right: 40px;
          color: #fff;
          font-size: 24px;
          font-weight: bold;
          .icon-headset {
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            margin-right: 8px;
          }
        }
        .detail-btn {
          position: absolute;
          bottom: 0;
          right: 42px;
          color: #fff;
          .icon-detail {
            font-size: 36px;
            font-weight: bold;

          }
        }
      }
      .header-content {
        flex: 1;
        height: 250px;
        padding-right: 25px;
        color: #fff;
        .name {
          margin: 20px 0;
          height: 90px;
          font-size: 32px;
          font-weight: bold;
        }
        .tags {
          margin-bottom: 24px;
          font-size: 26px;
          line-height: 26px;
          height: 26px;
          .tag {
            padding: 0 12px;
            border: 2px solid #fff;
            border-radius: 8px;
            margin-left: 12px;
          }
        }
        .subname {
          font-size: 26px;
          line-height: 26px;
          height: 26px;
          .create-time {
            margin-left: 10px;
          }

        }

      }
      .icon-close {
        position: absolute;
        top: 0;
        right: 16px;
        padding: 20px;
        color: #fff;
        font-size: 32px;
        font-weight: bold;
      }
      .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 400px;
        z-index: -1;
        filter: blur(100px);
        overflow: hidden;

      }
    }
    .body {
      .header-bar {
        display: flex;
        line-height: 80px;
        height: 80px;
        border-bottom: 1px solid #eee;
        justify-content: center;
        text-align: center;
        .icon-play {
          width: 80px;
          font-size: 48px;
        }
        .playAll {
          flex: 1;
          font-size: 26px;
          text-align: left;
          .count {
            font-size: 24px;
            font-style: normal;
            color: #7e8c8d;
          }
        }
        .collect {
          padding: 0 24px;
          background: #F93021;
          color: #fff;
          font-size: 26px;
          font-weight: bold;
          text-align: center;
          .icon-add {
            font-size: 26px;
            color: #fff;
            font-weight: bold;
          }
        }
      }
      .songList-wrapper {
        position: absolute;
        top: 480px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .songlist {
          background: #fff;
          .song-item {
            display: flex;
            &.list-complete-enter-active, &.list-complete-leave-active {
              transition: all 0.2s linear;
            }
            &.list-complete-enter, &.list-complete-leave-to {
              opacity: 0;
              transform: translateY(30px);
            }
            .line-number {
              flex: 0 0 80px;
              width: 80px;
              height: 80px;
              line-height: 80px;
              text-align: center;
              font-size: 30px;
              color: #7e8c8d;

            }
            .item-content {
              flex: 1;
              border-bottom: 1px solid #eee;
              width: 80%;
              .songname {
                font-size: 28px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

              }
              .songer {
                font-size: 22px;
                color: #7e8c8d;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

              }

            }
            .tool {
              flex: 0 0 80px;
              width: 80px;
              line-height: 80px;
              border-bottom: 1px solid #eee;
              text-align: center;
              .icon-tool {
                font-size: 30px;

              }
            }

          }
        }
      }

    }
  }

</style>
