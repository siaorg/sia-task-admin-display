<template>
  <div class="dispatch-system-default zk-manage-page">
    <div class="section-container">
      <div class="left-box" id="left-box">
        <el-tree
          ref="tree"
          :props="defaultProps"
          lazy
          :show-checkbox="false"
          :indent="35"
          :highlight-current="true"
          :expand-on-click-node="false"
          :check-on-click-node="true"
          :load="loadNode"
          node-key="name"
          @node-click="handelNodeClick"
          >
          <span class="slot-t-node" slot-scope="{ node, data }">
            <span class="node-name">
              <i>
                <img :src="node.childNodes.length === 0 ? '../../../static/img/doc-s.png' : '../../../static/img/wenjian2.png'" alt="">
              </i>
              <span>{{ node.label }}</span>
            </span>
            <span class="icon-oper">
              <i title="添加节点" @click="() => appendTreeNode(data)"><img src="../images/add_node.png" alt=""></i>
              <i title="删除节点" @click="() => removeTreeNode(node, data)"><img src="../images/delete.png" alt=""></i>
            </span>
          </span>
        </el-tree>
        <div class="left-border" id="left-border"></div>
        <div class="refresh el-icon-refresh" :class="{'refresh-active': refreshActive}" @click="handelClickRefresh"></div>
      </div>
      <div class="right-box scroll-bar" id="right-box">
        <el-tabs v-model="tabActiveName" @tab-click="changeTabsHandleClick">
          <el-tab-pane label="Node Data" name="first">
            <el-form :model="nodeDataViewModel" class="nodeMetaDataViewForm">
              <el-form-item label="Node Date">
                <el-input type="textarea" v-model.trim="nodeDataViewModel.nodeContent" auto-complete="off" placeholder="请输入Node Date"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn-box">
              <el-button class="save" @click="handleClickEditMeta">保存</el-button>
              <el-button class="edit">取消</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Node Meta Data" name="second">
            <div class="node-info" v-show="isShowNodeDetails.meta">
              <p>
                <span>czxid：</span>
                <span>{{nodeMetaDataViewModel.czxid}}</span>
                <el-tooltip class="item" effect="dark" content="节点创建时的zxid" placement="top">
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
              <p>
                <span>mzxid：</span>
                <span>{{nodeMetaDataViewModel.mzxid}}</span>
                <el-tooltip class="item" effect="dark" content="节点最新一次更新发生时的zxid" placement="top">
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
              <p>
                <!-- | formatTime-->
                <span>ctime：</span>
                <span>{{nodeMetaDataViewModel.ctime}}</span>
                <el-tooltip placement="top" class="item">
                  <div slot="content">
                    节点创建时的时间戳  {{nodeMetaDataViewModel.ctime !== 0 ? '→' : ''}}  {{nodeMetaDataViewModel.ctime | formatTime}}
                  </div>
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
              <p>
                <span>mtime：</span>
                <span>{{nodeMetaDataViewModel.mtime}}</span>
                <el-tooltip placement="top" class="item">
                  <div slot="content">
                    节点最新一次更新发生时的时间戳 {{nodeMetaDataViewModel.mtime !== 0 ? '→' : ''}} {{nodeMetaDataViewModel.mtime | formatTime}}
                  </div>
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
              <p>
                <span>version：</span>
                <span>{{nodeMetaDataViewModel.version}}</span>
                <el-tooltip class="item" effect="dark" content="节点数据的更新次数" placement="top">
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
              <p>
                <span>cversion：</span>
                <span>{{nodeMetaDataViewModel.cversion}}</span>
                <el-tooltip class="item" effect="dark" content="其子节点的更新次数" placement="top">
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
              <p>
                <span>ephemeralOwner：</span>
                <span>{{nodeMetaDataViewModel.ephemeralOwner}}</span>
                <el-tooltip placement="top" class="item">
                  <div slot="content">
                    如果该节点为ephemeral节点, ephemeralOwner值表示与该节点绑定的session id.</br>
                    如果该节点不是ephemeral节点, ephemeralOwner值为0
                  </div>
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
              <p>
                <span>dataLength：</span>
                <span>{{nodeMetaDataViewModel.dataLength}}</span>
                <el-tooltip class="item" effect="dark" content="节点数据的字节数" placement="top">
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
              <p>
                <span>numChildren：</span>
                <span>{{nodeMetaDataViewModel.numChildren}}</span>
                <el-tooltip class="item" effect="dark" content="子节点个数" placement="top">
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
              <p>
                <span>pzxid：</span>
                <span>{{nodeMetaDataViewModel.pzxid}}</span>
                <el-tooltip placement="top" class="item">
                  <div slot="content">
                    是与 该节点的子节点（或该节点）的最近一次 创建 / 删除 的时间戳对应
                  </div>
                  <span class="el-icon-warning info-icon"></span>
                </el-tooltip>
              </p>
            </div>
            <div class="node-data" v-show="!isShowNodeDetails.meta">暂无数据</div>
          </el-tab-pane>
          <el-tab-pane label="Node ACLs" name="third">
            <div class="node-info"  v-show="isShowNodeDetails.acls">
              <p>
                <span>scheme：</span>
                <span>{{nodeACLsDataViewModel.scheme}}</span>
              </p>
              <p>
                <span>permission：</span>
                <span>{{nodeACLsDataViewModel.perms}}</span>
              </p>
              <p>
                <span>id：</span>
                <span>{{nodeACLsDataViewModel.id}}</span>
              </p>
            </div>
            <div class="node-data" v-show="!isShowNodeDetails.acls">暂无数据</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- add node-->
    <add-node-tmpl v-if="addNodeShow" :addNodeParams="addNodeParams" v-on:showHiddenAddNode="showHiddenAddNode"></add-node-tmpl>
    <!-- add node end -->
  </div>
