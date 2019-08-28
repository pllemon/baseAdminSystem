<template>
  <el-dialog :title="allDict.CHANGE_TYPE[dialogMes.type].label+'规则'" :visible="true" :before-close="handleClose" :close-on-click-modal="false" width="1000px">
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="时段类型" prop="periodType">
            <el-select v-model="form.periodType">
              <el-option v-for="(item,index) in allDict.PERIOD_TYPE" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="取数规则" prop="ruleType">
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
      <el-form-item label="绑定设备" required>
        <choose-device :initial-list="deviceList" @change="getDevice" v-if="showDialog"/>
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
  components: {
    ChooseDevice
  },
  props: {
    dialogMes: {
      type: Object,
      default: function() {
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
        periodType: [{ required: true, message: '请选择时段类型', trigger: 'change' }],
        ruleType: [{ required: true, message: '请选择取数规则', trigger: 'change' }],
        startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }]
      },
      form: {},
      readonly: false,
      deviceList: [],
      showDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'allDict'
    ])
  },
  created() {
    const { type, id } = this.dialogMes
    if (type) {
      this.readonly = type === 1
      getDetail({ id: id }).then(response => {
        const { data } = response
        this.form = data
        queryRuleRelationDeviceInfos({ ruleId: id }).then(response => {
          this.deviceList = response.data
          this.showDialog = true
        })
      })
    } else {
      this.showDialog = true
    }
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    getDevice(res) {
      console.log(res)
      this.deviceList = res
    },

    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const deviceList = this.deviceList.map(item => {
            return {
              deviceId: item.id
            }
          })
          console.log(deviceList)
          this.form.deviceList = deviceList
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

<style scoped lang="scss">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 179px
}
</style>
