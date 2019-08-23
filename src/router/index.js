import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: () => import('@/views/dashboard/index')
  }
]

/**
 * asyncRoutes
 * 根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/doorAccess',
    component: Layout,
    redirect: '/doorAccess/recordManage',
    name: 'DoorAccess',
    meta: {
      title: '门禁管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'recordManage',
        component: () => import('@/views/doorAccess/recordManage'),
        name: 'RecordManage',
        meta: { title: '门禁记录', parent: 'doorAccess' }
      },
      {
        path: 'staffManage',
        component: () => import('@/views/commonSetting/staffManage'),
        name: 'StaffManage',
        meta: { title: '人员管理', parent: 'doorAccess' }
      }
    ]
  },

  {
    path: '/checkAttendance',
    component: Layout,
    redirect: '/checkAttendance/recordManage',
    name: 'CheckAttendance',
    meta: {
      title: '考勤管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'recordManage',
        component: () => import('@/views/checkAttendance/recordManage'),
        name: 'RecordManage',
        meta: { title: '考勤记录', parent: 'checkAttendance' }
      },
      {
        path: 'staffManage',
        component: () => import('@/views/commonSetting/staffManage'),
        name: 'StaffManage',
        meta: { title: '人员管理', parent: 'checkAttendance' }
      },
      {
        path: 'ruleManage',
        component: () => import('@/views/checkAttendance/ruleManage'),
        name: 'RuleManage',
        meta: { title: '考勤规则', parent: 'checkAttendance' }
      },
      {
        path: 'dataManage',
        component: () => import('@/views/checkAttendance/dataManage'),
        name: 'DataManage',
        meta: { title: '数据对接', parent: 'checkAttendance' }
      }
    ]
  },

  {
    path: '/commonSetting',
    component: Layout,
    redirect: '/commonSetting/deviceManage',
    name: 'CommonSetting',
    meta: {
      title: '通用管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'deviceManage',
        component: () => import('@/views/commonSetting/deviceManage'),
        name: 'DeviceManage',
        meta: { title: '设备列表', parent: 'commonSetting' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