</template>

<script>
import moment from 'moment'
const addNodeTmpl = resolve => require(['../components/add-node.tmpl'], resolve)
export default {
  name: 'ZkManagePage',
  components: {addNodeTmpl},
  data () {
    return {
      // 刷新左侧菜单
      refreshActive: false,
      // 初始化顶级节点resolve
      parentsNodeResolve: {
        resolve: null,
        node: null
      },
      // 添加节点参数
      addNodeShow: false,
      addNodeParams: '',
      // 右侧tab切换
      tabActiveName: 'first',
      // 当前点击的节点
      currentNodeData: '',
      // nodeData
      nodeDataViewModel: {
        nodeContent: ''
      },
      // node meta
      nodeMetaDataViewModel: {
        czxid: '',
        mzxid: '',
        ctime: '',
        mtime: '',
        version: '',
        cversion: '',
        ephemeralOwner: '',
        dataLength: '',
        numChildren: '',
        pzxid: ''
      },
      // node  acls
      nodeACLsDataViewModel: {
        scheme: '',
        perms: '',
        id: ''
      },
      userResourceList: [],
      // tree解析节点key
      defaultProps: {
        label: 'name',
        children: 'zones'
      },
      // 节点详情是否显示
      isShowNodeDetails: {
        meta: true,
        acls: true
      },
      // 当前选中的节点树
      treeNode: {}
    }
  },
  filters: {
    formatTime: function (val) {
      if (val === null || val === 0) {
        return ''
      } else {
        return moment(new Date(val)).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created () {
    this.tabActiveName = 'first'
    // this.getNodeListData()
  },
  mounted () {
    this.moveLeftBox()
  },
  methods: {
    handelClickRefresh () {
      this.refreshActive = true
      this.parentsNodeResolve.node.childNodes = []
      this.loadNode(this.parentsNodeResolve.node, this.parentsNodeResolve.resolve)
      setTimeout(() => {
        this.refreshActive = false
      }, 1000)
    },
    moveLeftBox () {
      // 460+200
      var oPaneRight = document.getElementById('right-box')
      var oPaneleft = document.getElementById('left-box')
      var oDragIcon = document.getElementById('left-border')
      // 定义4个变量
      var disX = 0 // 鼠标按下时光标的X值
      var disW = 0 // 拖拽前div的宽
      // 3. 给小div加点击事件
      oDragIcon.onmousedown = function (evD) {
        var ev = evD || window.event
        disX = ev.clientX // 获取鼠标按下时光标x的值
        disW = oPaneleft.offsetWidth // 获取拖拽前div的宽
        document.onmousemove = function (evs) {
          var evM = evs || window.event
          // 拖拽时为了对宽和高 限制一下范围
          var W = evM.clientX - disX + disW
          if (W < 380) {
            W = 380
          }
          if (W > (document.body.offsetWidth - 660)) {
            W = document.body.offsetWidth - 660
          }
          oPaneleft.style.width = W + 'px' // 拖拽后物体的宽
          oPaneRight.style.width = 'calc(100% - ' + W + 'px)' // 拖拽后物体的宽
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    // 隐藏添加节点弹出框
    showHiddenAddNode (val, nodeName, path) {
      this.addNodeShow = val
      if (nodeName !== undefined) {
        this.$refs.tree.append({'name': nodeName, 'children': [], 'path': path, 'leaf': true}, this.treeNode)
      }
      this.treeNode.expanded = true
    },
    // 获取节点
    getNodeListData () {
      let self = this
      return new Promise((resolve, reject) => {
        self.$http.get(self.$api.getApiAddress('/zkapi/loadLevelOfPath', 'CESHI_API_HOST'), {
          path: '/'
        }).then((res) => {
          if (res.data.code === 0) {
            this.getNodeDetails(res.data.data.path)
            resolve(res.data.data)
          } else {
            reject(res)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // 获取指定节点的子节点
    getChildrenNode (path) {
      let self = this
      return new Promise((resolve, reject) => {
        self.$http.get(self.$api.getApiAddress('/zkapi/loadLevelOfPath', 'CESHI_API_HOST'), {
          path: path
        }).then((res) => {
          if (res.data.code === 0) {
            resolve(res.data.data.children)
          } else {
            reject(res)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // 初始化节点值
    initData (data) {
      // node  data  详情展示
      // this.nodeDataViewModel.nodeContent = (data && data.content) ? data.content : ''
      let datas = (data && data.content) ? data.content : ''
      this.formatJson(datas)
      // meta 详情展示
      this.nodeMetaDataViewModel = {
        czxid: (data && data.stat) ? data.stat.czxid : '',
        mzxid: (data && data.stat) ? data.stat.mzxid : '',
        ctime: (data && data.stat) ? data.stat.ctime : '',
        mtime: (data && data.stat) ? data.stat.mtime : '',
        version: (data && data.stat) ? data.stat.version : '',
        aversion: (data && data.stat) ? data.stat.aversion : '',
        cversion: (data && data.stat) ? data.stat.cversion : '',
        ephemeralOwner: (data && data.stat) ? data.stat.ephemeralOwner : '',
        dataLength: (data && data.stat) ? data.stat.dataLength : '',
        numChildren: (data && data.stat) ? data.stat.numChildren : '',
        pzxid: (data && data.stat) ? data.stat.pzxid : ''
      }
      // acls详情展示
      this.nodeACLsDataViewModel = {
        scheme: (data && data.acl) ? data.acl.scheme : '',
        perms: (data && data.acl) ? data.acl.perms : '',
        id: (data && data.acl) ? data.acl.id : ''
      }
      if (data.stat) {
        this.isShowNodeDetails.meta = true
      } else {
        this.isShowNodeDetails.meta = false
      }
      if (data.acl) {
        this.isShowNodeDetails.acls = true
      } else {
        this.isShowNodeDetails.acls = false
      }
    },
    // 右侧tabs切换
    changeTabsHandleClick (tab, event) {
      this.tabActiveName = tab.name
    },
    // 点击节点查看节点详情
    handelNodeClick (node, tree, msg) {
      this.treeNode = tree
      this.getNodeDetails(node.path)
    },
    getNodeDetails (path) {
      let self = this
      self.$http.get(self.$api.getApiAddress('/zkapi/loadZKNodeJson', 'CESHI_API_HOST'), {
        path: path
      }).then((res) => {
        if (res.data.code === 0) {
          self.initData(res.data.data)
        } else {
          self.$message({message: res.data.msg, type: 'error'})
        }
      }).catch(() => {
        // self.$message({message: '未登录！', type: 'error'})
      })
    },
    // 节点懒加载
    loadNode (node, resolve) {
      if (node.level === 0) {
        this.treeNode = node
        return this.getNodeListData().then((res) => {
          this.treeNode.data = {name: res.name}
          this.parentsNodeResolve.node = node
          this.parentsNodeResolve.resolve = resolve
          return resolve([{ name: res.name, path: res.path, id: res.name, content: res.content, stat: res.stat, acl: res.acl }])
        })
      }
      if (node.level > 0) {
        return this.getChildrenNode(node.data.path).then((res) => {
          return resolve(res)
        })
      }
    },
    handleCheckChange (data, checked, indeterminate) {
    },
    // 添加节点函数
    appendTreeNode (data) {
      if (this.treeNode.isLeaf) {
        this.treeNode.isLeaf = false
        this.treeNode.isLeafByUser = false
      }
      this.addNodeParams = data.path
      this.addNodeShow = true
    },
    // 删除节点函数
    removeTreeNode (node, data) {
      const children = node.parent.childNodes
      const index = children.findIndex(d => d.data.name === node.data.name)
      let self = this
      this.$confirm('你确定要删除' + node.data.name + '么?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.$http.get(self.$api.getApiAddress('/zkapi/deleteZkNodeOfPath', 'CESHI_API_HOST'), {
          path: node.data.path
        }).then((res) => {
          if (res.data.code === 0) {
            self.$message({message: '删除成功！', type: 'success'})
            children.splice(index, 1)
            let data = {
              content: null,
              stat: null,
              acl: null
            }
            this.initData(data)
          } else {
            self.$message({message: '删除失败!', type: 'error'})
          }
        }).catch(() => {
          self.$message({message: '删除失败!', type: 'error'})
        })
      })
    },
    // 文本更新
    handleClickEditMeta () {
      let self = this
      if (!this.treeNode.data) {
        self.$message({message: '请选择要修改的树节点!', type: 'error'})
      }
      self.$http.post(self.$api.getApiAddress('/zkapi/updateZKNodeJson', 'CESHI_API_HOST'), {
        path: this.treeNode.data ? this.treeNode.data.path : '',
        nodeData: this.nodeDataViewModel.nodeContent
      }).then((res) => {
        if (res.data.code === 0) {
          self.$message({message: '修改成功!', type: 'success'})
        } else {
          self.$message({message: res.data.message, type: 'error'})
        }
      }).catch(() => {
        // self.$message({message: '未登录！', type: 'error'})
      })
    },
    formatJson: function (params) {
      this.nodeDataViewModel.nodeContent = ''
      let k = 0
      let j = 0
      let ii = null
      let ele = null
      for (let i = 0; i < params.length; i++) {
        ele = params.charAt(i)
        if (j % 2 === 0 && ele === '}') {
          k--
          for (ii = 0; ii < k; ii++) {
            ele = '    ' + ele
          }
          ele = '\n' + ele
        } else if (j % 2 === 0 && ele === '{') {
          ele += '\n'
          k++
          for (ii = 0; ii < k; ii++) {
            ele += '    '
          }
        } else if (j % 2 === 0 && ele === ',') {
          ele += '\n'
          for (ii = 0; ii < k; ii++) {
            ele += '    '
          }
        } else if (ele === '"') {
          j++
        }
        this.nodeDataViewModel.nodeContent += ele
      }
    }
  }
}
</script>
<style lang='less' scoped>
@import '../styles/zk-manage.page.less';
</style>
<style lang='less'>
@import '../styles/zk-manage.page.reset.less';
</style>
