import DispatchManageModuleRouter from '../../dispatch-manage/routers/dispatch-manage.router'
import TaskManageModuleRouter from '../../task-manage/routers/task-manage.router.js'
import JobManageModuleRouter from '../../job-manage/routers/job-manage.router.js'
import LogManageModuleRouter from '../../log-manage/routers/log-manage.router.js'
import LogListKibanaRouter from '../../log-list-kibana/routers/log-list-kibana.router.js'
import UserHomeModuleRouter from '../../userHome/routers/home.router.js'
import AdminHomeModuleRouter from '../../adminHome/routers/home.router.js'
import MonitorManageModuleRouter from '../../monitor-manage/routers/monitor-manage-manage.router.js'
import ZkManageModuleRouter from '../../zk-manage/routers/zk-manage.router.js'
const FrameIndexPage = resolve => require(['../views/index.page'], resolve)

const frameRouter = {}
let _routerArray = [
  {
    path: '/',
    redirect: '/web'
  }
]

_routerArray = _routerArray.concat(DispatchManageModuleRouter.routers) // dispatch
_routerArray = _routerArray.concat(UserHomeModuleRouter.routers) // userHome
_routerArray = _routerArray.concat(AdminHomeModuleRouter.routers) // adminHome
_routerArray = _routerArray.concat(MonitorManageModuleRouter.routers) // monitor
_routerArray = _routerArray.concat(TaskManageModuleRouter.routers) // task
_routerArray = _routerArray.concat(JobManageModuleRouter.routers) // job
_routerArray = _routerArray.concat(LogManageModuleRouter.routers) // log
_routerArray = _routerArray.concat(LogListKibanaRouter.routers) // log
_routerArray = _routerArray.concat(ZkManageModuleRouter.routers) // log

let menu = JSON.parse(sessionStorage.getItem('menuList')) || ''

if (menu) {
  _routerArray.map(item => {
    menu.forEach(m => {
      if (item.path == m.pageUrl && item.meta) {
        item.meta.title = m.menuName
      }
    })
    return item
  })
}

frameRouter.routers = [
  {
    path: '/',
    component: FrameIndexPage,
    hidden: true,
    meta: {
      title: '任务调度中心',
      auth: true,
      access: {module: 'frame', page: 'index'}
    },
    children: _routerArray
  }
]

export default frameRouter
