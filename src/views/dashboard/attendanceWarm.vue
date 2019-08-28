<template>
  <el-table
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
  >
    <el-table-column label="工号" prop="personCode" />
    <el-table-column label="姓名" prop="personName" />
    <el-table-column label="部门" prop="" />
    <el-table-column label="职位" prop="" />
    <el-table-column label="异常次数" prop="attendanceCount" />
    <el-table-column label="异常日期" prop="" />
  </el-table>
</template>

<script>
import { getUnusualAttendanceCount } from '@/api/index'
export default {
  data() {
    return {
      listLoading: true,
      list: []
    }
  },
  created() {
    getUnusualAttendanceCount().then(response => {
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
