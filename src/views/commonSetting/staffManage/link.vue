<template>
  <el-dialog title="批量关联" :visible="true" :before-close="handleClose" :close-on-click-modal="false" width="1100px">
    <p>已选择人员（{{dialogMes.person.length}}）名，已选择设备（{{chooseList.length}}）台</p>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      @selection-change="changeChoose"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" width="80" align="center" />
      <el-table-column label="设备编号" width="160" prop="deviceCode" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.status|getLabel('DEVICE_STATUS')}}
        </template>
      </el-table-column>
      <el-table-column label="安装位置" prop="place" />
    </el-table>
    <gd-pagination :total="total" :current-page="query.page" :page-size="query.limit"/>
    <el-row class="bottom-buttons">
      <el-button type="primary" @click="submitForm">关联</el-button>
      <el-button @click="handleClose">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/deviceManage'

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
      chooseList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClose() {
      this.$parent.currentComponent = ''
    },

    changeChoose(val) {
      this.chooseList = val
    },

    // 获取列表
    fetchData() {
      this.listLoading = true
      getList(this.query).then(response => {
        const { data } = response
        this.list = data.rows
        this.total = data.total
        this.listLoading = false
      })
    },

    submitForm(){

    }
  },
  computed: {
    ...mapGetters([
      'allDict'
    ]),
    chooseIds() {
      let ids = [];
      this.chooseList.forEach((item) => {
        ids.push(item.id)
      });
      return ids;
    }
  }
}
</script>
