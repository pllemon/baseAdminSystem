import axios from 'axios'

const state = {
  allDict: {
    'CHANGE_TYPE': {
      0: {
        value: 0,
        label: '添加',
        dictName: '修改类型'
      },
      1: {
        value: 1,
        label: '查看',
        dictName: '修改类型'
      },
      2: {
        value: 2,
        label: '编辑',
        dictName: '修改类型'
      },
    }
  }
}

const mutations = {
  SET_ALL_DICT: (state, data) => {
    state.allDict = Object.assign({}, state.allDict, data)
    console.log('全部字典=', state.allDict)
  }
}

const actions = {
  // 获取全部字典
  getAllDict({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/dms/baseDict/all').then(function (response) {
        let { data } = response
        let dictObj = {};
        data.forEach((item) => {
          if (!dictObj[item.dictCode]) {
            dictObj[item.dictCode] = {};
          }
          dictObj[item.dictCode][item.dictItemValue] = {
            value: parseInt(item.dictItemValue),
            label: item.dictItemName,
            dictName: item.dictName
          }
        })
        commit('SET_ALL_DICT', dictObj)
        resolve(dictObj)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

