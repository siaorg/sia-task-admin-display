
import Vue from 'vue'
import CommonRouter from './common.router.js'
import DesktopRouter from '../../desktop/routers/desktop.router.js'
import FrameRouter from '../../frame/routers/frame.router.js'
import store from '../services/store.provider'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

let whiteList = ['/user-home', '/task-manage-list', '/job-manage-list', '/task-log-list']
let routerArray = [
  {
    path: '/',
    redirect: '/web'
  }
]

routerArray = routerArray.concat(CommonRouter.routers)
routerArray = routerArray.concat(DesktopRouter.routers)
routerArray = routerArray.concat(FrameRouter.routers)

const appRouter = new VueRouter({
  mode: 'history',
  saveScrollPosition: true,
  routes: routerArray
})

appRouter.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path) && store.state.DeskTtopStore.curAppGroup == '') {
    next({ path: '/' })
    Vue.prototype.$message({ message: '请先选择用户组', type: 'warning' })
  }
  next()
  document.title = to.meta.title
})

export default appRouter
