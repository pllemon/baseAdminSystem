<template>
  <div id="app">
    <the-header v-show="showHeader"/>
    <div class="main-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from '@/components/TheHeader'
export default {  
  name: 'App',
  components: {
    TheHeader
  },
  computed: {
    ...mapGetters([
      'showHeader'
    ])
  }
}
</script>

<style scoped lang="scss">
#app{
  display: flex;
  flex-direction: column;
  .main-view{
    flex: 1;
    position: relative;
    overflow: auto;
  }
}

</style>