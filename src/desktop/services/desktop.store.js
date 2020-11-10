'use strict'

const loginStore = {}

/* @usage : store state data shcema
            this.$store.state.login  */
loginStore.state = {
  userInfo: JSON.parse(sessionStorage.getItem('userInfoLogin')) || '',
  curAppGroup: sessionStorage.getItem('curAppGroup') || '',
  groupList: JSON.parse(sessionStorage.getItem('groupList')) || ''
}

/* @usage : based on state ,  return state's length or filter state data */
loginStore.getters = {

}

/* @usage : unit operation
   this.$store.commit('USER_LOGIN') */
loginStore.mutations = {
  'USER_LOGIN' (state, userInfoLogin) {
    state.userInfo = userInfoLogin
    sessionStorage.setItem('userInfoLogin', JSON.stringify(state.userInfo))
  },
  'USER_LOGOUT' (state) {
    state.userInfo = ''
    sessionStorage.removeItem('userInfoLogin')
  },
  'CUR_APPGROUP' (state, appGroup) {
    state.curAppGroup = appGroup
    sessionStorage.setItem('curAppGroup', state.curAppGroup)
  },
  'GROUP_List' (state, groupList) {
    state.groupList = groupList
    sessionStorage.setItem('groupList', JSON.stringify(state.groupList))
  }
}

/* @usage : basic the operation for view component , this.$store.dispatch('USER_LOGIN') */
loginStore.actions = {
  'USER_LOGIN_ACTION' ({ commit }, obj) {
    return new Promise((resolve, reject) => {
      commit('USER_LOGIN', obj)
      resolve()
    })
  },
  'USER_LOGOUT_ACTION' ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('USER_LOGOUT')
      resolve()
    })
  }
}

export default loginStore
