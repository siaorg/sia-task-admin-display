const DesktopIndexPage = resolve => require(['../views/desktop.page'], resolve)

const DesktopRouter = {}

DesktopRouter.routers = [
  {
    path: '/web/',
    component: DesktopIndexPage,
    name: 'DesktopIndexPage',
    meta: {
      title: '门户列表',
      auth: false,
      access: {
        module: 'Desktop',
        page: 'Desktop'
      }
    }
  }
]

export default DesktopRouter
