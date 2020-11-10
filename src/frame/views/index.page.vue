<template>
  <div class="dispatch-system-default frame">
    <left-menu-tmpl :menuLists="menuLists"></left-menu-tmpl>
    <div :class="['frame-container', {'active': $store.state.frame.leftMeunWidth}]">
      <breadcrumb-tmpl @showKeepLiveList="showKeepLiveList"></breadcrumb-tmpl>
      <transition name="page-fade" mode="out-in">
        <keep-alive :include="tagsList">
          <router-view></router-view>
        </keep-alive>
        <!-- <router-view></router-view> -->
      </transition>
      <!-- <groupTabTmpl></groupTabTmpl> -->
    </div>
  </div>
</template>
<script>
const LeftMenuTmpl = resolve => require(['../../common/components/left-menu.tmpl'], resolve)
const BreadcrumbTmpl = resolve => require(['../../common/components/breadcrumb.tmpl'], resolve)
// const groupTabTmpl = resolve => require(['../../common/components/groupTab.tmpl'], resolve)
export default {
  name: 'FramePage',
  data () {
    return {
      tagsList: [],
      menuLists: []
    }
  },
  components: {
    LeftMenuTmpl,
    BreadcrumbTmpl
  },
  created () {
    this.getMenuList()
  },
  methods: {
    getMenuList: function () {
      let self = this
      self.$http.get(self.$api.getApiAddress('/ui/menuList', 'CESHI_API_HOST')).then((res) => {
        if (res.data.code === 0) {
          self.menuLists = (res.data.data).sort(this.paixu)
          let menu = self.menuLists.map(item=>{
            return {
              'menuName': item.auth.menuName,
              'pageUrl': item.auth.pageUrl
            }
          })
          sessionStorage.setItem("menuList",JSON.stringify(menu));
        }
      }).catch(() => {
        self.$message({message: '服务器未响应！', type: 'error'})
      })
    },
    paixu: function (obj1, obj2) {
      var val1 = obj1.auth.menuOrder
      var val2 = obj2.auth.menuOrder
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    showKeepLiveList: function (msg) {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        if (msg[i].meta.auth) {
          arr.push(msg[i].name)
        }
      }
      this.tagsList = arr
    }
  }
}
</script>
<style lang="less" scoped>
@import "../styles/index.page.less";
</style>

<style lang="less">
@import '../../common/styles/transition.less';
@import '../../common/styles/theme.less'; // [ext] inject config.less as global setting
@import '../../common/fonts/iconfont.less';
</style>
