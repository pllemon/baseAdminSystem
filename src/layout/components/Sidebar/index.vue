<template>
  <div>
    <el-scrollbar>
      <ul class="nav-list">
        <li v-for="(item,index) in singleMenu" :key="index">
          <p class="nav-title">{{ item.text }}</p>
          <div class="nav-items">
            <router-link v-for="(item2,index2) in item.child" :key="index2" :to="item2.url">
              <img :src="item2.icon">
              <span>{{ item2.text }}</span>
            </router-link>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'menuList'
    ]),
    singleMenu() {
      const parent = this.$route.meta.parent
      const singleMenu = this.menuList.filter(item => item.meta === parent)
      return singleMenu
    }
  }
}
</script>

<style scoped lang="scss">
.nav-list{
  font-size: 16px;
  .nav-title{
    font-size: 14px;
    color: #999999;
    padding-left: 20px;
    height: 42px;
    line-height: 42px;
  }
  .nav-items{
    a{
      font-size: 16px;
      color: #333333;
      height: 42px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      img{
        margin-right: 10px;
      }
      &.router-link-active{
        background: #ecf2ff;
        color: #4d82f6;
        border-right: 4px solid #4d82f6;
      }
    }
  }
}
</style>
