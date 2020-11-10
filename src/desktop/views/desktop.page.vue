<template>
  <div class="desktop">
      <div class="desktop-top">
          <div class="top-bar-left">微服务任务调度平台</div>
          <div class="user-msg">
              <div class="user-img">
                <span class="iconfont"><img src="../images/account-bar01.svg" alt=""></span>
              </div>
              <div class="user-name">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span>
                    {{userName}}
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
        </div>
      </div>
      <div class="desktop-main">
          <div class="title"><span>微服务任务调度平台</span></div>
          <div class="sub-title"><span>Microservice task scheduling platform</span></div>
          <div class="task-list">
              <div class="task-item" v-for="(item,index) in groupData" :key="item.groupName + index" @click="goToHome(item.groupName)">
                  <div class="task-title" v-if="item.groupName.length > 16">
                    <el-tooltip effect="dark" :content="item.groupName" placement="top-start">
                      <span>{{ item.groupName.slice(0, 16) + '...' }}</span>
                    </el-tooltip>
                  </div>
                  <div class="task-title" v-else>
                      <span>{{item.groupName}}</span>
                  </div>
                  <div class="task-info">{{item.appSize}}</div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'DesktopIndexPage',
  data () {
    return {
      userName: '',
      groupData: [
        // {
        //     "groupName": "apple923",
        //     "appSize": 24
        // },
        // {
        //     "groupName": "apple924",
        //     "appSize": 24
        // },
        // {
        //     "groupName": "sia",
        //     "appSize": 21
        // }
      ]
    }
  },
  created () {
    this.clearLoginData()
    this.getSysListData()
    this.getUserData()
  },
  computed: {
    groupList() {
      let groupList = this.groupData.map(item => {
          return item.groupName
      })
      return groupList;
    }
  },
  methods: {
    clearLoginData() {
      this.$store.commit('CUR_APPGROUP', '')
    },
    getUserData() {
      this.$http.get(this.$api.getApiAddress('/ui/currentUserName', 'CESHI_API_HOST')).then((res) => {
        if (res.data.code === 0) {
          this.userName = res.data.data
        } else {
          this.$message({message: res.data.message, type: 'error'})
        }
      }).catch(() => {
        this.$message({message: '服务器未响应！', type: 'error'})
      })
    },
    handleCommand(val) {
      if (val === 'logout') {
        window.location = '/logout'
      }
    },
    getSysListData() {

      this.$http.get(this.$api.getApiAddress('/ui/groupList', 'CESHI_API_HOST')).then((res) => {
        if (res.data.code === 0) {
          this.groupData = res.data.data;
        } else {
          this.$message({message: res.data.message, type: 'error'})
        }
      }).catch(() => {
        this.$message({message: '服务器未响应！', type: 'error'})
      })
    },
    goToHome(groupName) {
      this.$store.commit('CUR_APPGROUP', groupName)
      this.$store.commit('GROUP_List', this.groupList)
      this.$router.push({path: '/user-home'})
    }
  }
}
</script>
<style lang="less" scoped>
@import "../styles/desktop.page.less";
</style>
<style lang="less">
@import '../../common/styles/theme.less';
@import '../../common/fonts/iconfont.less';
@import "../styles/desktop.page.reset.less";
</style>
