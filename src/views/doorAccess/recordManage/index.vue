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
            <el-form-item label="设备编号" prop="deviceType">
              <el-input v-model="searchForm.user" placeholder="请输入" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="工号" prop="deviceType">
              <el-input v-model="searchForm.user" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="姓名" prop="deviceType">
              <el-input v-model="searchForm.user" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="设备位置" prop="deviceType">
              <el-input v-model="searchForm.user" placeholder="请输入" />
            </el-form-item>
          </el-row>
        </div>
        <div class="form-action">
          <el-button type="primary" class="search" @click="search">查询</el-button>
          <el-button class="reset reset">清空</el-button>
        </div>
      </el-form>
      <div class="other-action" style="width: 200px;">
        <el-button @click="changeSingle()"><img src="@/assets/icon/export.png">导出记录</el-button>
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
      <el-table-column label="记录时间">
        <template slot-scope="scope">
          <img :src="scope.row.facePath" class="face-img">
        </template>
      </el-table-column>
      <el-table-column label="设备编号" prop="code" />
      <el-table-column label="设备位置" prop="name" />
      <el-table-column label="工号" prop="sex" />
      <el-table-column label="姓名" prop="birthday" width="200" />
      <el-table-column label="允许通行" prop="personType" />
      <el-table-column label="抓拍图像" prop="groupId" />
    </el-table>
    <gd-pagination :total="total" :current-page="query.page" :page-size="query.limit"/>

    <!-- 动态组件 -->
    <component :is="currentComponent" :dialog-mes="dialogMes" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/staffManage'
import ChangeDialog from '@/views/commonSetting/staffManage/change'

export default {
  components: {
    ChangeDialog
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
    search() {

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
    }
  },
  computed: {
    ...mapGetters([
      'allDict'
    ]),
  }
}
</script>
