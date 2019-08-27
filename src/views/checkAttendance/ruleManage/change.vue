<template>
  <el-dialog :title="allDict.CHANGE_TYPE[dialogMes.type].label+'规则'" :visible="true" :before-close="handleClose" :close-on-click-modal="false" width="1000px">
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="时段类型" prop="deviceType">
            <el-select v-model="form.periodType">
              <el-option v-for="(item,index) in allDict.PERIOD_TYPE" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="取数规则" prop="deviceType">
            <el-select v-model="form.ruleType">
              <el-option v-for="(item,index) in allDict.DATA_RULE" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始时间" prop="startTime">
            <el-time-picker
              v-model="form.startTime"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              type="fixed-time"
              placeholder="选择时间"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="endTime">
            <el-time-picker
              v-model="form.endTime"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              type="fixed-time"
              placeholder="选择时间"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="绑定设备" prop="startTime">
        <choose-device @change="getDevice"></choose-device>
      </el-form-item>
      <el-row v-if="!readonly" class="bottom-buttons">
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDetail, updateSingle, queryRuleRelationDeviceInfos } from '@/api/attendanceRule'
import ChooseDevice from '@/components/ChooseDevice'

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
      form: {},
      readonly: false,
      deviceList: []
    }
  },
  created() {
    const { type, id } = this.dialogMes
    if (type) {
      this.readonly = type === 1
      getDetail({ id: id }).then(response => {
        const { data } = response
        this.form = data
        queryRuleRelationDeviceInfos({ ruleId: id}).then(response => {
          console.log(response)
        })
      })
    }
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    getDevice(res) {
      console.log(res)
      this.deviceList = res;
    },

    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let deviceList = this.deviceList.map(item => {
            return {
              deviceId: item.id
            }
          })
          console.log(deviceList)
          this.form.deviceList = deviceList;
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
  },
  components: {
    ChooseDevice
  }
}
</script>

<style scoped lang="scss">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 179px
}
</style>