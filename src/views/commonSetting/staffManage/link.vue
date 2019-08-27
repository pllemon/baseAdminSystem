<template>
  <el-dialog title="批量关联" :visible="true" :before-close="handleClose" :close-on-click-modal="false" width="1100px">
    <p>已选择人员（{{dialogMes.person.length}}）名，已选择设备（{{deviceList.length}}）台</p>
    <choose-device :show-num="false" @change="getDevice"></choose-device>
    <el-row class="bottom-buttons">
      <el-button type="primary" @click="submitForm">确定</el-button>
      <el-button @click="handleClose">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import ChooseDevice from '@/components/ChooseDevice'
import { batchRelation } from '@/api/staffManage'


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
      deviceList: []
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
        batchRelation(obj).then(response => {
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
