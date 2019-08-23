<template>
  <el-dialog title="个人打卡详情" :visible="true" :before-close="handleClose" width="80%">
    <div class="flex-start-between">
      <div class="flex-center-start flex1 personal-mes">
        <img class="face-img" src="">
        <div>
          <p><label>员工姓名：</label><span>李花花</span></p>
          <p><label>员工编号：</label><span>G0231212</span></p>
        </div>
        <div>
          <p><label>部门：</label><span>产品部</span></p>
          <p><label>职位：</label><span>产品经理</span></p>
        </div>
        <div>
          <p><label>今天上午打卡：</label><span>08:00（正常）</span></p>
          <p><label>今天下午打卡：</label><span>17:30（正常）</span></p>
        </div>
      </div>
      <el-button>导出记录</el-button>
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
      <el-table-column label="员工编号" prop="code" />
      <el-table-column label="员工姓名">
        <template slot-scope="scope">
          <span @click="showPersonalRecord(scope.$index)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门禁机位置" prop="sex" />
      <el-table-column label="记录时间" prop="birthday" width="200" />
      <el-table-column label="时段类型" prop="personType" />
      <el-table-column label="抓拍图像">
        <template slot-scope="scope">
          <img :src="scope.row.facePath" class="face-img">
        </template>
      </el-table-column>
    </el-table>
    <gd-pagination
      :total="total"
      :current-page="query.page"
      :page-size="query.limit"
    />
  </el-dialog>
</template>

<script>
import { getList } from '@/api/staffManage'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      query: {
        limit: 20,
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

    handleClose() {
      this.$parent.currentComponent = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-mes{
  div{
    margin-left: 30px;
  }
}
</style>
