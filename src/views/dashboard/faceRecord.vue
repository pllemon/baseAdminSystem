<template>
  <el-table
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
  >
    <el-table-column label="编号" prop="" />
    <el-table-column label="位置" prop="label" />
    <el-table-column label="刷卡次数" prop="value" />
    <el-table-column label="最近刷卡时间" prop="" />
  </el-table>
</template>

<script>
import { openDevicePersonCount } from '@/api/index'
export default {
  name: 'Dashboard',
  data() {
    return {
      listLoading: true,
      list: []
    }
  },
  created() {
    openDevicePersonCount().then(response => {
      this.listLoading = false
      let {data} = response
      this.list = data
      console.log(data)
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
