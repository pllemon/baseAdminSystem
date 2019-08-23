<template>
  <el-dialog :title="changeType[dialogMes.type]+'考勤规则'" :visible="true" :before-close="handleClose" width="800px">
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="时段类型" prop="periodType">
        <el-input v-model="form.periodType" :disabled="readonly" />
      </el-form-item>
      <el-form-item label="取数规则" prop="ruleType">
        <el-input v-model="form.ruleType" :disabled="readonly" />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-input v-model="form.startTime" :disabled="readonly" />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-input v-model="form.endTime" :disabled="readonly" />
      </el-form-item>
      <el-form-item v-if="!readonly">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDetail, updateSingle } from '@/api/staffManage'
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
      changeType: ['添加', '查看', '编辑'],
      form: {},
      readonly: false,
      DEVICE_TYPE: []
    }
  },
  created() {
    getCombo({ dictCode: 'DEVICE_TYPE' }).then(response => {
      this.DEVICE_TYPE = response.result
    })

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
  }
}
</script>
