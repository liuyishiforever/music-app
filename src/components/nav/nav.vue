<template>
  <div class="nav">
    <div class="nav-item">
      <div class="item-content">
        <span class="icon-wrapper">
          <i class="icon iconfont icon-fm"></i>
        </span>
        <span class="text">私人MF</span>
      </div>

    </div>
    <div class="nav-item">
      <div class="item-content">
        <span class="icon-wrapper">
          <i class="icon iconfont icon-calendar"></i>
        </span>
        <span class="text">每日推荐</span>
      </div>

  </div>
  <div class="nav-item">
    <div class="item-content">
        <span class="icon-wrapper">
         <i class="icon iconfont icon-songlist"></i>
        </span>
      <span class="text">收藏</span>
    </div>
  </div>
  <div class="nav-item">
    <div class="item-content">
         <span class="icon-wrapper">
            <i class="icon iconfont icon-rank"></i>
         </span>
      <span class="text">排行</span>
    </div>
  </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .nav {
    display: flex;
    align-items:center;
    height: 120px;
    background: #fff;
    border-bottom: 1px solid #eee;
    .nav-item {
      flex: 1;
      text-align: center;
      font-size: 0;
      .item-content {
        .icon-wrapper {
          display: inline-block;
          width: 80px;
          height: 80px;
          line-height: 80px;
          text-align: center;
          background: #E8483D;
          border-radius: 50%;
          .icon {
            display: block;
            font-size: 48px;
            color: #fff;
          }
        }
        .text {
          display: block;
          font-size: 24px;

        }
      }

    }
  }

</style>
