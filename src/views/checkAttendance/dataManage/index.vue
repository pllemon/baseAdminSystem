<template>
  <div class="app-container">
    <div class="search-content">
      <div></div>
      <div class="other-action">
        <el-button @click="changeSingle()"><img src="@/assets/icon/add.png">添加数据</el-button>
        <el-button @click="batchRemove()"><img src="@/assets/icon/delete.png">删除数据</el-button>
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
      @selection-change="changeChoose"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" width="50" align="center" />
      <el-table-column label="服务器地址" prop="url" />
      <el-table-column label="同步频率（秒）" prop="taskInterval" />
      <el-table-column label="认证参数" prop="params" />
      <el-table-column label="设备列表">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.deviceNameList" :key="index">{{item}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button type="text" @click="changeSingle(1, scope.row.id)">查看</el-button> -->
          <el-button type="text" @click="changeSingle(2, scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <gd-pagination :total="total" :current-page="query.page" :page-size="query.limit" />

    <!-- 动态组件 -->
    <component :is="currentComponent" :dialog-mes="dialogMes" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList, batchRemove } from '@/api/attendanceData'
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
      },
      chooseList: []
    }
  },

  computed: {
    ...mapGetters([
      'allDict'
    ]),
    chooseIds() {
      const ids = []
      this.chooseList.forEach((item) => {
        ids.push(item.id)
      })
      return ids
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    changeChoose(val) {
      this.chooseList = val
    },

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
    batchRemove() {
      if (!this.chooseIds.length) {
        this.$message.error('请至少勾选一条记录')
        return false
      }
      this.$confirm('确定删除选定的记录?', '提示', {
        type: 'warning'
      }).then(() => {
        batchRemove({ ids: this.chooseIds }).then(response => {
          this.fetchData()
          this.$notify({
            title: '提示',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
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
