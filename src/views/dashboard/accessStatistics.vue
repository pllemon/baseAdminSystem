<template>
<div class="content">
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <p>{{item.label}}</p>
    </li>
  </ul>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <el-progress :text-inside="true" :stroke-width="18" :color="customColorMethod(index)" :percentage="parseFloat((item.value/totalNum*100).toFixed(2))"></el-progress>
    </li>
  </ul>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <p>{{item.value}}/<span>{{totalNum}}</span></p>
    </li>
  </ul>
</div>
</template>

<script>
import { devicePersonCount } from '@/api/index'
import { totalmem } from 'os';
// let colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
let colorList = ['#fbbd3b', '#4f6aff', '#45cfef', '#f34669']
export default {
  name: 'Dashboard',
  data() {
    return {
      totalNum: 0,
      list: []
    }
  },
  created() {
    devicePersonCount().then(response => {
      let { data } = response
      let totalNum = 0
      data.forEach(item => {
        totalNum += parseInt(item.value)
      })
      this.totalNum = totalNum
      this.list = data
    })
  },
  methods: {
    customColorMethod(index) {
      let idx = index % (colorList.length)
      return colorList[idx]
    },
  }
}
</script>

<style lang="scss" scoped>
.content{
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  padding-top: 10px;
  ul{
    box-sizing: border-box;
    &:nth-of-type(1) {
      text-align: right;
      font-size: 13px;
      color: #666666;
    }
    &:nth-of-type(2) {
      flex:1;
      margin: 0 10px;
    }
    &:nth-of-type(3) {
      font-size: 13px;
      color: #333333;
      span{
        color: #999999;
      }
    }
    li{
      height: 34px;
      box-sizing: border-box;
      line-height: 18px;
    }
  }
  
}
</style>
