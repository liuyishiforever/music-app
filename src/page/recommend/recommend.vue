<template>
  <div class="recommend" ref="recommend">
    <div class="banner">
      <Carousel autoplay v-model="carouselModel" loop :autoplay="true" arrow="never">
        <CarouselItem v-for="banner in banners" :key="banner.url">
          <div class="demo-carousel">
            <img :src="banner.picUrl" width="100%" height="100%" @load="loadImage">
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <m-nav></m-nav>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <list-view title="推荐歌单" :showPlayCount="true" :showSinger="false" :limit="6"
                   :resource="recommendList" @select="selectedList"></list-view>
        <list-view title="最In音乐" :showPlayCount="false" :showSinger="true" :limit="6"
                   :resource="newList" @select="selectedList"></list-view>
        <list-view title="主播电台" :showPlayCount="false" :showSinger="true" :limit="6"
                   :resource="djrecommend" @select="selectedList"></list-view>
      </div>
    </div>
    <router-view></router-view>

  </div>

</template>

<script>


  import nav from '../../components/nav/nav'
  import listView from '../../components/listview/listview'
  import BScroll from 'better-scroll'
  import {mapGetters, mapMutations} from 'vuex'
  import store from "../../store/store.js";

  export default {
    name: "recommend",
    store,
    data() {
      return {
        banners: [],
        carouselModel: 2,
      }
    },
    computed: {
      ...mapGetters([
        'playList',
        'isLogin'
      ])
    },
    mounted() {
      setTimeout(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      }, 20);
      this.handlePlaylist(this.playList);
    },
    activated() {
      this.handlePlaylist(this.playList);
    },
    watch: {
      playList(newVal) {
        this.handlePlaylist(newVal);
      }
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '120px' : '';
        this.$refs.recommend.style.bottom = bottom;
        if (this.scroll) {
          this.scroll.refresh();
        }
      },

      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true;
          this.scroll.refresh();
        }
      },
      selectedList(item) {
        this.$router.push({
          path: `/recommend/${item.id}`
        });
        console.log(item);
        this.setSongList(item);
      },
      ...mapMutations([
        'setSongList'
      ])


    },
    created() {
      this.recommendList = 'http://localhost:3000/top/playlist/highquality';
      this.newList = 'http://localhost:3000/top/playlist?order=hot';
      this.djrecommend = 'http://localhost:3000/personalized/djprogram';

      let url = 'http://localhost:3000/banner';
      this.$axios.get(url).then((res) => {
        this.banners = res.data.banners;
      })
    },
    components: {
      MNav: nav,
      listView: listView
    }

  }
</script>

<style lang="scss">
  .recommend {
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    width: 100%;
    .banner {
      width: 100%;
      height: 360px;
      .ivu-carousel-dots {
        margin-bottom: 28px;
        .ivu-carousel-active > button {
          background: #E8483D;
        }
      }
    }
    .wrapper {
      position: absolute;
      top: 520px;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
    }
  }

</style>
