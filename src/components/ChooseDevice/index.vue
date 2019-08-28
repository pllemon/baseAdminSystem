<template>
  <div>
     <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      @select="changeSingle"
      @select-all="changeAll"
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
    <div class="flex-start-between">
      <p class="choose-num" v-show="showNum">已选择（{{hasList.length}}）个设备</p>
      <div class="flex1">
        <gd-pagination :total="total" :current-page="query.page" :page-size="query.limit"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/deviceManage'

export default {
  props: {
    dialogMes: {
      type: Object,
      default: () => {}
    },
    showNum: {
      type: Boolean,
      default: true
    },
    initialList: {
      type: Array,
      default: () => []
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
      hasObj: {},
      hasList: [], // 已有的选项
      chooseList: [] // 本轮选择项
    }
  },
  created() {
    console.log(this.initialList);
    this.hasList = this.initialList;
    this.hasList.forEach(item => {
      item.id = item.deviceId
      this.hasObj[item.id] = 1
    })
    console.log(this.hasObj)
    this.fetchData()
  },
  methods: {
    changeSingle(selection, row) {
      let someRes = selection.some(item => item.id == row.id)
      if (someRes) { // 选择
        if (!this.hasObj[row.id]) {
          this.hasObj[row.id] = 1
          this.hasList.push(row);
        }
      } else { // 未选
          this.hasObj[row.id] = null
          let index = this.hasList.findIndex(item => item.id == row.id)
          if (index != -1) {
            this.hasList.splice(index, 1)
          }
      }
      this.$emit('change', this.hasList);
    },

    changeAll(selection) {
      if (selection.length) {
        this.list.forEach((row) => {
          if (!this.hasObj[row.id]) {
            this.hasObj[row.id] = 1
            this.hasList.push(row);
          }
        })
      } else {
        this.list.forEach((row) => {
          this.hasObj[row.id] = null
          let index = this.hasList.findIndex(item => item.id == row.id)
          if (index != -1) {
            this.hasList.splice(index, 1)
          }
        })
      }
      this.$emit('change', this.hasList);
    },

    // 获取列表
    fetchData() {
      this.listLoading = true
      getList(this.query).then(response => {
        const { data } = response
        this.list = data.rows
        this.total = data.total
        this.listLoading = false
        this.$nextTick(() => {
          this.list.forEach((row) => {
            if (this.hasObj[row.id]) {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            }
          })
        })
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
.choose-tips{
  color: #F56C6C;
  font-size: 12px;
}
</style>
