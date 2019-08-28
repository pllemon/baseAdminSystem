<template>
  <div class="dashboard-container flex-column">
    <div class="flex list">
      <div class="section">
        <p class="title">终端状态</p>
        <div>
          <decive-status />
        </div>
      </div>
      <div class="section flex-section index-section">
        <p class="title">授权统计</p>
        <el-scrollbar class="flex1">
          <access-statistics />
        </el-scrollbar>
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
            <p>人员删除</p>
            <p>清除离职员工信息</p>
          </li>
          <li class="update-staff flex-column-center flex1">
            <img src="@/assets/icon/update_staff.png">
            <p>人员更新</p>
            <p>及时同步最新信息</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex list flex1">
      <div class="section flex-section index-section">
        <p class="title">考勤异常</p>
        <el-scrollbar class="flex1">
          <attendance-warm />
        </el-scrollbar>
      </div>
      <div class="section flex-section index-section">
        <p class="title">人脸记录</p>
        <el-scrollbar class="flex1">
          <face-record />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import DeciveStatus from '@/views/dashboard/deviceStatus'
import AttendanceWarm from '@/views/dashboard/attendanceWarm'
import AccessStatistics from '@/views/dashboard/accessStatistics'
import FaceRecord from '@/views/dashboard/faceRecord'
export default {
  name: 'Dashboard',
  components: {
    DeciveStatus,
    AttendanceWarm,
    AccessStatistics,
    FaceRecord
  },
  data() {
    return {
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.index-section{
  .el-scrollbar__wrap
  {
    overflow-x: hidden;
  }
  .el-progress-bar__outer{
    background: #eaeaec;
  }
}
</style>
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
      font-weight: 600;
    }
  }
  .flex-section{
    display: flex;
    flex-direction: column;
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
