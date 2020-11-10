const HomePage = resolve => require(['../views/home.page.vue'], resolve)
const HomeModuleRouter = {}
HomeModuleRouter.routers = [
  {
    path: '/user-home',
    component: HomePage,
    name: 'HomePage',
    meta: {
      title: '用户首页',
      auth: true
    }
  }
]
export default HomeModuleRouter
