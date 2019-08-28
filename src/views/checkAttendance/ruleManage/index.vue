<template>
  <div class="app-container">
    <div class="search-content">
      <el-form ref="searchForm" :inline="true" :model="query">
        <div class="form-content">
          <el-row>
            <el-form-item label="时间段">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="query.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="query.date2" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="时段类型" prop="periodType_EQ_S">
              <el-select v-model="query.periodType_EQ_S" clearable>
                <el-option v-for="(item,index) in allDict.PERIOD_TYPE" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="取数规则" prop="ruleType_EQ_S">
              <el-select v-model="query.ruleType_EQ_S" clearable>
                <el-option v-for="(item,index) in allDict.DATA_RULE" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-row>
        </div>
        <div class="form-action">
          <el-button type="primary" class="search" @click="fetchData()">查询</el-button>
          <el-button class="reset reset" @click="resetForm()">清空</el-button>
        </div>
      </el-form>
      <div class="other-action" style="width: 200px;">
        <el-button @click="changeSingle()"><img src="@/assets/icon/add.png">添加</el-button>
        <el-button @click="batchRemove()"><img src="@/assets/icon/delete.png">删除</el-button>
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
      <el-table-column label="序号" type="index" width="80" align="center" />
      <el-table-column label="时段类型">
        <template slot-scope="scope">
          {{scope.row.periodType|getLabel('PERIOD_TYPE')}}
        </template>
      </el-table-column>
      <el-table-column label="取数规则" prop="code">
        <template slot-scope="scope">
          {{scope.row.ruleType|getLabel('DATA_RULE')}}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="startTime" />
      <el-table-column label="结束时间" prop="endTime" />
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
    <gd-pagination :total="total" :current-page="query.page" :page-size="query.limit"/>

    <!-- 动态组件 -->
    <component :is="currentComponent" :dialog-mes="dialogMes" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList, batchRemove } from '@/api/attendanceRule'
import ChangeDialog from '@/views/checkAttendance/ruleManage/change'

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
  created() {
    this.fetchData()
  },
  methods: {
    resetForm() {
      this.$refs['searchForm'].resetFields()
      this.fetchData()
    },

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
  }
}
</script>

<style lang="scss" scoped>
.staffName{
  color: #4d82f6;
  cursor: pointer;
}
</style>
