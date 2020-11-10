const HomePage = resolve => require(['../views/home.page.vue'], resolve)
const HomeModuleRouter = {}
HomeModuleRouter.routers = [
  {
    path: '/admin-home',
    component: HomePage,
    name: 'HomePage2',
    meta: {
      title: '管理员首页',
      auth: true
    }
  }
]
export default HomeModuleRouter
