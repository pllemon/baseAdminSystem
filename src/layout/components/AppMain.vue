<template>
  <section class="app-main flex1">
    <transition name="fade-transform" mode="out-in">
      <!-- <router-view :key="key" />-->
      <!-- <keep-alive :include="cachedViews"> -->
      <router-view />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }/*,
    key() {
      return this.$route.path
    }*/
  }
}
</script>

<style scoped>
.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #fff;
  margin-top: 10px;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
