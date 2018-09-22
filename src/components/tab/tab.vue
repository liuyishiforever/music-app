<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/mine">
      <span class="tab-link">我的</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "tab",
  }
</script>

<style lang="scss">
  .tab {
    display: flex;
    width: 100%;
    height: 80px;
    line-height: 80px;
    background: #E8483D;
    .tab-item {
      flex: 1;
      text-align: center;
      .tab-link {
        padding-bottom: 5px;
        color: #fff;
        font-size: 28px;
      }
      &.active {
        .tab-link {
          color: #fff;
          font-weight: bold;
          border-bottom: 2px solid #fff;
        }

      }
    }
  }
</style>
