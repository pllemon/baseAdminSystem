<template>
  <div class="app-container">
    <div class="search-content">
      <div></div>
      <div class="other-action">
        <el-button @click="clearPerson()"><img src="@/assets/icon/delete.png">清除人员</el-button>
        <el-button><img src="@/assets/icon/delete.png">清除记录</el-button>
        <el-button @click="upgrade()"><img src="@/assets/icon/export.png">设备升级</el-button>
        <el-button @click="reboot()"><img src="@/assets/icon/export.png">设备重启</el-button>
        <el-button @click="changeSingle()"><img src="@/assets/icon/add.png">添加设备</el-button>
        <el-button @click="batchRemove()"><img src="@/assets/icon/delete.png">删除设备</el-button>
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
          <!-- <el-button type="text" @click="changeSingle(1, scope.row.id)">查看</el-button> -->
          <el-button type="text" @click="changeSingle(2, scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <gd-pagination :total="total" :current-page="query.page" :page-size="query.limit"/>

    <!-- 动态组件 -->
    <component :is="currentComponent" :dialog-mes="dialogMes" />

    <el-dialog
      title="升级设备"
      :visible.sync="showUpgrade"
      width="500px"
      :before-close="handleClose">
      <el-upload
        action=""
        :multiple="false"
        :auto-upload="false"
        :limit="1"
        :file-list="fileList">
        <el-button size="small" type="primary">点击选择文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-row class="bottom-buttons">
        <el-button type="primary" @click="upgradeForm">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList, batchRemove, reboot, upgrade, clearPerson } from '@/api/deviceManage'
import ChangeDialog from '@/views/commonSetting/deviceManage/change'

export default {
  components: {
    ChangeDialog
  },
  data() {
    return {
      fileList: [],
      showUpgrade: false,
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
    upgradeForm() {
      console.log(this.fileList)
    },

    handleClose() {
      this.showUpgrade = false;
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

    changeChoose(val) {
      this.chooseList = val
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

    // 重启设备
    reboot() {
      if (!this.chooseIds.length) {
        this.$message.error('请至少勾选一条记录');
        return false
      }
      this.$confirm('确定重启选中的设备?', '提示', {
        type: 'warning'
      }).then(() => {
        reboot({ ids: this.chooseIds }).then(response => {
          this.fetchData()
          this.$notify({
            title: '提示',
            message: response.message,
            type: 'success',
            duration: 2000
          })
        })
      })
    },

    // 清除人员
    clearPerson() {
      if (!this.chooseIds.length) {
        this.$message.error('请至少勾选一条记录');
        return false
      }
      this.$confirm('确定清除人员?', '提示', {
        type: 'warning'
      }).then(() => {
        clearPerson({ ids: this.chooseIds }).then(response => {
          this.fetchData()
          this.$notify({
            title: '提示',
            message: response.message,
            type: 'success',
            duration: 2000
          })
        })
      })
    },

    // 升级设备
    upgrade() {
      this.showUpgrade = true
      return false
      if (!this.chooseIds.length) {
        this.$message.error('请至少勾选一条记录');
        return false
      }
      
    }
  }
}
</script>

