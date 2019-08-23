import { asyncRoutes, constantRoutes } from '@/router'

// 模拟菜单，删
const mockMenu = [
  {
    text: '首页',
    url: '/',
    icon: require('@/assets/icon/home.png')
  }, {
    text: '门禁管理',
    url: '/doorAccess/recordManage',
    icon: require('@/assets/icon/door.png'),
    meta: 'doorAccess',
    child: [
      {
        text: '门禁记录',
        url: '/doorAccess/recordManage',
        icon: require('@/assets/icon/record.png')
      },
      {
        text: '人员管理',
        url: '/doorAccess/staffManage',
        icon: require('@/assets/icon/staff.png')
      }
    ]
  }, {
    text: '考勤管理',
    url: '/checkAttendance/recordManage',
    icon: require('@/assets/icon/date.png'),
    meta: 'checkAttendance',
    child: [
      {
        text: '考勤记录',
        url: '/checkAttendance/recordManage',
        icon: require('@/assets/icon/record.png')
      },
      {
        text: '人员管理',
        url: '/checkAttendance/staffManage',
        icon: require('@/assets/icon/staff.png')
      },
      {
        text: '考勤规则',
        url: '/checkAttendance/ruleManage',
        icon: require('@/assets/icon/list2.png')
      },
      {
        text: '数据对接',
        url: '/checkAttendance/dataManage',
        icon: require('@/assets/icon/data.png')
      }
    ]
  }, {
    text: '会议室管理',
    url: '/aaa',
    icon: require('@/assets/icon/room.png'),
    meta: 'room',
    child: [
      {
        text: '使用记录',
        url: '/aaa',
        icon: require('@/assets/icon/record.png')
      },
      {
        text: '会议室管理',
        url: '/aaa',
        icon: require('@/assets/icon/chart.png')
      }
    ]
  }, {
    text: '访客管理',
    url: '/aaa',
    icon: require('@/assets/icon/visit.png'),
    meta: 'visit',
    child: [
      {
        text: '访客记录',
        url: '/aaa',
        icon: require('@/assets/icon/record.png')
      },
      {
        text: '访客管理',
        url: '/aaa',
        icon: require('@/assets/icon/visitor.png')
      }
    ]
  }, {
    text: '通用管理',
    url: '/commonSetting/deviceManage',
    icon: require('@/assets/icon/common.png'),
    meta: 'commonSetting',
    child: [
      {
        text: '设备列表',
        url: '/commonSetting/deviceManage',
        icon: require('@/assets/icon/list.png')
      },
      {
        text: '账号管理',
        url: '/aaa',
        icon: require('@/assets/icon/account.png')
      },
      {
        text: '系统信息',
        url: '/aaa',
        icon: require('@/assets/icon/info.png')
      }
    ]
  }
]

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  menuList: [],
  showHeader: true
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MENU: (state, menu) => {
    state.menuList = menu
  },
  SET_HEADER: (state, show) => {
    state.showHeader = show
  }
}

const actions = {
  // 获取不同角色的菜单项，改
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },

  // 获取全部导航菜单，增
  getAuthMenu({ commit }) {
    return new Promise(resolve => {
      const menuList = mockMenu
      commit('SET_MENU', menuList)
      resolve(menuList)
    })
  },

  // 设置头部
  setHeader({ commit }, show) {
    return new Promise(resolve => {
      commit('SET_HEADER', show)
      resolve(show)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
