<template>
  <div class="dashboard-container flex-column">
    <div class="flex list">
      <div class="section">
        <p class="title">终端状态</p>
        <div>
          <div ref="chart" style="width:100%;height:190px" />
        </div>
      </div>
      <div class="section">
        <p class="title">授权统计</p>
        <div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="10" />
        </div>
      </div>
      <div class="section">
        <p class="title">快捷功能</p>
        <ul class="quick-list flex">
          <li class="add-staff flex-column-center flex1">
            <img src="@/assets/icon/add_staff.png">
            <p>人员添加</p>
            <p>添加新员工信息</p>
          </li>
          <li class="delete-staff flex-column-center flex1">
            <img src="@/assets/icon/delete_staff.png">
            <p>人员添加</p>
            <p>添加新员工信息</p>
          </li>
          <li class="update-staff flex-column-center flex1">
            <img src="@/assets/icon/update_staff.png">
            <p>人员添加</p>
            <p>添加新员工信息</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex list flex1">
      <div class="section">
        <p class="title">考勤异常</p>
        <div>
          <ul>
            <li v-for="(item, index) in attendList" :key="index">
            </li>
          </ul>
        </div>
      </div>
      <div class="section">
        <p class="title">人脸记录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      attendList: [1, 2, 3]
    }
  },
  computed: {

  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      const myChart = this.$echarts.init(this.$refs.chart)
      console.log(this.$refs.chart)
      myChart.setOption({
        color: ['#4f6aff', '#f85d7d', '#fabe3a'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: 'center',
          left: '58%',
          itemWidth: 12,
          itemHeight: 12,
          borderRadius: 6,
          textStyle: {
            rich: {
              title: {
                fontSize: 16,
                lineHeight: 10,
                color: '#666',
                width: 80
              },
              value: {
                fontSize: 16,
                lineHeight: 18,
                color: '#333'
              }
            }
          },
          formatter: function(name) {
            return '{title|' + name + '}{value|' + 333 + '}'
          },
          data: ['在线', '故障', '离线']
        },
        series: [
          {
            name: '终端状态',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['26%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '在线' },
              { value: 310, name: '故障' },
              { value: 234, name: '离线' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  padding-top: 24px;
  padding-right: 24px;
  .list{
    width: 100%;
    margin-bottom: 24px;
    &:nth-of-type(1){
      height: 260px;
    }
  }
  .section{
    background: #fff;
    flex: 1;
    margin-left: 24px;
    height: 100%;
    padding: 20px;
    .title{
      font-size: 18px;
      color: #4d85ff;
      margin-bottom: 10px;
    }
  }
}
.quick-list{
  li{
    margin: 10px;
    height: 170px;
    border-radius: 10px;
    cursor: pointer;
    &.add-staff{
      background: #e5edff;
    }
    &.delete-staff{
      background: #ffecf0;
    }
    &.update-staff{
      background: #e2faff;
    }
    p:nth-of-type(1){
      font-size: 16px;
      color: #333333;
      margin: 15px 0 6px 0;
    }
    p:nth-of-type(2){
      font-size: 12px;
      color: #666666;
    }
  }
}
</style>
