<template>
  <div class="app-container">
    <div class="search-content">
      <el-form :inline="true" :model="searchForm">
        <div class="form-content">
          <el-row>
            <el-form-item label="时间段">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.date2" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="工号">
              <el-input v-model="searchForm.user" placeholder="请输入"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="姓名">
              <el-input v-model="searchForm.user" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="门禁机设备">
              <el-select v-model="searchForm.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </div>
        <div class="form-action">
          <el-button type="primary" class="search" @click="search">查询</el-button>
          <el-button class="reset reset">清空</el-button>
        </div>
      </el-form>
      <div class="other-action" style="width: 200px;">
        <el-button @click="changeDevice()"><img src="@/assets/icon/add.png">添加</el-button>
        <el-button @click="deleteDevice()"><img src="@/assets/icon/delete.png">删除</el-button>
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
      <el-table-column label="序号" type="index" width="80" align="center" />
      <el-table-column label="员工编号" prop="code" />
      <el-table-column label="员工姓名">
        <template slot-scope="scope">
          <span class="staffName" @click="showPersonal(scope.$index)">{{ scope.row.name }}</span>
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
    <gd-pagination :total="total" :current-page="query.page" />

    <!-- 动态组件 -->
    <component :is="currentComponent" :dialog-mes="dialogMes" />
  </div>
</template>

<script>
import { getList, deleteSingle } from '@/api/staffManage'
import ChangeDialog from '@/views/commonSetting/staffManage/change'
import PersonalDialog from '@/views/checkAttendance/recordManage/personal'

export default {
  components: {
    ChangeDialog,
    PersonalDialog
  },
  data() {
    return {
      searchForm: {},
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
    search () {

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
    deleteSingle(id) {
      this.$confirm('确定删除该记录?', '提示', {
        type: 'warning'
      }).then(() => {
        deleteSingle({ id: id }).then(response => {
          this.fetchData()
        })
      })
    },

    // 查看个人考勤记录
    showPersonal() {
      this.currentComponent = 'PersonalDialog'
    }
  }
}
</script>

<style lang="scss" scoped>
.staffName{
  color: #4d82f6;
  cursor: pointer;
}
</style>
