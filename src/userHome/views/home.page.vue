<template>
<div class="dispatch-system-default home-page scroll-bar">
    <div class="top-static">
        <div class="static-item">
            <div class="title"><span>任务汇总</span></div>
            <div class="static-info">
                <dl>
                    <dt>{{ topStaticData.jobCount }}</dt>
                    <dd>Job总数</dd>
                </dl>
                <dl>
                    <dt>{{ topStaticData.taskCount }}</dt>
                    <dd>Task总数</dd>
                </dl>
            </div>
            <div class="static-bar">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="static-item">
            <div class="title"><span>调度次数统计</span></div>
            <div class="static-info">
                <dl>
                    <dt>{{ topStaticData.schedulingCount4Daily }}</dt>
                    <dd>日调度统计</dd>
                </dl>
                <dl>
                    <dt>{{ topStaticData.schedulingCount4Historical || 0 }}</dt>
                    <dd>历史调度统计</dd>
                </dl>
            </div>
            <div class="static-bar">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="static-item">
            <div class="title"><span>异常调度统计</span></div>
            <div class="static-info">
                <dl>
                    <dt>{{ topStaticData.jobErrorCount4Daily }}</dt>
                    <dd>Job异常</dd>
                </dl>
                <dl>
                    <dt>{{ topStaticData.taskErrorCount4Daily }}</dt>
                    <dd>Task异常</dd>
                </dl>
            </div>
            <div class="static-bar">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    <div class="col-static">
        <div class="static-area flex-2">
            <div class="area-title">健康度</div>
            <div class="static-pic" style="position:relative;">
                <div id="homePie1" class="home-pie1"></div>
                <div id="homePie2" class="home-pie2"></div>
                <div id="homePie4" class="home-pie4"></div>
            </div>
        </div>
        <div class="static-area flex-1">
            <div class="area-title">JOB调度统计趋势</div>
            <div class="static-pic">
                <div id="homeLine1" class="home-line1"></div>
            </div>
        </div>
    </div>
    <div class="col-static">
        <div class="static-area flex-2">
            <div class="area-title">预警日志TOP-10</div>
            <div class="static-content">
                <div class="log-list">
                    <table cellpading="0" cellspacing="0" border="0">
                        <tr v-for="(item,index) in warningLogData" :key="index">
                            <td>{{ item.taskKey }}</td>
                            <!-- <td>{{ item.errorCount }}</td> -->
                            <td>{{ item.jobKey }} <span class="error">{{ item.errorCount }}</span></td>
                            <td>{{ $formatDate.dateFormat(item.errorTime)}} </td>
                            <td><span class="btn-check" @click="goToDetail(item.jobKey)">查看</span></td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>
        <div class="static-area flex-1">
            <div class="area-title">task调度统计趋势</div>
            <div class="static-pic">
                <div id="homeLine2" class="home-line2"></div>
            </div>
        </div>
    </div>
    <div class="col-static">
        <div class="static-area flex-all">
            <div class="area-title">任务的分配</div>
            <div class="static-content">
                <div class="static-pic">
                    <div id="homePie3" class="home-pie3"></div>
                </div>
                <div class="static-assign">
                    <div class="assign-title">分配情况<em class="bg" :style="{background: assignTable.background}"></em><span class="dot">{{assignTable.title}}</span></div>
                    <div class="assign-area">
                        <ul>
                            <li v-for="(item,index) in assignTable.list" :key="index"><span :style="{background: assignTable.background}">{{ index + 1 }}</span>{{ item }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            topStaticData: {
                // "taskCount": 21, //Task总数
                // "jobCount": 100, //Job总数
                // "schedulingCount4Daily": 141168, //日调度统计
                // "schedulingCount4Historical": 5552142, //历史调度统计
                // "jobErrorCount4Daily": 0, //Job异常
                // "taskErrorCount4Daily": 0 //Task异常
            },
            healthData: {
                // "schedulerTotal": 140799, //日调度总数
                // "schedulerError": 5, //错误数
                // "misTriggerCount": 4227 //miss数
            },
            warningLogData: [
                // {
                //     "taskKey": "apple923-mac923:/exception-fail-noparam",
                //     "errorCount": 2880,
                //     "jobKey": "apple924_error4",
                //     "errorTime": 1592721591000
                // },
                // {
                //     "taskKey": "apple923-mac923:/exception-fail-param",
                //     "errorCount": 2880,
                //     "jobKey": "apple924_error3",
                //     "errorTime": 1592721603000
                // },
                // {
                //     "taskKey": "apple923-mac923:/fail-param",
                //     "errorCount": 1440,
                //     "jobKey": "apple924_error5",
                //     "errorTime": 1592721603000
                // }
            ],
            jobStaticData: {
                xLine: [],
                yLine: []
            },
            taskStaticData: {
                xLine: [],
                yLine: []
            },
            taskAssignData: {
                label: [],
                chart:[],
                colorList:['#FDE176', '#3DA7F5', '#73DEB3', '#7585A2']
            },
            assignTable: {
              title:'',
              list: [],
              background:''
            }

        }
    },
    watch: {
        // '$store.state.DeskTtopStore.curAppGroup': function (val) {
        //     //你需要执行的代码
        //     if (val && this.$route.name === 'HomePage1') {
        //         this.getTopStaticData();
        //         this.getHealthData();
        //         this.getWarningData();
        //     }

        // }
    },
    computed: {
        otherError() {
            return this.healthData.schedulerTotal - this.healthData.schedulerError
        },
        otherMiss() {
            return this.healthData.schedulerTotal - this.healthData.misTriggerCount
        }
    },
    created() {
        this.getTopStaticData();
        this.getHealthData();
        this.getWarningData();
        this.getJobData();
        this.getTaskData();
        this.getTaskAssignData();
    },
    methods: {
        goToDetail(val) {
            //this.$router.push(`/log-details?jobGroup=${this.$store.state.DeskTtopStore.curAppGroup}&jobKey=${val}`)
            this.$router.push({
                name: "LogDeTailsPage",
                query: {
                    jobGroup: this.$store.state.DeskTtopStore.curAppGroup,
                    jobKey: val
                }
            })
        },
        showAssignTable(key) {
          let tmpObj = {...this.taskAssignData.chart}
          this.assignTable.title =tmpObj[key].name
          this.assignTable.list = tmpObj[key].detail
          this.assignTable.background = this.taskAssignData.colorList[key]
        },
        getTaskAssignData() {
            //获取任务的分配
            this.$http.get(this.$api.getApiAddress(`/index4user/jobLoadInfo?group=${this.$store.state.DeskTtopStore.curAppGroup}`, 'CESHI_API_HOST')).then((res) => {
                if (res.data.code === 0) {
                    let tempArr = []
                    let chartArr = []
                    let obj = res.data.data
                    for (var key in obj) {
                        tempArr.push(key)
                        chartArr.push({
                          name:key,
                          value:obj[key].length,
                          detail:obj[key]
                        })
                    }
                    this.taskAssignData.label = tempArr
                    this.taskAssignData.chart = chartArr
                    this.showAssignTable(0)
                    this.drawHomePie3();
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            }).catch(() => {
                this.$message({
                    message: '服务器未响应！',
                    type: 'error'
                })
            })
        },
        getTaskData() {
            //获取Task调度统计趋势
            this.$http.get(this.$api.getApiAddress(`/index4user/taskExecutionStatistics?group=${this.$store.state.DeskTtopStore.curAppGroup}`, 'CESHI_API_HOST')).then((res) => {
                if (res.data.code === 0) {
                    res.data.data.forEach(item => {
                        this.taskStaticData.xLine.push(item.schedulerTime)
                        this.taskStaticData.yLine.push(item.schedulerCount)
                    })
                    this.drawHomeLine2();
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            }).catch(() => {
                this.$message({
                    message: '服务器未响应！',
                    type: 'error'
                })
            })
        },
        getJobData() {
            //获取JOB调度统计趋势数据
            this.$http.get(this.$api.getApiAddress(`/index4user/jobSchedulingStatistics?group=${this.$store.state.DeskTtopStore.curAppGroup}`, 'CESHI_API_HOST')).then((res) => {
                if (res.data.code === 0) {
                    res.data.data.forEach(item => {
                        this.jobStaticData.xLine.push(item.schedulerTime)
                        this.jobStaticData.yLine.push(item.schedulerCount)
                    })
                    this.drawHomeLine1();
                    console.log('this.jobStaticData.xLine===',this.jobStaticData.xLine)
                    console.log('this.jobStaticData.yLine===',this.jobStaticData.yLine)
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            }).catch(() => {
                this.$message({
                    message: '服务器未响应！',
                    type: 'error'
                })
            })
        },
        getWarningData() {
            //获取预警日志数据
            this.$http.get(this.$api.getApiAddress(`index4user/warningLog?group=${this.$store.state.DeskTtopStore.curAppGroup}`, 'CESHI_API_HOST')).then((res) => {
                if (res.data.code === 0) {
                    this.warningLogData = res.data.data
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            }).catch(() => {
                this.$message({
                    message: '服务器未响应！',
                    type: 'error'
                })
            })
        },
        getHealthData() {
            //获取健康度数据
            this.$http.get(this.$api.getApiAddress(`index4user/taskTrackerHealthStatus?group=${this.$store.state.DeskTtopStore.curAppGroup}`, 'CESHI_API_HOST')).then((res) => {
                if (res.data.code === 0) {
                    this.healthData = res.data.data
                    this.drawHomePie1();
                    this.drawHomePie2();
                    this.drawHomePie4();
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            }).catch(() => {
                this.$message({
                    message: '服务器未响应！',
                    type: 'error'
                })
            })
        },
        getTopStaticData() {
            //获取大屏展示数据
            this.$http.get(this.$api.getApiAddress(`index4user/homePageStatistics?group=${this.$store.state.DeskTtopStore.curAppGroup}`, 'CESHI_API_HOST')).then((res) => {
                if (res.data.code === 0) {
                    this.topStaticData = res.data.data

                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            }).catch(() => {
                this.$message({
                    message: '服务器未响应！',
                    type: 'error'
                })
            })
        },
        drawHomePie1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homePie1'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {d}%',
                    position: function (pos, params, dom, rect, size) {
                      let yPos = '20%'
                      let xPos = 0
                      if (pos[0] < size.viewSize[0] / 2) {
                        xPos = pos[0] + 10
                      } else {
                        xPos = pos[0] - dom.offsetWidth - 10
                      }
                      return [xPos, yPos]
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    selectedMode:false,
                    bottom: 10,
                    left: 30,
                    data: [`异常(${this.healthData.schedulerError})`, `最近24h调度总数(${this.otherError})`]
                },
                series: [{
                    left: 'center',
                    top: 0,
                    center: ['20%', '40%'],
                    name: '健康度',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    minAngle: 10,
                    label: {
                        show: false,
                        position: 'center',
                        formatter: '{d}%'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '14',
                            fontWeight: 'bold',
                            color: '#000'
                        }
                    },
                    data: [{
                            value: this.healthData.schedulerError,
                            name: `异常(${this.healthData.schedulerError})`
                        },
                        {
                            value: this.otherError,
                            name: `最近24h调度总数(${this.otherError})`
                        }
                    ],
                    color: ['#FF8E8E', '#93EDC7'],
                    itemStyle: {
                        // emphasis: {
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: 'rgba(0, 0, 0, 0.9)'
                        // },
                        normal: {
                            borderWidth: 5,
                            borderColor: '#fff',
                            // color: function (params) {
                            //     //自定义颜色
                            //     var colorList = [
                            //         '#FF8E8E', '#d8d8d8'
                            //     ];
                            //     return colorList[params.dataIndex]
                            // }
                        }
                    }

                }]
            });
            let index = 0;
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
            // dataIndex属性伟data传入的索引值
            myChart.on("mouseover", function (e) {
                if (e.dataIndex != index) {
                    myChart.dispatchAction({
                        type: "downplay",
                        seriesIndex: 0,
                        dataIndex: index
                    });
                }
            });
            myChart.on("mouseout", function (e) {
                index = e.dataIndex;
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: e.dataIndex
                });
            });
            myChart.on('click', (e) => {

            });
        },
        drawHomePie2() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homePie2'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {d}%'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    selectedMode:false,
                    bottom: 10,
                    left: 30,
                    data: [`miss数(${this.healthData.misTriggerCount})`, `最近24h调度总数(${this.otherMiss})`]
                },
                series: [{
                    left: 'center',
                    top: 0,
                    center: ['10%', '40%'],
                    name: '健康度',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    minAngle: 10,
                    label: {
                        show: false,
                        position: 'center',
                        formatter: '{d}%'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '14',
                            fontWeight: 'bold',
                            color: '#000'
                        }
                    },
                    data: [{
                            value: this.healthData.misTriggerCount,
                            name: `miss数(${this.healthData.misTriggerCount})`
                        },
                        {
                            value: this.otherMiss,
                            name: `最近24h调度总数(${this.otherMiss})`
                        }
                    ],
                    color: ['#FAB073', '#93EDC7'],
                    itemStyle: {
                        // emphasis: {
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: 'rgba(0, 0, 0, 0.9)'
                        // },
                        borderWidth: 5,
                        borderColor: '#fff',
                        // color: function (params) {
                        //     //自定义颜色
                        //     var colorList = [
                        //         '#FAB073', '#d8d8d8'
                        //     ];
                        //     return colorList[params.dataIndex]
                        // }
                    }

                }]
            });
            let index = 0;
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
            // dataIndex属性伟data传入的索引值
            myChart.on("mouseover", function (e) {
                if (e.dataIndex != index) {
                    myChart.dispatchAction({
                        type: "downplay",
                        seriesIndex: 0,
                        dataIndex: index
                    });
                }
            });
            myChart.on("mouseout", function (e) {
                index = e.dataIndex;
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: e.dataIndex
                });
            });
            myChart.on('click', (e) => {

            });
        },
        drawHomePie4() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homePie4'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {d}%'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    selectedMode:false,
                    bottom: 10,
                    left: 20,
                    data: [`task异常(${this.healthData.executeError})`, `task执行总数(${this.healthData.executeTotal})`]
                },
                series: [{
                    left: 'center',
                    top: 0,
                    center: ['10%', '40%'],
                    name: '健康度',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    minAngle: 10,
                    label: {
                        show: false,
                        position: 'center',
                        formatter: '{d}%'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '14',
                            fontWeight: 'bold',
                            color: '#000'
                        }
                    },
                    data: [{
                            value: this.healthData.executeError,
                            name: `task异常(${this.healthData.executeError})`
                        },
                        {
                            value: this.healthData.executeTotal,
                            name: `task执行总数(${this.healthData.executeTotal})`
                        }
                    ],
                    color: ['#a48653', '#93EDC7'],
                    itemStyle: {
                        // emphasis: {
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: 'rgba(0, 0, 0, 0.9)'
                        // },
                        borderWidth: 5,
                        borderColor: '#fff',
                        // color: function (params) {
                        //     //自定义颜色
                        //     var colorList = [
                        //         '#FAB073', '#d8d8d8'
                        //     ];
                        //     return colorList[params.dataIndex]
                        // }
                    }

                }]
            });
            let index = 0;
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
            // dataIndex属性伟data传入的索引值
            myChart.on("mouseover", function (e) {
                if (e.dataIndex != index) {
                    myChart.dispatchAction({
                        type: "downplay",
                        seriesIndex: 0,
                        dataIndex: index
                    });
                }
            });
            myChart.on("mouseout", function (e) {
                index = e.dataIndex;
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: e.dataIndex
                });
            });
            myChart.on('click', (e) => {

            });
        },
        drawHomePie3() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homePie3'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} <br/>({d}%)'
                },
                legend: {
                    selectedMode:false,
                    orient: 'vertical',
                    right: 0,
                    bottom: 80,
                    data: this.taskAssignData.label
                },
                series: [{
                    left: '30%',
                    top: 0,
                    center: ['0%', '50%'],
                    name: '任务的分配',
                    type: 'pie',
                    radius: ['30%', '70%'],
                    minAngle: 10,
                    label: {
                        show: false,
                        position: 'center',
                        formatter: '{d}%'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '14',
                            fontWeight: 'bold',
                            color: '#000'
                        }
                    },
                    data: this.taskAssignData.chart,
                    color: this.taskAssignData.colorList,
                    itemStyle: {
                        // emphasis: {
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: 'rgba(0, 0, 0, 0.9)'
                        // },
                        // normal: {
                        //     color: function (params) {
                        //         //自定义颜色
                        //         var colorList = [
                        //             '#FF8E8E', '#F0F2F5'
                        //         ];
                        //         return colorList[params.dataIndex]
                        //     }
                        // }
                    }

                }]
            });
            let index = 0;
            let _this = this;
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
            // dataIndex属性伟data传入的索引值
            myChart.on("mouseover", function (e) {
                if (e.dataIndex != index) {
                    myChart.dispatchAction({
                        type: "downplay",
                        seriesIndex: 0,
                        dataIndex: index
                    });
                }
                _this.showAssignTable(e.dataIndex)
            });
            myChart.on("mouseout", function (e) {
                index = e.dataIndex;
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: e.dataIndex
                });
               // _this.showAssignTable(index)
            });
            myChart.on('click', (e) => {

            });
        },
        drawHomeLine1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homeLine1'))
            // 绘制图表
            myChart.setOption({

                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    axisLabel: {
                        color: '#8e8e8e',
                        fontSize: '10'
                    },
                    /*改变x轴颜色*/
                    axisLine: {
                        lineStyle: {
                            color: '#ccc',
                            width: 1, //这里是为了突出显示加上的
                        }
                    },
                    type: 'category',
                    data: this.jobStaticData.xLine
                },
                yAxis: {
                    axisLabel: {
                        color: '#8e8e8e'
                    },
                    /*改变y轴颜色*/
                    axisLine: {
                        lineStyle: {
                            color: '#ccc',
                            width: 0, //这里是为了突出显示加上的
                        }
                    },
                    type: 'value'
                },

                legend: {
                    data: ['job'],
                    left: 0
                },
                color: ['#61D1E9'],
                series: [{
                    name: 'job',
                    data: this.jobStaticData.yLine,
                    type: 'line',
                    smooth: true
                }]
            });
        },
        drawHomeLine2() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homeLine2'))
            // 绘制图表
            myChart.setOption({

                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    axisLabel: {
                        color: '#8e8e8e',
                        fontSize: '10'
                    },
                    /*改变x轴颜色*/
                    axisLine: {
                        lineStyle: {
                            color: '#ccc',
                            width: 1, //这里是为了突出显示加上的
                        }
                    },
                    type: 'category',
                    data: this.taskStaticData.xLine
                },
                yAxis: {
                    axisLabel: {
                        color: '#8e8e8e'
                    },
                    /*改变y轴颜色*/
                    axisLine: {
                        lineStyle: {
                            color: '#ccc',
                            width: 0, //这里是为了突出显示加上的
                        }
                    },
                    type: 'value'
                },

                legend: {
                    data: ['task'],
                    left: 0
                },
                color: ['#5664FF'],
                series: [{
                    name: 'task',
                    data: this.taskStaticData.yLine,
                    type: 'line',
                    smooth: true
                }]
            });
        }
    }
}
</script>

<style lang="less" scoped>
@import '../styles/home.page.less';
</style>
<style lang="less">
@import '../styles/home.page.reset.less';
</style>
