<template>
  <div class="app-container">
    <div class="search-content">
      <el-form :inline="true" :model="query" ref="searchForm">
        <div class="form-content">
          <el-row>
            <el-form-item label="员工工号" prop="code_EQ_S">
              <el-input v-model="query.code_EQ_S" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="员工姓名" prop="name_LK_S">
              <el-input v-model="query.name_LK_S" placeholder="请输入" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="人员类型" prop="personType_EQ_S">
              <el-select v-model="query.personType_EQ_S">
                <el-option v-for="(item,index) in allDict.PERSON_TYPE" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="设备权限组" prop="groupId_EQ_S">
              <el-select v-model="query.groupId_EQ_S">
                <el-option v-for="(item,index) in allDict.DEVICE_PERMISSION_GROUP" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-row>
        </div>
        <div class="form-action">
          <el-button type="primary" class="search" @click="fetchData()">查询</el-button>
          <el-button class="reset reset" @click="resetForm()">清空</el-button>
        </div>
      </el-form>
      <div class="other-action">
        <el-button @click="changeSingle()"><img src="@/assets/icon/add.png">添加人员</el-button>
        <el-button><img src="@/assets/icon/import.png">导入人员</el-button>
        <el-button @click="linkDevice()"><img src="@/assets/icon/link.png">批量关联</el-button>
        <el-button @click="batchRemove()"><img src="@/assets/icon/delete.png">删除人员</el-button>
        <el-button @click="exportStaff()"><img src="@/assets/icon/export.png">导出人员</el-button>
        <el-button @click="downloadDemo()"><img src="@/assets/icon/import.png">下载模板</el-button>
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
      <el-table-column label="人脸图像">
        <template slot-scope="scope">
          <img :src="scope.row.facePath" class="face-img">
        </template>
      </el-table-column>
      <el-table-column label="工号" prop="code" />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="性别" prop="sex">
        <template slot-scope="scope">
          {{ scope.row.sex|getLabel('SEX') }}
        </template>
      </el-table-column>
      <el-table-column label="出生日期" prop="birthday" width="120" />
      <el-table-column label="人员类型">
        <template slot-scope="scope">
          {{scope.row.personType|getLabel('PERSON_TYPE')}}
        </template>
      </el-table-column>
      <el-table-column label="人员组别">
        <template slot-scope="scope">
          {{scope.row.personGroup|getLabel('PERSON_GROUP')}}
        </template>
      </el-table-column>
      <el-table-column label="设备权限组" width="200">
        <template slot-scope="scope">
          {{scope.row.groupId|getLabel('DEVICE_PERMISSION_GROUP')}}
        </template>
      </el-table-column>
      <el-table-column label="设备列表" prop="place" width="200">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.deviceNameList" :key="index">{{item}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="changeSingle(1, scope.row.id)">查看</el-button>
          <el-button type="text" @click="changeSingle(2, scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <gd-pagination :total="total" :current-page="query.page" :page-size="query.limit"/>

    <!-- 动态组件 -->
    <component :is="currentComponent" :dialog-mes="dialogMes" />

    <!-- 下载模板表单/导出人员 -->
    <form id="downloadForm" ref="downLoadUrl" name="downloadForm" method="post" :action="downLoadUrl" style="display:none" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList, batchRemove, exportTemplate, personInfoExport } from '@/api/staffManage'
import ChangeDialog from '@/views/commonSetting/staffManage/change'
import LinkDialog from '@/views/commonSetting/staffManage/link'

export default {
  components: {
    ChangeDialog,
    LinkDialog
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
        page: 1,
        personGroup_EQ_S: ''
      },
      chooseList: [],
      downLoadUrl: ''
    }
  },
  created() {
    this.pageReset()
  },
  methods: {
    pageReset() {
      if (this.$route.path == '/doorAccess/staffManage') {
        this.query = {
          limit: 10,
          page: 1,
          personGroup_EQ_S: 1
        }
        this.currentComponent = ''
      } else {
        this.query = {
          limit: 10,
          page: 1,
          personGroup_EQ_S: 2
        }
        this.currentComponent = ''
      }
      this.fetchData()
    },

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

    // 关联设备
    linkDevice() {
      if (!this.chooseIds.length) {
        this.$message.error('请至少勾选一条记录');
        return false
      }
      this.dialogMes = {
        person: this.chooseIds
      }
      this.currentComponent = 'LinkDialog'
    },

    // 删除
    batchRemove(id) {
      if (!this.chooseIds.length) {
        this.$message.error('请至少勾选一条记录');
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

    // 下载模板
    downloadDemo() {
      this.downLoadUrl = exportTemplate()
      this.$nextTick(() => {
        this.$refs.downLoadUrl.submit()
      })
    },

    // 导出人员
    exportStaff() {
      this.downLoadUrl = personInfoExport()
       this.$nextTick(() => {
        this.$refs.downLoadUrl.submit()
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
  },

  watch: {
    '$route'(to,from) {
      this.pageReset()
    }
  }
}
</script>

<style scoped lang="scss">
.other-action{
  width: 450px;
  justify-content: flex-start;
}
</style>
