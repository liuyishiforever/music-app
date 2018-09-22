<template>
  <div class="rank" ref="rankWrapper">
    <officialranking></officialranking>
  </div>
</template>

<script>
  import officialranking from 'components/officialranking/officialranking';
  import BScroll from 'better-scroll'

  export default {
    name: "rank",
    components: {
      officialranking: officialranking
    },
    mounted() {
      setTimeout(() => {
        this.rankScroll = new BScroll(this.$refs.rankWrapper, {
          click: true
        });
      }, 20)
    }
  }
</script>

<style lang="scss">
  .rank {
    position: fixed;
    top: 90px;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    overflow: hidden;
  }

</style>
