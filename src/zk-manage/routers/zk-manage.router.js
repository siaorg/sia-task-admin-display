const ZkManagePage = resolve => require(['../views/zk-manage.page.vue'], resolve)
const ZkManageModuleRouter = {}
ZkManageModuleRouter.routers = [
  {
    path: '/zk-manage',
    component: ZkManagePage,
    name: 'ZkManagePage',
    meta: {
      title: 'ZK管理',
      auth: true
    }
  }
]
export default ZkManageModuleRouter
