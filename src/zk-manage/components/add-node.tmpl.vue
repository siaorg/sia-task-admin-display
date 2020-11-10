<template>
  <div class="add-node" id="mask">
      <div class="mask-content" id="mask-content">
        <div class="mask-main-title">
          <span>添加节点</span>
          <i class="close-icon" @click="showHiddenAddNode"></i>
        </div>
        <div class="info">
          <!--:rules="addNodeViewModelRules"-->
          <el-form :model="addNodeViewModel" :rules="addNodeViewModelRules" label-width="120px" ref="addNodeForm" class="dispose-Subgroup-form" auto-complete="off">
            <el-form-item label="节点名称" prop="nodeName">
              <el-input type="text" auto-complete="off" placeholder="" v-model="addNodeViewModel.nodeName"></el-input>
            </el-form-item>
            <el-form-item label="Node Data">
              <el-input type="text" auto-complete="off" placeholder="" v-model="addNodeViewModel.nodeDate"></el-input>
            </el-form-item>
          </el-form>
          <div class="alert-button">
            <el-button @click="showHiddenAddNode">取消</el-button>
            <el-button @click="showHiddenSave">添加</el-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AddNodeTmpl',
  props: ['addNodeParams'],
  data () {
    return {
      addNodeViewModel: {
        nodeName: '',
        nodeDate: ''
      },
      addNodeViewModelRules: {
        nodeName: [this.$validator.required('请输入节点名称')]
      }
    }
  },
  methods: {
    showHiddenSave: function () {
      let self = this
      this.$refs.addNodeForm.validate(valid => {
        if (valid) {
          self.$http.post(self.$api.getApiAddress('/zkapi/addZkNodeOfPath', 'CESHI_API_HOST'), {
            path: this.addNodeParams,
            nodeName: this.addNodeViewModel.nodeName,
            nodeData: this.addNodeViewModel.nodeDate
          }).then((res) => {
            if (res.data.code !== 0) {
              this.$emit('showHiddenAddNode', false)
              self.$message({message: res.data.message, type: 'error'})
            } else {
              let path = this.addNodeParams !== '/' ? (this.addNodeParams + '/' + this.addNodeViewModel.nodeName) : (this.addNodeParams + this.addNodeViewModel.nodeName)
              this.$emit('showHiddenAddNode', false, this.addNodeViewModel.nodeName, path)
              self.$message({message: '添加成功！', type: 'success'})
            }
          }).catch(() => {
            // self.$message({message: '未登录！', type: 'error'})
          })
        }
      })
    },
    showHiddenAddNode: function () {
      this.$emit('showHiddenAddNode', false)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../styles/common/add-node.tmpl.less';
</style>
