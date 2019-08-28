<template>
  <div ref="chart" style="width:100%;height:190px" />
</template>

<script>
import { deviceStatusCount } from '@/api/index'
export default {
  data() {
    return {
      responseObj: null,
      chartData: [],
      labelData: []
    }
  },
  mounted() {
    deviceStatusCount(this.query).then(response => {
      let { data } = response
      let chartData = []
      let labelData = []
      for (let i in data) {
        chartData.push({
          name: i,
          value: data[i]
        })
        labelData.push(i)
      }
      this.chartData = chartData
      this.labelData = labelData
      this.initCharts(data)
    })
  },
  methods: {
    initCharts(data) {
      const myChart = this.$echarts.init(this.$refs.chart)
      myChart.setOption({
        color: ['#f85d7d', '#fabe3a', '#4f6aff'],
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
            return '{title|' + name + '}{value|' + (data[name]) + '}'
          },
          data: this.labelData
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
            data: this.chartData
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
