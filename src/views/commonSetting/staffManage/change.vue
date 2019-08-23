<template>
  <el-dialog :title="allDict.CHANGE_TYPE[0].label+'人员'" :visible="true" :before-close="handleClose" :close-on-click-modal="false" width="1100px">
    <el-form ref="form" label-width="100px" :model="form" :rules="rules" :inline="true" >
      <div class="flex-start-between">
        <div style="margin: 0 30px">
          <img src="" style="width:100px;height:140px"/>
        </div>
        <div class="flex1">
          <el-form-item label="人员工号" prop="code">
            <el-input v-model="form.code" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="人员姓名" prop="name">
            <el-input v-model="form.name" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="人员性别" prop="sex">
            <el-select v-model="form.sex" :disabled="readonly">
              <el-option v-for="(item,index) in allDict.SEX" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所属部门" prop="personType">
            <el-input v-model="form.personType" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="岗位职务" prop="personType">
            <el-input v-model="form.personType" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="人员类型" prop="personType">
            <el-input v-model="form.personType" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="人员权限" prop="personType">
            <el-input v-model="form.personType" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="设备权限组" prop="groupId">
            <el-select v-model="form.groupId">
              <el-option v-for="(item,index) in DEVICE_TYPE" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <el-row v-if="!readonly" class="bottom-buttons">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDetail, updateSingle } from '@/api/staffManage'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: function () {
        return {
          type: 0,
          id: ''
        }
      }
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

<style scoped lang="scss">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 179px
}
</style>