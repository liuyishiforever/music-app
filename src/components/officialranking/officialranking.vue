<template>
  <div class="officialranking" ref="rankingWrapper">
    <div class="content">
      <h1 class="title">官方榜</h1>
      <div class="item soaring">
        <div class="cover">
          <img v-lazy="soaring.coverImgUrl">
          <span class="text">每日更新</span>
        </div>
        <ul class="list">
          <li class="item" v-for="(item, index) in soaring.tracks">
            <span class="line-number">{{index+1}}.</span><span class="name">{{item.name}}</span><span class="singer">{{item.singer}}</span>
          </li>
        </ul>
      </div>
      <div class="item newlist">
        <div class="cover">
          <img v-lazy="newlist.coverImgUrl">
          <span class="text">每日更新</span>
        </div>
        <ul class="list">
          <li class="item" v-for="(item, index) in newlist.tracks">
            <span class="line-number">{{index+1}}.</span><span class="name">{{item.name}}</span><span class="singer">{{item.singer}}</span>
          </li>
        </ul>
      </div>
      <div class="item original">
        <div class="cover">
          <img v-lazy="original.coverImgUrl">
          <span class="text">每日更新</span>
        </div>
        <ul class="list">
          <li class="item" v-for="(item, index) in original.tracks">
            <span class="line-number">{{index+1}}.</span><span class="name">{{item.name}}</span><span class="singer">{{item.singer}}</span>
          </li>
        </ul>
      </div>
      <div class="item hot">
        <div class="cover">
          <img v-lazy="hot.coverImgUrl">
          <span class="text">每周五更新</span>
        </div>
        <ul class="list">
          <li class="item" v-for="(item, index) in hot.tracks">
            <span class="line-number">{{index+1}}.</span><span class="name">{{item.name}}</span><span class="singer">{{item.singer}}</span>
          </li>
        </ul>
      </div>
      <div class="item appreciate">
        <div class="cover">
          <img v-lazy="appreciate.coverImgUrl">
          <span class="text">每周五更新</span>
        </div>
        <ul class="list">
          <li class="item" v-for="(item, index) in appreciate.tracks">
            <span class="line-number">{{index+1}}.</span><span class="name">{{item.name}}</span><span class="singer">{{item.singer}}</span>
          </li>
        </ul>
      </div>
      <div class="item singer">
        <div class="cover">
          <img v-lazy="singer.coverImgUrl">
          <span class="text">每周五更新</span>
        </div>
        <ul class="list">
          <li class="item" v-for="(item, index) in singer.tracks">
            <span class="line-number">{{index+1}}.</span><span class="name">{{item.name}}</span><span class="singer">{{item.singer}}</span>
          </li>
        </ul>
      </div>
      <div class="item seller">
        <div class="cover">
          <img v-lazy="seller.coverImgUrl">
          <span class="text">每周五更新</span>
        </div>
        <ul class="list">
          <li class="item" v-for="(item, index) in seller.tracks">
            <span class="line-number">{{index+1}}.</span><span class="name">{{item.name}}</span><span class="singer">{{item.singer}}</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>

  import Song from 'common/js/song.js';
  import RankList from 'common/js/ranklist.js';

  export default {
    name: "officialranking",
    data() {
      return {
        soaring: [], // 飙升
        newlist: [], // 新
        original: [], //原创
        hot: [], //热歌
        appreciate: [], //赞赏
        singer: [], // 歌手
        seller: [] // 畅销
      }
    },
    created() {
      this.$axios.get('http://localhost:3000/top/list?idx=3').then((res) => {
        this.soaring = this._normalizeData(res.data.playlist);
      })
      this.$axios.get('http://localhost:3000/top/list?idx=0').then((res) => {
        this.newlist = this._normalizeData(res.data.playlist);
      })
      this.$axios.get('http://localhost:3000/top/list?idx=2').then((res) => {
        this.original = this._normalizeData(res.data.playlist);
      })
      this.$axios.get('http://localhost:3000/top/list?idx=1').then((res) => {
        this.hot = this._normalizeData(res.data.playlist);
      })
      this.$axios.get('http://localhost:3000/top/list?idx=4').then((res) => {
        this.appreciate = this._normalizeData(res.data.playlist);
      })
      this.$axios.get('http://localhost:3000/top/list?idx=22').then((res) => {
        this.singer = this._normalizeData(res.data.playlist);
      })
      this.$axios.get('http://localhost:3000/top/list?idx=23').then((res) => {
        this.seller = this._normalizeData(res.data.playlist);
      })
    },
    methods: {
      _normalizeData(data) {
        let list = data.tracks;
        let tracks = [];
        for (let i = 0; i < 3; i++) {
          let item = list[i];
          let name = item.name;
          let singer = '';
          for (let j = 0; j < item.ar.length; j++) {
            singer += item.ar[j].name + '/';
          }
          let song = new Song({
            name: name,
            singer: singer.substring(singer.length - 1, 1)
          });
          tracks.push(song);
        }

        let ranklist = new RankList({
            id: data.id,
            name: data.name,
            coverImgUrl: data.coverImgUrl,
            tracks: tracks
          }
        )
        return ranklist;
      }
    }

  }
</script>

<style lang="scss">
  .officialranking {
    .content {
      .title {
        font-size: 26px;
        font-weight: bold;
        margin: 12px 0;
      }
      .item {
        display: flex;
        align-items:center;
        margin-bottom: 16px;
        .cover {
          flex: 0 0 200px;
          position: relative;
          width: 200px;
          height: 200px;
          img {
            width: 200px;
            height: 200px;
            border-radius: 6px;
          }
          .text {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            font-size: 24px;
          }
        }
        .list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          height: 200px;
          border-bottom: 1px solid #ddd;
          margin-left: 30px;
          .item {
            line-height: 60px;
            font-size: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .line-number {
              font-size: 24px;
              margin-right: 4px;
            }
            .name {
              font-size: 24px;
              margin-right: 8px;
              font-weight: bold;
            }
            .singer {
              font-size: 24px;
            }
          }
        }
      }

    }

  }

</style>
