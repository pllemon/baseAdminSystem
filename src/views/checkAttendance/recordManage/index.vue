<template>
  <div class="app-container">
    <div class="search-content">
      <el-form :inline="true" :model="query" ref="searchForm">
        <div class="form-content">
          <el-row>
            <el-form-item label="时间段">
              <el-date-picker
                v-model="queryDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="设备编号" prop="deviceCode_LK_S">
              <el-input v-model="query.deviceCode_LK_S" placeholder="请输入" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="工号" prop="personCode_LK_S">
              <el-input v-model="query.personCode_LK_S" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="姓名" prop="personName_LK_S">
              <el-input v-model="query.personName_LK_S" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="设备位置" prop="place_LK_S">
              <el-input v-model="query.place_LK_S" placeholder="请输入" />
            </el-form-item>
          </el-row>
        </div>
        <div class="form-action">
          <el-button type="primary" class="search" @click="fetchData()">查询</el-button>
          <el-button class="reset reset" @click="resetForm()">清空</el-button>
        </div>
      </el-form>
      <div class="other-action" style="width: 200px;">
        <el-button @click="exportRecord()"><img src="@/assets/icon/export.png">导出记录</el-button>
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
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column label="序号" type="index" width="80" align="center" />
      <el-table-column label="记录时间" prop="openTime" />
      <el-table-column label="设备编号" prop="deviceCode" />
      <el-table-column label="设备位置" prop="place" />
      <el-table-column label="工号" prop="personCode" />
      <el-table-column label="姓名" prop="personName"/>
      <el-table-column label="时段类型" prop="periodType">
        <template slot-scope="scope">
          {{scope.row.periodType|getLabel('PERIOD_TYPE')}}
        </template>
      </el-table-column>
      <el-table-column label="抓拍图像" prop="groupId">
        <template slot-scope="scope">
          <img :src="scope.row.facePath" class="face-img">
        </template>
      </el-table-column>
    </el-table>
    <gd-pagination :total="total" :current-page="query.page" :page-size="query.limit"/>

    <!-- 导出记录 -->
    <form id="exportForm" ref="exportForm" name="exportForm" method="post" :action="exportUrl" style="display:none"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryAttendanceRecord, attendanceRecordExport } from '@/api/record'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      query: {
        limit: 10,
        page: 1,
        deviceCode_LK_S: undefined,
        personCode_LK_S: undefined,
        personName_LK_S: undefined,
        place_LK_S: undefined,
        openTime_GE_DT: undefined,
        openTime_LE_DT: undefined
      },
      queryDate: [],
      exportUrl: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    resetForm() {
      this.$refs['searchForm'].resetFields()
      this.queryDate = undefined
      this.fetchData()
    },
    
    // 获取列表
    fetchData() {
      this.listLoading = true
      if (this.queryDate && this.queryDate.length) {
        this.query.openTime_GE_DT = this.queryDate[0]
        this.query.openTime_LE_DT = this.queryDate[1]
      } else {
        this.query.openTime_GE_DT = undefined;
        this.query.openTime_LE_DT = undefined;
      }
      
      queryAttendanceRecord(this.query).then(response => {
        const { data } = response
        this.list = data.rows
        this.total = data.total
        this.listLoading = false
      })
    },

    // 导出记录
    exportRecord () {
      if (this.queryDate && this.queryDate.length) {
        this.query.openTime_GE_DT = this.queryDate[0]
        this.query.openTime_LE_DT = this.queryDate[1]
      } else {
        this.query.openTime_GE_DT = undefined;
        this.query.openTime_LE_DT = undefined;
      }

      var queryStr = ''
      for (var i in this.query) {
        if (this.query[i] !== undefined && i !== 'limit' && i !== 'page') {
          queryStr += `<input name="${i}" value="${this.query[i]}">`
        }
      }
      this.$refs.exportForm.innerHTML = queryStr
      this.exportUrl = attendanceRecordExport()
      this.$nextTick(() => {
        this.$refs.exportForm.submit()
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
