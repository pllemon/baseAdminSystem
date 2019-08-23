<template>
  <el-dialog :title="allDict.CHANGE_TYPE[dialogMes.type].label+'考勤数据'" :visible="true" :before-close="handleClose" width="800px">
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="服务器地址" prop="code">
        <el-input v-model="form.code" :disabled="readonly" />
      </el-form-item>
      <el-form-item label="同步频率" prop="personType">
        <el-input v-model="form.personType" :disabled="readonly" />
      </el-form-item>
      <el-form-item label="认证参数" prop="facePath">
        <el-input v-model="form.facePath" :disabled="readonly" />
      </el-form-item>
      <!-- 表格数据 -->
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="ip地址" prop="code" />
        <el-table-column label="安装位置" prop="code" />
      </el-table>
      <gd-pagination :total="total" :current-page="query.page" />

      <el-row v-if="!readonly" class="bottom-buttons">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDetail, updateSingle } from '@/api/attendanceData'
import { getCombo } from '@/api/dict'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        deviceCode: [{ required: true, message: '请输入人员编号', trigger: 'blur' }],
        ip: [{ required: true, message: '请输入ip地址', trigger: 'blur' }],
        port: [{ required: true, message: '请输入端口', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        type: [{ required: true, message: '请输入门禁类型', trigger: 'change' }],
        place: [{ required: true, message: '请输入安装位置', trigger: 'blur' }]
      },
      form: {},
      readonly: false,
      list: [{},{}],
      listLoading: true,
      total: 0,
      query: {
        limit: 10,
        page: 1
      }
    }
  },
  created() {
    // 获取

    const { type, id } = this.dialogMes
    if (type) {
      this.readonly = type === 1
      getDetail({ id: id }).then(response => {
        const { data } = response
        this.form = data
      })
    }
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updateSingle(this.form).then(response => {
            this.$parent.fetchData()
            this.handleClose()
          })
        } else {
          return false
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'allDict'
    ])
  }
}
</script>
