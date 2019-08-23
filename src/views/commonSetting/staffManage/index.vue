<template>
  <div class="app-container">
    <div class="search-content">
      <el-form :inline="true" :model="searchForm">
        <div class="form-content">
          <el-row>
            <el-form-item label="员工工号">
              <el-input v-model="searchForm.user" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="员工姓名">
              <el-input v-model="searchForm.user" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="所属部门">
              <el-select v-model="searchForm.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="人员类型">
              <el-input v-model="searchForm.user" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="所属权限组">
              <el-input v-model="searchForm.user" placeholder="请输入" />
            </el-form-item>
          </el-row>
        </div>
        <div class="form-action">
          <el-button type="primary" class="search" @click="search">查询</el-button>
          <el-button class="reset reset">清空</el-button>
        </div>
      </el-form>
      <div class="other-action">
        <el-button @click="changeSingle()"><img src="@/assets/icon/add.png">添加人员</el-button>
        <el-button><img src="@/assets/icon/import.png">导入人员</el-button>
        <el-button @click="linkDevice()"><img src="@/assets/icon/link.png">批量关联</el-button>
        <el-button @click="batchRemove()"><img src="@/assets/icon/delete.png">删除人员</el-button>
        <el-button><img src="@/assets/icon/export.png">导出人员</el-button>
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
          {{scope.row.sex|getLabel('SEX')}}
        </template>
      </el-table-column>
      <el-table-column label="出生日期" prop="birthday" width="200" />
      <el-table-column label="人员类型" prop="personType" />
      <el-table-column label="所属权限组" prop="groupId" />
      <el-table-column label="门禁机列表" prop="place" />
      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="changeSingle(1, scope.row.id)">查看</el-button>
          <el-button type="text" @click="changeSingle(2, scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <gd-pagination :total="total" :current-page="query.page" />

    <!-- 动态组件 -->
    <component :is="currentComponent" :dialog-mes="dialogMes" />

  </div>
</template>

<script>
import { getList, batchRemove, exportTemplate } from '@/api/staffManage'
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
        page: 1
      },
      chooseList: []
    }
  },
  computed: {
    chooseIds() {
      let ids = [];
      this.chooseList.forEach((item) => {
        ids.push(item.id)
      });
      return ids;
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    search () {

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
        return false
      }
      this.dialogMes = {
        person: this.chooseList
      }
      this.currentComponent = 'LinkDialog'
    },

    // 删除
    batchRemove(id) {
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

    // 下载模板
    downloadDemo() {
      console.log(1111111)
      const url = exportTemplate(); // 获取url
      const downloadHelper = $('<iframe style="display:none;" id="downloadHelper"></iframe>').appendTo('body')[0];
      const doc = downloadHelper.contentWindow.document;
      if (doc) {
        doc.open();
        doc.write('');//微软为doc.clear()有时会出bug
        doc.writeln("<html><body><form id='downloadForm' name='downloadForm' method='post' action='"+ url+"'>");
        doc.writeln('<\/form><\/body><\/html>');
        doc.close();
        const form = doc.forms[0];
        if (form) {
          form.submit();
        }
      }
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