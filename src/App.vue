<template>
  <div id="app">
    <tab></tab>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="view"/>
      </keep-alive>
    </transition>
    <player></player>

  </div>
</template>

<script>
  import Tab from '@/components/tab/tab'
  import Player from '@/components/player/player'

  export default {
    name: 'App',
    data() {
      return {
        transitionName: 'left'
      }
    },
    components: {
      Tab,
      Player
    },
    beforeRouteUpdate(to, from, next) {
      // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
      let isBack = this.$router.isBack;
      if (isBack) {
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
      }
      // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
      this.$router.isBack = false;
      next();
    }
  }
</script>

<style lang="scss">
  .view {
    position: absolute;
    width: 100%;
    opacity: 1;
    &.left-enter-active, &.left-leave-active,
    &.right-enter-active, &.right-leave-active {
      transition: all .4s cubic-bezier(.55, 0, .1, 1);
    }
    &.left-enter, &.left-leave-to {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    &.right-enter, &.right-leave-to {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
  }


</style>
