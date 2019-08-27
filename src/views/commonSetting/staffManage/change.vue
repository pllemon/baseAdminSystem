<template>
  <el-dialog :title="allDict.CHANGE_TYPE[dialogMes.type].label+'人员'" :visible="true" :before-close="handleClose" :close-on-click-modal="false" width="1100px">
    <el-form ref="form" label-width="100px" :model="form" :rules="rules" :inline="true" >
      <div class="flex-start-between">
        <div style="margin: 0 30px">
          <el-upload
            class="avatar-uploader"
            action="/dms/file/image/upload"
            accept="image/jpeg,image/jpg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="form.facePath" :src="form.facePath" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
              :disabled="readonly"
              v-model="form.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所属部门" prop="department">
            <el-input v-model="form.department" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="岗位职务" prop="job">
            <el-input v-model="form.job" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="人员类型" prop="personType">
            <el-select v-model="form.personType" :disabled="readonly">
              <el-option v-for="(item,index) in allDict.PERSON_TYPE" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="设备权限组" prop="groupId">
            <el-select v-model="form.groupId" :disabled="readonly">
              <el-option v-for="(item,index) in allDict.DEVICE_PERMISSION_GROUP" :key="index" :label="item.label" :value="item.value" />
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
        code: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
        department: [{ required: true, message: '请输入所属部门', trigger: 'blur' }],
        job: [{ required: true, message: '请输入岗位职务', trigger: 'blur' }],
        personType: [{ required: true, message: '请选择人员类型', trigger: 'change' }],
        personGroup: [{ required: true, message: '请选择人员组别', trigger: 'change' }],
        groupId: [{ required: true, message: '请选择设备权限组', trigger: 'change' }],
      },
      form: {
        id: '',
        facePath: '',
        groupId: 1,
        personType: 1
      },
      readonly: false
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
    handleAvatarSuccess(res, file) {
      this.form.facePath = res.data;
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.$route.path == '/doorAccess/staffManage') {
            this.form.personGroup = 1
          } else {
            this.form.personGroup = 2
          }
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