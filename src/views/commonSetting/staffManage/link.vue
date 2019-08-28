<template>
  <el-dialog :title="title" :visible="true" :before-close="handleClose" :close-on-click-modal="false" width="1100px">
    <p>已选择人员（{{dialogMes.person.length}}）名，已选择设备（{{deviceList.length}}）台</p>
    <choose-device :initial-list="deviceList" @change="getDevice" v-if="showDialog"/>
    <el-row class="bottom-buttons">
      <el-button type="primary" @click="submitForm">确定</el-button>
      <el-button @click="handleClose">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import ChooseDevice from '@/components/ChooseDevice'
import { batchRelation, queryPersonDeviceInfos } from '@/api/staffManage'


export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      query: {
        limit: 10,
        page: 1
      },
      deviceList: [],
      title: '批量关联',
      showDialog: false,
      type: 2
    }
  },
  created () {
    if (this.dialogMes.type == 1) {
      this.type = 1
      this.title = '关联设备'
      queryPersonDeviceInfos({personId: this.dialogMes.person[0]}).then(response => {
        this.deviceList = response.data
        this.showDialog = true
      })
    } else {
      this.type = 2
      this.showDialog = true
    }
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    submitForm() {
      if (this.deviceList.length) {
        let idsEx = this.deviceList.map(item => item.id);
        let obj = {
          ids: this.dialogMes.person,
          idsEx
        }
        batchRelation(obj, this.type).then(response => {
          this.$notify({
              title: '提示',
              message: '关联成功',
              type: 'success',
              duration: 2000
            });
          this.$parent.fetchData()
          this.handleClose()
        })
      } else {
        this.$message.error('请至少勾选一台设备');
      }
    },

    getDevice(res) {
      this.deviceList = res;
    },
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
