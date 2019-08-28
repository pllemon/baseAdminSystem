<template>
  <el-dialog :title="allDict.CHANGE_TYPE[dialogMes.type].label+'考勤数据'" :visible="true" :before-close="handleClose" width="1000px">
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="服务器地址" prop="url">
        <el-input v-model="form.url" :disabled="readonly" />
      </el-form-item>
      <el-form-item label="同步频率（秒）" prop="taskInterval">
        <el-input v-model="form.taskInterval" :disabled="readonly" />
      </el-form-item>
      <el-form-item label="认证参数" prop="params">
        <el-input v-model="form.params" :disabled="readonly" />
      </el-form-item>
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
import { getDetail, updateSingle, queryOutInterfaceDeviceInfos } from '@/api/attendanceData'
import ChooseDevice from '@/components/ChooseDevice'

export default {
  components: {
    ChooseDevice
  },
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        url: [{ required: true, message: '服务器地址', trigger: 'blur' }],
        taskInterval: [{ required: true, message: '同步频率', trigger: 'blur' }],
        params: [{ required: true, message: '认证参数', trigger: 'blur' }]
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
    // 获取
    const { type, id } = this.dialogMes
    if (type) {
      this.readonly = type === 1
      getDetail({ id: id }).then(response => {
        const { data } = response
        this.form = data
        queryOutInterfaceDeviceInfos({ interfaceId: id }).then(response => {
          this.deviceList = response.data
          this.showDialog = true
        })
      })
    } else {
      this.showDialog = true
    }
  },
  methods: {
    getDevice(res) {
      this.deviceList = res
    },

    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const deviceList = this.deviceList.map(item => {
            return {
              deviceId: item.id
            }
          })
          this.form.outInterfaceDeviceInfoList = deviceList
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
