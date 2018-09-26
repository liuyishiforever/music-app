<template>
  <transition name="fade">
    <music-list :songs="songs" :id="id"></music-list>
  </transition>
</template>

<script>

  import {mapGetters} from 'vuex'
  import musicList from '../../../components/music-list/music-list'

  export default {
    data() {
      return {
        songs: {},
        id: ''
      }
    },
    created() {
      this._getSongList();

    },
    methods: {

      _getSongList() {
        if (!this.songList || !this.songList.id) {
          this.$router.push('/mine');
          return;
        }
        this.songs = this.songList;
        this.id = this.songList.id;
      },
    },
    computed: {
      ...mapGetters([
        'songList'
      ])
    },
    components: {
      musicList
    },

  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }


</style>
