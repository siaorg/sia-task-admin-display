<template>
  <div class="group-tab">
      <div class="tab-item" :class="{ 'active': isActive(item)}" v-for="(item,index) in this.$store.state.DeskTtopStore.groupList" :key="index" @click="changeGroup(item)">{{item}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tagsList: []
    }
  },
  watch: {

  },
  created () {

  },
  methods: {
    isActive(item) {
      return item === this.$store.state.DeskTtopStore.curAppGroup
    },
    changeGroup(group) {
      this.$store.commit('CUR_APPGROUP', group)
      // this.$router.push('/user-home')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../styles/common/groupTab.tmpl.less';
</style>
