<template>
  <div class="app-container">
    <div class="search-content">
      <div></div>
      <div class="other-action">
        <el-button><img src="@/assets/icon/delete.png">清除人员</el-button>
        <el-button><img src="@/assets/icon/delete.png">清除记录</el-button>
        <el-button><img src="@/assets/icon/export.png">设备升级</el-button>
        <el-button><img src="@/assets/icon/export.png">设备重启</el-button>
        <el-button @click="changeDevice()"><img src="@/assets/icon/add.png">添加设备</el-button>
        <el-button @click="deleteDevice()"><img src="@/assets/icon/delete.png">删除设备</el-button>
      </div>
    </div>

    <!-- 表格数据&分页 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      @selection-change="changeChoose"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" width="80" align="center" />
      <el-table-column label="设备编号" width="160" prop="deviceCode" />
      <el-table-column label="IP地址" prop="ip" />
      <el-table-column label="端口" prop="port" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="密码" prop="password" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.status|getLabel('DEVICE_STATUS')}}
        </template>
      </el-table-column>
      <el-table-column label="安装位置" prop="place" />
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="changeDevice(1, scope.row.id)">查看</el-button>
          <el-button type="text" @click="changeDevice(2, scope.row.id)">编辑</el-button>
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
import { getList, batchRemove } from '@/api/deviceManage'
import ChangeDialog from '@/views/commonSetting/deviceManage/change'

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
  computed: {
    ...mapGetters([
      'allDict'
    ]),
    chooseIds() {
      let ids = [];
      this.chooseList.forEach((item) => {
        ids.push(item.id)
      });
      return ids;
    }
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

    changeChoose(val) {
      this.chooseList = val
    },

    // 添加、编辑、查看
    changeDevice(type = 0, id = '') {
      this.dialogMes = {
        type: type,
        id: id
      }
      this.currentComponent = 'changeDialog'
    },

    // 删除
    deleteDevice() {
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
    }
  }
}
</script>

