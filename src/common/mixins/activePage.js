export default {
  data () {
    return {
      activatedFlag: false
    }
  },
  activated () {
    this.activatedFlag = true
  },
  deactivated () {
    this.activatedFlag = false
  }
}
