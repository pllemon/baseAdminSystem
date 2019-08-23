<template>
  <div>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="10"></el-progress>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="10"></el-progress>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="10"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      attendList: [1, 2, 3]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
