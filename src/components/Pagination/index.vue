<template>
  <div class="gd-pagination">
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :current-page="currentPage"
      :page-sizes="[1, 10, 20, 50, 100]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: [String, Number],
      default: 0
    },
    currentPage: {
      type: [String, Number],
      default: 1
    },
    pageSize: {
      type: [String, Number],
      default: 10
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSizeChange(val) {
      let parent = this.$parent.query ? this.$parent : this.$parent.$parent
      parent.query.limit = val;
      parent.fetchData();
    },
    handleCurrentChange(val) {
      let parent = this.$parent.query ? this.$parent : this.$parent.$parent
      parent.query.page = val;
      parent.fetchData();
    }
  }
}
</script>

<style lang="scss" scoped>
.gd-pagination{
  text-align: right;
}
</style>
