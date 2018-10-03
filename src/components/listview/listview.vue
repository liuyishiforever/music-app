<template>
  <div class="list-view">
    <div class="title">
      <span class="text">{{title}}</span><i class="icon iconfont icon-more"></i>
    </div>
    <ul class="playlists">
      <li class="item" v-for="item in playlists" @click="selectItem(item)">
        <div class="cover">
          <img class="cover-img" v-if="item.coverImgUrl" v-lazy="item.coverImgUrl">
          <img class="cover-img" v-if="item.picUrl" v-lazy="item.picUrl">
          <div class="count" v-show="item.playCount && showPlayCount">
            <i class="icon iconfont icon-headset"></i>
            <span class="playCount">{{item.playCount | unitConvert}}</span>
          </div>
        </div>
        <span class="nickname"
              v-if="item.creator && item.creator.nickname && showSinger">{{item.creator.nickname}}</span>
        <span class="name">{{item.name}}</span>
      </li>
    </ul>

  </div>
</template>

<script>

  import {unitConvert} from 'common/js/unitConvert'
  export default {
    name: "listview",
    props: {
      title: {
        type: String
      },
      limit: {
        type: Number
      },
      showSinger: {
        type: Boolean,
        default: true
      },
      showPlayCount: {
        type: Boolean,
        default: true
      },
      resource: {
        type: String
      }
    },
    data() {
      return {
        playlists: []
      }
    },
    created() {
      let url = '';
      if (this.resource.indexOf("?") >= 0) {
        url = `${this.resource}&limit=${this.limit}`;
      } else {
        url = `${this.resource}?limit=${this.limit}`;
      }
      this.$axios.get(url).then((res) => {
        if (res.data.playlists) {
          this.playlists = res.data.playlists;
        } else if (res.data.result) {
          this.playlists = res.data.result;
        }
      })
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item);
      }
    },
    filters: {
      unitConvert(num) {
        return unitConvert(num);
      }
    }
  }
</script>

<style lang="scss">
  .list-view {
    .title {
      font-size: 0;
      margin: 0 0 8px 12px;
      .text {
        font-size: 24px;
        font-weight: bold;
      }
      .icon-more {
        font-size: 24px;
        font-weight: bold;
      }
    }
    .playlists {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 12px 12px 0 12px;
      .item {
        display: inline-block;
        vertical-align: top;
        width: 32%;
        height: 360px;
        .cover {
          position: relative;
          width: 100%;
          .cover-img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
          .count {
            position: absolute;
            top: 0;
            right: 10px;
            color: #fff;
            font-size: 0;
            .icon-headset {
              font-size: 22px;
              margin-right: 5px;
              font-weight: bold;

            }
            .playCount {
              font-size: 20px;
              font-weight: bold;
            }
          }
        }
        .nickname {
          display: block;
          font-size: 24px;
        }
        .name {
          display: -webkit-box;
          font-size: 24px;
          -webkit-box-orient: vertical;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }

</style>
