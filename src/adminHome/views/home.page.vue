<template>
<div class="dispatch-system-default home-page scroll-bar">
    <div class="top-static">
        <div class="static-item">
            <div class="title"><span>对接项目统计</span></div>
            <div class="static-info">
                <dl>
                    <dt>{{ topStaticData.taskGroups }}</dt>
                    <dd>项目组数</dd>
                </dl>
                <dl>
                    <dt>{{ topStaticData.taskApps }}</dt>
                    <dd>系统个数</dd>
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
            <div class="title"><span>调度统计</span></div>
            <div class="static-info">
                <dl>
                    <dt>{{ topStaticData.schedulingCount4Daily }}</dt>
                    <dd>日调度统计</dd>
                </dl>
                <dl>
                    <dt>{{ topStaticData.schedulingCount4Historical }}</dt>
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
            <div class="area-title">调度器任务分配情况</div>
            <div class="static-pic">
                <div id="homeBar1" class="home-bar1"></div>
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
    <div class="col-static">
        <div class="static-area flex-all">
            <div class="area-title">任务调度模型预算</div>
            <div class="static-content">
                <div id="bar3d1" class="bar-3d1"></div>
                <div v-if="galleryHourData.yLine.length > 0">
                    <div id="gallery1" class="gallery1"></div>
                </div>
                <div v-if="galleryMinuteData.yLine.length > 0">
                    <div id="gallery2" class="gallery2"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-static">
        <div class="static-area flex-all">
            <div class="area-title">对接项目详情</div>
            <div class="static-content">
                <el-table :data="projectCountData" class="home-table">
                    <el-table-column property="jobGroup" label="jobGroup"></el-table-column>
                    <el-table-column property="jobCount" label="JOB数量"></el-table-column>
                    <el-table-column property="taskCount" label="TASK数量"></el-table-column>
                    <el-table-column property="Emails" label="预警邮箱" width="600">
                        <template slot-scope="scope">
                            <p v-show="scope.row.hasOwnProperty('Emails')">
                                {{ scope.row.Emails.split(",").join(", ") }}
                            </p>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
    <div class="col-static" style="display:none;">
        <div class="static-area flex-all">
            <div class="area-title">CPU负载</div>
            <div class="static-pic">
                <div id="homeHalfPie1" class="home-half-pie"></div>
            </div>
        </div>
        <div class="static-area flex-all">
            <div class="area-title">磁盘</div>
            <div class="static-pic">
                <div id="homeHalfPie2" class="home-half-pie"></div>
            </div>
        </div>
        <div class="static-area flex-all">
            <div class="area-title">内存</div>
            <div class="static-pic">
                <div id="homeHalfPie3" class="home-half-pie"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'HomePage2',
    data() {
        return {
            topStaticData: {
                // "taskGroups": 4,
                // "taskApps": 5,
                // "taskCount": 94,
                // "jobCount": 103,
                // "schedulingCount4Historical": 5024501,
                // "schedulingCount4Daily": 140799
            },
            healthData: {
                // "schedulerTotal": 140799, //日调度总数
                // "schedulerError": 5, //错误数
                // "misTriggerCount": 4227 //miss数
            },
            schedulerData: {
                label: [],
                MAX_JOB_NUM: [],
                MY_JOB_NUM: [],
                ALARM_JOB_NUM: []
            },
            taskAssignData: {
                label: [],
                chart: [],
                colorList: ['#FDE176', '#3DA7F5', '#73DEB3', '#7585A2']
            },
            assignTable: {
                title: '',
                list: [],
                background: ''
            },
            projectCountData: [], // 对接项目总数详情数组
            bar3dData: {
                colorList: ['#B780E7', '#F8C570', '#A5C1FB', '#C4E79F'], //'#A2FCD8'
                xLine: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                yLine: [],
                dataList: []
            },
            galleryHourData: {
                instance: '',
                hour: '',
                xLine: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
                yLine: []
            },
            galleryMinuteData: {
                minute: '',
                xLine: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
                yLine: []
            }

        }
    },
    watch: {
        'galleryHourData.hour': {
            handler(newVal, oldVal) {
                if (this.galleryMinuteData.yLine.length > 0) {
                    this.getModelDataBySecond();
                }
            },
            immediate: true,
            deep: true
        }
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
        this.getSchedulerData();
        this.getTaskAssignData();
        this.getJointData();
        this.getModelDataByHour();
    },
    methods: {
        getJointData() {
            // 对接项目总数详情接口
            this.$http.get(this.$api.getApiAddress('/index4manager/jobGroupDetails', 'CESHI_API_HOST')).then((res) => {
                if (res.data.code === 0) {
                    this.projectCountData = res.data.data
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
        showAssignTable(key) {
            let tmpObj = {
                ...this.taskAssignData.chart
            }
            this.assignTable.title = tmpObj[key].name
            this.assignTable.list = tmpObj[key].detail
            this.assignTable.background = this.taskAssignData.colorList[key]
        },
        getModelDataBySecond() {
            //指定调度器的指定小时指定分钟的秒维度的调度计数统计
            this.$http.get(this.$api.getApiAddress(`/schedulingmodel/schedulingModelBySecond?instance=${this.galleryHourData.instance}&hour=${this.galleryHourData.hour}&minute=${this.galleryMinuteData.minute}`, 'CESHI_API_HOST')).then((res) => {

                if (res.data.code === 0) {
                    let tempArr = []
                    let tempObj = res.data.data;
                    for (var key in tempObj) {
                        tempArr.push(tempObj[key])
                    }
                    this.galleryMinuteData.yLine = tempArr;
                    this.$nextTick(() => {
                        this.drawGallery2()
                    })
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
        getModelDataByMinute() {
            //指定调度器的指定小时的分钟维度调度计数
            this.$http.get(this.$api.getApiAddress(`/schedulingmodel/schedulingModelByMinute?instance=${this.galleryHourData.instance}&hour=${this.galleryHourData.hour}`, 'CESHI_API_HOST')).then((res) => {

                if (res.data.code === 0) {
                    let tempArr = []
                    let tempObj = res.data.data;
                    for (var key in tempObj) {
                        tempArr.push(tempObj[key])
                    }
                    this.galleryHourData.yLine = tempArr;
                    this.$nextTick(() => {
                        this.drawGallery1()
                    })
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
        getModelDataByHour() {
            //获取调度器维度一天24小时的调度计数统计
            this.$http.get(this.$api.getApiAddress(`/schedulingmodel/schedulingModelByHour`, 'CESHI_API_HOST')).then((res) => {

                if (res.data.code === 0) {
                    let tempObj = res.data.data.map;
                    for (var key in tempObj) {
                        this.bar3dData.yLine.push(tempObj[key])
                    }
                    this.bar3dData.dataList = res.data.data.per;
                    this.$nextTick(() => {
                        this.drawBar3d1();
                    })

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
        getTaskAssignData() {
            //获取任务的分配
            this.$http.get(this.$api.getApiAddress(`/index4manager/jobLoadInfo`, 'CESHI_API_HOST')).then((res) => {
                if (res.data.code === 0) {
                    let tempArr = []
                    let chartArr = []
                    let obj = res.data.data
                    for (var key in obj) {
                        tempArr.push(key)
                        chartArr.push({
                            name: key,
                            value: obj[key].length,
                            detail: obj[key]
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
        getSchedulerData() {
            //获取调度器任务分配情况
            this.$http.get(this.$api.getApiAddress(`index4manager/schedulerLoadInfo`, 'CESHI_API_HOST')).then((res) => {
                if (res.data.code === 0) {
                    // this.schedulerData
                    let tempArr = []
                    let chartArr = []
                    let obj = res.data.data
                    for (var key in obj) {
                        tempArr.push(key)
                        chartArr.push(JSON.parse(obj[key]))
                    }
                    this.schedulerData.label = tempArr
                    this.schedulerData.MAX_JOB_NUM = chartArr.map(item => {
                        return item.MAX_JOB_NUM - 0
                    })
                    this.schedulerData.MY_JOB_NUM = chartArr.map(item => {
                        return item.MY_JOB_NUM - 0
                    })
                    this.schedulerData.ALARM_JOB_NUM = chartArr.map(item => {
                        return item.ALARM_JOB_NUM - 0
                    })
                    this.drawHomeBar1()
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                }
            }).catch(() => {
                // this.$message({
                //     message: '服务器未响应！',
                //     type: 'error'
                // })
            })
        },
        getHealthData() {
            //获取健康度数据
            this.$http.get(this.$api.getApiAddress(`index4manager/taskTrackerHealthStatus`, 'CESHI_API_HOST')).then((res) => {
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
            this.$http.get(this.$api.getApiAddress(`index4manager/homePageStatistics`, 'CESHI_API_HOST')).then((res) => {
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
                    formatter: '{a} <br/>{b}: {d}%'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    selectedMode: false,
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
                    selectedMode: false,
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
                    selectedMode: false,
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
                    selectedMode: false,
                    bottom: 10,
                    left: 30,
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
        drawHomeHalfPie1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homeHalfPie1'));
            let current = 80; // 当前用量
            let all = 100; // 总量

            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}({c}%)'
                },
                legend: {
                    bottom: 20,
                    left: 'center',
                    data: ['负载率']
                },
                series: [{
                    center: ['50%', '50%'],
                    radius: ['50%', '60%'],
                    startAngle: 180,
                    name: 'CPU负载',
                    type: 'pie',
                    label: {
                        show: false,
                        position: 'center',
                        formatter: '{c}%'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            color: '#000'
                        }
                    },
                    data: [{
                            value: current,
                            name: '负载率',
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        colorStops: [
                                            // !! 在此添加想要的渐变过程色 !!
                                            {
                                                offset: 0,
                                                color: '#C5DDFF'
                                            },
                                            {
                                                offset: 1,
                                                color: '#75A3FF'
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            name: '剩余', // 实际显示部分是总量-用量
                            value: all - current
                        },
                        {
                            name: 'bottom',
                            value: all,
                            itemStyle: {
                                color: 'transparent'
                            },
                            label: {
                                show: false,
                                position: 'center',
                                formatter: () => ''
                            },
                            cursor: 'default',
                            tooltip: {
                                formatter: () => ''
                            }
                        }
                    ],
                    color: ['#ddd'],
                    itemStyle: {
                        // emphasis: {
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: 'rgba(0, 0, 0, 0.9)'
                        // },
                        // color: function (params) {
                        //     //自定义颜色
                        //     var colorList = [
                        //         '#FAB073'
                        //     ];
                        //     return colorList[params.dataIndex]
                        // }
                    }

                }]
            });
        },
        drawHomeHalfPie2() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homeHalfPie2'));
            let current = 80; // 当前用量
            let all = 100; // 总量

            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}({c}%)'
                },
                legend: {
                    bottom: 20,
                    left: 'center',
                    data: ['磁盘使用率']
                },
                series: [{
                    center: ['50%', '50%'],
                    radius: ['50%', '60%'],
                    startAngle: 180,
                    name: '使用率',
                    type: 'pie',
                    label: {
                        show: false,
                        position: 'center',
                        formatter: '{c}%'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            color: '#000'
                        }
                    },
                    data: [{
                            value: current,
                            name: '磁盘使用率',
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        colorStops: [
                                            // !! 在此添加想要的渐变过程色 !!
                                            {
                                                offset: 0,
                                                color: '#E1FFF3'
                                            },
                                            {
                                                offset: 1,
                                                color: '#7AF1CF'
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            name: '剩余', // 实际显示部分是总量-用量
                            value: all - current
                        },
                        {
                            name: 'bottom',
                            value: all,
                            itemStyle: {
                                color: 'transparent'
                            },
                            label: {
                                show: false,
                                position: 'center',
                                formatter: () => ''
                            },
                            cursor: 'default',
                            tooltip: {
                                formatter: () => ''
                            }
                        }
                    ],
                    color: ['#ddd'],
                    itemStyle: {
                        // emphasis: {
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: 'rgba(0, 0, 0, 0.9)'
                        // },
                        // color: function (params) {
                        //     //自定义颜色
                        //     var colorList = [
                        //         '#FAB073'
                        //     ];
                        //     return colorList[params.dataIndex]
                        // }
                    }

                }]
            });
        },
        drawHomeHalfPie3() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homeHalfPie3'));
            let current = 80; // 当前用量
            let all = 100; // 总量

            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}({c}%)'
                },
                legend: {
                    bottom: 20,
                    left: 'center',
                    data: ['内存剩余']
                },
                series: [{
                    center: ['50%', '50%'],
                    radius: ['50%', '60%'],
                    startAngle: 180,
                    name: '内存',
                    type: 'pie',
                    label: {
                        show: false,
                        position: 'center',
                        formatter: '{c}%'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            color: '#000'
                        }
                    },
                    data: [{
                            value: current,
                            name: '使用率',
                            itemStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        colorStops: [
                                            // !! 在此添加想要的渐变过程色 !!
                                            {
                                                offset: 0,
                                                color: '#FEDBCF'
                                            },
                                            {
                                                offset: 1,
                                                color: '#FEB96B'
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            name: '内存剩余', // 实际显示部分是总量-用量
                            value: all - current
                        },
                        {
                            name: 'bottom',
                            value: all,
                            itemStyle: {
                                color: 'transparent'
                            },
                            label: {
                                show: false,
                                position: 'center',
                                formatter: () => ''
                            },
                            cursor: 'default',
                            tooltip: {
                                formatter: () => ''
                            }
                        }
                    ],
                    color: ['#ddd'],
                    itemStyle: {
                        // emphasis: {
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: 'rgba(0, 0, 0, 0.9)'
                        // },
                        // color: function (params) {
                        //     //自定义颜色
                        //     var colorList = [
                        //         '#FAB073'
                        //     ];
                        //     return colorList[params.dataIndex]
                        // }
                    }

                }]
            });
        },
        drawHomeBar1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('homeBar1'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: ''
                },
                legend: { //可过滤父标题
                    left: 'left',
                    data: ['JOB上限值', 'JOB运行数量', 'JOB预警值']
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    axisLabel: {
                        color: '#8e8e8e',
                        fontSize: '9'
                    },
                    /*改变x轴颜色*/
                    axisLine: {
                        lineStyle: {
                            color: '#ccc',
                            width: 1, //这里是为了突出显示加上的
                        }
                    },
                    data: this.schedulerData.label
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
                series: [ //整体数据源
                    {
                        name: 'JOB上限值',
                        type: 'bar',
                        data: this.schedulerData.MAX_JOB_NUM,
                        itemStyle: {
                            normal: {
                                color: '#9DBCFB'
                            }
                        }
                    },
                    {
                        name: 'JOB运行数量',
                        type: 'bar',
                        data: this.schedulerData.MY_JOB_NUM,
                        itemStyle: {
                            normal: {
                                color: '#9AEDCC'
                            }
                        }
                    },
                    {
                        name: 'JOB预警值',
                        type: 'bar',
                        data: this.schedulerData.ALARM_JOB_NUM,
                        itemStyle: {
                            normal: {
                                color: '#F8C570'
                            }
                        }
                    }
                ]
            });
        },
        drawBar3d1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('bar3d1'))
            let _this = this;
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    formatter(params) {
                        let resY = _this.bar3dData.yLine[params.value[1]]
                        let resX = params.value[0]
                        let resZ = params.value[2]
                        return `x: ${resX}<br />y: ${resY}<br />z: ${resZ}`
                    }
                },
                visualMap: {
                    max: 1000,
                    inRange: {
                        color: this.bar3dData.colorList
                    },
                    left: 0,
                    bottom: '20%',
                    padding: 0
                },
                xAxis3D: {
                    type: 'category',
                    data: this.bar3dData.xLine
                },
                yAxis3D: {
                    type: 'category',
                    data: this.bar3dData.yLine
                },
                zAxis3D: {
                    type: 'value'
                },
                grid3D: {
                    left: '2%',
                    top: -40,
                    bottom: 0,
                    right: 20,
                    boxWidth: 300,
                    boxDepth: 60,
                    viewControl: {
                        // projection: 'orthographic'
                    },
                    light: {
                        // main: {
                        //     intensity: 1.2,
                        //     shadow: true
                        // },
                        // ambient: {
                        //     intensity: 0.3
                        // }
                    }
                },
                series: [{
                    type: 'bar3D',
                    data: this.bar3dData.dataList.map(function (item) {
                        return {
                            value: [item[0], item[1], item[2]],
                        }
                    }),
                    shading: 'lambert',
                    label: {
                        textStyle: {
                            fontSize: 14,
                            borderWidth: 1
                        }
                    },

                    emphasis: {
                        label: {
                            textStyle: {
                                fontSize: 14,
                                // color: '#900'
                            }
                        },
                        itemStyle: {
                            color: '#A2FCD8'
                        }
                    }
                }]
            });
            myChart.on('click', (e) => {
                this.galleryHourData.instance = this.bar3dData.yLine[e.value[1]]
                this.galleryHourData.hour = e.value[0]
                this.getModelDataByMinute();
            });
        },
        drawGallery1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('gallery1'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: `分钟维度调度计数(第${this.galleryHourData.hour}小时)`,
                    textStyle: {
                        fontSize: 16
                    }
                },
                backgroundColor: "#fff",
                grid: {
                    left: '1%',
                    top: '18%',
                    bottom: '12%',
                    right: '1%'
                },
                xAxis: {
                    data: this.galleryHourData.xLine,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 129, 109, 0.1)',
                            width: 1 //这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999',
                            fontSize: 12
                        }
                    }
                },
                yAxis: [{
                    splitNumber: 2,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 129, 109, 0.1)',
                            width: 1 //这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: 'rgba(255,255,255,.5)'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 129, 109, 0.1)',
                            width: 0.5,
                            type: 'dashed'
                        }
                    }
                }],
                series: [{
                    name: 'hill',
                    type: 'pictorialBar',
                    barCategoryGap: '0%',
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                    label: {
                        show: true,
                        position: 'top',
                        distance: 15,
                        color: '#DB5E6A',
                        fontWeight: 'bolder',
                        fontSize: 12,
                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                        offset: 0,
                                        color: 'rgba(232, 94, 106, .8)' //  0%  处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(232, 94, 106, .1)' //  100%  处的颜色
                                    }
                                ],
                                global: false //  缺省为  false
                            }
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: this.galleryHourData.yLine,
                    z: 10
                }]
            });
            myChart.on('click', (e) => {
                this.galleryMinuteData.minute = e.dataIndex
                this.getModelDataBySecond();
            });
        },
        drawGallery2() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('gallery2'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: `秒维度调度计数(第${this.galleryHourData.hour}小时${this.galleryMinuteData.minute}分)`,
                    textStyle: {
                        fontSize: 16
                    }
                },
                backgroundColor: "#fff",
                grid: {
                    left: '1%',
                    top: '18%',
                    bottom: '12%',
                    right: '1%'
                },
                xAxis: {
                    data: this.galleryMinuteData.xLine,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 129, 109, 0.1)',
                            width: 1 //这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999',
                            fontSize: 12
                        }
                    }
                },
                yAxis: [{
                    splitNumber: 2,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 129, 109, 0.1)',
                            width: 1 //这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: 'rgba(255,255,255,.5)'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 129, 109, 0.1)',
                            width: 0.5,
                            type: 'dashed'
                        }
                    }
                }],
                series: [{
                    name: 'hill',
                    type: 'pictorialBar',
                    barCategoryGap: '0%',
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                    label: {
                        show: true,
                        position: 'top',
                        distance: 15,
                        color: '#DB5E6A',
                        fontWeight: 'bolder',
                        fontSize: 12,
                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                        offset: 0,
                                        color: 'rgba(232, 94, 106, .8)' //  0%  处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(232, 94, 106, .1)' //  100%  处的颜色
                                    }
                                ],
                                global: false //  缺省为  false
                            }
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: this.galleryMinuteData.yLine,
                    z: 10
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
