<template>
  <div class="search">
    {{show}}
    全屏: {{fullScreen}}
    <div class="box" v-show="show"></div>
    <button @click="toggle">点击</button>
    <button @click="toggle2">点击全屏</button>
    <button @click="toggle3">使用action</button>
  </div>
</template>

<script>

  import store from "../../store/store.js";
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    store,
    name: "search",
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'show',
        'fullScreen'
      ])
    },
    methods: {
      toggle() {
        this.setShow(!this.show)
      },
      toggle2() {
        this.setFullScreen(!this.fullScreen)
      },
      toggle3() {
        this.selectPlay({
          list: [],
          index: 3
        })
      },


      ...mapMutations([
        'setShow',
        'setFullScreen'
      ]),
      ...mapActions([
        'selectPlay'
      ])


    }
  }
</script>

<style lang="scss">
  .box {
    width: 200px;
    height: 200px;
    background: red;
  }

</style>
