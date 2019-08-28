<template>
  <el-dialog :title="allDict.CHANGE_TYPE[dialogMes.type].label+'设备'" :visible="true" :before-close="handleClose" :close-on-click-modal="false" width="800px">
    <el-form v-show="editTime" ref="timeForm" label-width="120px" :model="timeForm" :rules="timeRules">
      <el-form-item label="时段名称" prop="periodName">
        <el-input v-model="timeForm.periodName" />
      </el-form-item>
      <el-form-item label="时段类型" prop="periodType">
        <el-select v-model="timeForm.periodType">
          <el-option v-for="(item,index) in allDict.PASS_PERIOD" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="具体时间段" required>
        <el-button v-if="!readonly" style="margin-top: -3px" type="text" class="img-button" @click="addTime()"><img src="@/assets/icon/add.png">添加</el-button>
        <el-table
          size="mini"
          :data="timeForm.time"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="序号" type="index" width="50" align="center" />
          <el-table-column label="开始时间">
            <template slot-scope="scope">
              <el-time-picker
                v-model="timeForm.time[scope.$index].startTime"
                format="HH:mm:ss"
                value-format="HH:mm:ss"
                type="fixed-time"
                placeholder="选择时间"
                style="width: 100%;"
              />
            </template>
          </el-table-column>
          <el-table-column label="结束时间">
            <template slot-scope="scope">
              <el-time-picker
                v-model="timeForm.time[scope.$index].endTime"
                format="HH:mm:ss"
                value-format="HH:mm:ss"
                type="fixed-time"
                placeholder="选择时间"
                style="width: 100%;"
              />
            </template>
          </el-table-column>
          <el-table-column v-if="!readonly" label="操作" width="200" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteTime(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-row v-if="!readonly" class="bottom-buttons">
        <el-button type="primary" @click="saveTime">确定</el-button>
        <el-button @click="cancelTime">取消</el-button>
      </el-row>
    </el-form>
    <el-form v-show="!editTime" ref="form" label-width="90px" :model="form" :rules="rules">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="设备编号" prop="deviceCode">
            <el-input v-model="form.deviceCode" :disabled="readonly || dialogMes.type == 2" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="门禁类型" prop="deviceType">
            <el-select v-model="form.deviceType" :disabled="readonly">
              <el-option v-for="(item,index) in allDict.DEVICE_TYPE" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="ip地址" prop="ip">
            <el-input v-model="form.ip" :disabled="readonly" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="端口" prop="port">
            <el-input v-model.number="form.port" :disabled="readonly" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" :disabled="readonly" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" :disabled="readonly" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="安装位置" prop="place">
        <el-input v-model="form.place" :disabled="readonly" />
      </el-form-item>
      <el-form-item label="具体时段" required>
        <el-button v-if="!readonly" style="margin-top: -3px" type="text" class="img-button" @click="changeTimeType()"><img src="@/assets/icon/add.png">添加</el-button>
        <el-table
          v-loading="tableLoading"
          :data="timelist"
          fit
          highlight-current-row
        >
          <el-table-column label="序号" type="index" width="50" align="center" />
          <el-table-column label="名称" prop="periodName" />
          <el-table-column label="时段类型">
            <template slot-scope="scope">
              {{ allDict.PASS_PERIOD[scope.row.periodType].label }}
            </template>
          </el-table-column>
          <el-table-column label="时间段">
            <template slot-scope="scope">
              <ul class="time-ul">
                <li v-for="(item, index) in scope.row.time" :key="index">
                  {{ item.startTime }} - {{ item.endTime }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column v-if="!readonly" label="操作" width="140" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="changeTimeType(scope.$index)">编辑</el-button>
              <el-button type="text" @click="deleteTimeType(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
import { getDetail, updateSingle } from '@/api/deviceManage'
import { queryDevicePeriodInfos } from '@/api/periodInfo'
import { deepCopy, checkIp } from '@/utils/common.js'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableLoading: true,
      rules: {
        deviceCode: [{ required: true, message: '请输入设备编号', trigger: 'blur' }],
        ip: [
          { required: true, message: '请输入ip地址', trigger: 'blur' },
          { validator: checkIp, message: '请输入正确的ip地址', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入端口', trigger: 'blur' },
          { type: 'number', message: '端口必须为数字值' }
        ],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        deviceType: [{ required: true, message: '请选择门禁类型' }],
        place: [{ required: true, message: '请输入安装位置', trigger: 'blur' }]
      },
      timeRules: {
        periodName: [{ required: true, message: '请输入时段名称', trigger: 'blur' }],
        periodType: [{ required: true, message: '请选择时段类型', trigger: 'change' }]
      },
      form: {
        id: '',
        port: 27778
      },
      readonly: false,

      timelist: [],
      devicePeriodInfos: [],
      editTime: false,
      timeForm: {}, // 时段表单数据
      currTimeIdx: ''
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
        queryDevicePeriodInfos({ deviceId: data.id }).then(response => {
          const { data } = response
          this.timelist = data
          this.tableLoading = false
        })
      })
    } else {
      this.tableLoading = false
    }
  },
  methods: {
    handleClose(closeNow) {
      this.$parent.currentComponent = ''
    },

    changeTimeType(idx = '') {
      this.editTime = true
      this.currTimeIdx = idx
      if (idx !== '') {
        this.timeForm = deepCopy(this.timelist[idx])
      } else {
        this.timeForm = {
          periodName: '',
          periodType: '',
          time: []
        }
      }
      this.$refs['timeForm'].clearValidate()
    },

    deleteTimeType(idx) {
      this.timelist.splice(idx, 1)
    },

    addTime() {
      this.timeForm.time.push({
        startTime: '',
        endTime: ''
      })
    },

    deleteTime(idx) {
      this.timeForm.time.splice(idx, 1)
    },

    saveTime() {
      this.$refs['timeForm'].validate((valid) => {
        if (valid) {
          if (this.currTimeIdx === '') {
            this.timelist.push(deepCopy(this.timeForm))
          } else {
            this.$set(this.timelist, this.currTimeIdx, deepCopy(this.timeForm))
          }
          this.editTime = false
        }
      })
    },

    cancelTime() {
      this.editTime = false
    },

    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.devicePeriodInfos = this.changeData()
          console.log(this.form)
          updateSingle(this.form).then(response => {
            this.$parent.fetchData()
            this.handleClose(true)
            this.$notify({
              title: '提示',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },

    changeData() {
      const devicePeriodInfos = []
      this.timelist.forEach(item => {
        item.time.forEach(item2 => {
          devicePeriodInfos.push({
            periodName: item.periodName,
            periodType: item.periodType,
            startTime: item2.startTime,
            endTime: item2.endTime
          })
        })
      })
      return devicePeriodInfos
    }
  }
}
</script>

<style scoped lang="scss">
.time-ul{
  li{
    margin-bottom: 5px;
    &:last-child{
      margin-bottom: 0;
    }
  }
}
</style>
