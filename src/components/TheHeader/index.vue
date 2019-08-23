<template>
  <div class="main-header">
    <img src="@/assets/logo.png" class="logo">
    <div class="link-list">
      <template v-for="(item,index) in menuList">
        <router-link v-if="!item.child" :key="index" :to="item.url">
          <img :src="item.icon">
          <span>{{ item.text }}</span>
        </router-link>
        <el-popover
          v-if="item.child"
          :key="index"
          placement="bottom"
          trigger="hover"
        >
          <div class="sub-list">
            <router-link v-for="(item2,index2) in item.child" :key="index2" :to="item2.url">
              <img :src="item2.icon">
              <span>{{ item2.text }}</span>
            </router-link>
          </div>
          <router-link slot="reference" :to="item.url">
            <img :src="item.icon">
            <span>{{ item.text }}</span>
          </router-link>
        </el-popover>
      </template>
    </div>
    <div class="personal">
      <el-dropdown>
        <div class="avatar-wrapper">
          <span>{{ roles[0] }}</span>
          <img src="@/assets/icon/pull_down.png">
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'roles',
      'menuList'
    ])
  },
  mounted() {
    console.log(this.menuList)
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style scoped lang="scss">
.main-header{
  width: 100%;
  overflow: hidden;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #4d82f6;
  color: #fff;
  .personal{
    .avatar-wrapper{
      min-width: 100px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 18px;
      color: #fff;
      height: 60px;
      line-height: 60px;
      img{
        margin-left: 7px;
      }
    }
  }
}
.link-list{
  display: flex;
  a{
    width: 170px;
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    letter-spacing: 1px;
    img{
      margin-right: 13px;
    }
    &:hover{
      background: #2c6bf7;
    }
  }
}
.sub-list{
  display: flex;
  flex-direction: column;
  a{
    font-size: 14px;
    padding: 8px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    img{
      margin-right: 5px;
    }
    &:hover,
    &.active{
      color: #4d82f6;
    }
  }
}
</style>
