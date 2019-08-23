<template>
  <div class="app-container">
    <div class="search-content flex-start-between">
      <div class="other-action">
        <el-button @click="changeSingle()"><img src="@/assets/icon/add.png">添加数据</el-button>
        <el-button><img src="@/assets/icon/delete.png">删除数据</el-button>
      </div>
    </div>

    <!-- 表格数据&分页 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" width="50" align="center" />
      <el-table-column label="服务器地址" prop="code" />
      <el-table-column label="同步频率（秒）" prop="personType" />
      <el-table-column label="门禁机列表" prop="personType" />
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="changeSingle(1, scope.row.id)">查看</el-button>
          <el-button type="text" @click="changeSingle(2, scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <gd-pagination :total="total" :current-page="query.page" :page-size="query.limit"/>

    <!-- 动态组件 -->
    <component :is="currentComponent" :dialog-mes="dialogMes" />
  </div>
</template>

<script>
import { getList, deleteSingle } from '@/api/attendanceData'
import ChangeDialog from '@/views/checkAttendance/dataManage/change'

export default {
  components: {
    ChangeDialog
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentComponent: '',
      currentId: '',
      dialogMes: {},
      total: 0,
      query: {
        limit: 10,
        page: 1
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取列表
    fetchData() {
      this.listLoading = true
      getList(this.query).then(response => {
        const { data } = response
        this.list = data.rows
        this.total = data.total
        this.listLoading = false
      })
    },

    // 添加、编辑、查看
    changeSingle(type = 0, id = '') {
      this.dialogMes = {
        type: type,
        id: id
      }
      this.currentComponent = 'changeDialog'
    },

    // 删除
    deleteSingle(id) {
      this.$confirm('确定删除该记录?', '提示', {
        type: 'warning'
      }).then(() => {
        deleteSingle({ id: id }).then(response => {
          this.fetchData()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.staffName{
  color: blue;
  cursor: pointer;
}
</style>
