<template>
    <div :class="['left-menu', {'active': $store.state.frame.leftMeunWidth}]">
      <div class="logo" @click="goToGroup">
        <span></span>
        <span v-show="!$store.state.frame.leftMeunWidth">调度系统</span>
        <div class="group" v-if="$store.state.DeskTtopStore.curAppGroup">
          <el-tooltip class="item" effect="dark" placement="right">
            <div slot="content">当前用户组：<br/>{{ $store.state.DeskTtopStore.curAppGroup}}</div>
            <strong>{{ $store.state.DeskTtopStore.curAppGroup }}</strong>
          </el-tooltip>
        </div>
      </div>
      <el-menu  :default-active="onRoutes()" class="el-menu-vertical" @select="handleSelectMenu" :collapse="$store.state.frame.leftMeunWidth">
          <el-menu-item v-for="(item, index) in menuList" :index="item.auth.pageUrl" :key="item.auth.pageUrl" :class="item.auth.pageUrl.replace('/','')">
            <i></i>
            <span slot="title">{{item.auth.menuName}}</span>
          </el-menu-item>
          <!-- <el-menu-item index="home">
            <i></i>
            <span slot="title">首页</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="dispatch-manage">
            <i></i>
            <span slot="title">调度器管理</span>
          </el-menu-item>
          <el-menu-item index="monitor-manage">
            <i></i>
            <span slot="title">调度监控</span>
          </el-menu-item>
          <el-menu-item index="task-manage-list">
            <i></i>
            <span slot="title">TASK管理</span>
          </el-menu-item>
          <el-menu-item index="job-manage-list">
            <i></i>
            <span slot="title">JOB管理</span>
          </el-menu-item>
          <el-menu-item index="task-log-list">
            <i></i>
            <span slot="title">调度日志</span>
          </el-menu-item>
          <el-menu-item index="log-list-kibana">
            <i></i>
            <span slot="title">调度日志</span>
          </el-menu-item>
          <el-menu-item index="zk-manage">
            <i></i>
            <span slot="title">ZK管理</span>
          </el-menu-item> -->
      </el-menu>
    </div>
</template>

<script>
export default {
  name: 'LeftMenuTmpl',
  props: ['menuLists'],
  data () {
    return {
      isCollapse: false,
      delayLogo: true
    }
  },
  computed: {
    menuList: function () {
      return this.menuLists
    }
  },
  watch: {
    '$store.state.frame.leftMeunWidth': function () {
      setTimeout(() => {
        this.delayLogo = !this.delayLogo
      }, 60)
    }
  },
  methods: {
    onRoutes: function () {
      return this.$route.path
    },
    handleSelectMenu: function (index) {
      this.$store.dispatch('CHANGE_MENU_ACTION', {activeMenuIndex: index}).then(() => {
        this.$router.push(index)
      })
    },
    goToGroup() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less">
@import '../styles/common/left-menu.tmpl.less';
</style>
<style lang="less" scoped>
@import '../styles/transition.less';
</style>
