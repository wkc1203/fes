import React from 'react';
import { connect } from 'dva';
// import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button, Rate } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../../utils/utils';
import moment from 'moment';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
  } from "bizcharts";
import '../style.less';
const Option = Select.Option;
const { RangePicker } = DatePicker;
class docanalysisdetil extends React.Component {
    state={
        detailData:[],
        detailData1:[],
        detailData2:[],
        // detailData3:[],

        type1:'',
        granularity1:'all',
        startDate1: '',
        endDate1: '',
        dates1: [
        //   moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
        //   moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        showdata1:false,

        granularity2:'all',
        startDate2: '',
        endDate2: '',
        dates2: [
        //   moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
        //   moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        showdata2:false,


        startDate3: '',
        endDate3: '',
        dates3: [
        //   moment(formatDate(new Date(new Date() - (5 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
        //   moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        granularity3:'day',
        dayNum3:'',
        type3:'',
        status3:'99',
        showdata3:false

    }

    componentDidMount(){
        // console.log(this.props)
        this.getdata(1)
        this.getdata(2)
        this.inquirytable()
        this.inquiryChart()
    }

    getdata=(type,type1='',dayNum='all',startDate='',endDate='')=>{
        const { dispatch ,location} = this.props;
        let payload={}
        if(type==1){
            payload={doctorId:location.query.doctorId,hisId:sessionStorage.getItem('hisId'),}

            // dispatch({
            // type: 'docanalysisdetil/inquiryConfig',
            // payload,})

        }else if(type==2){
            payload={
                hisId:sessionStorage.getItem('hisId'),
                doctorId:location.query.doctorId,
                type:type1,
                dayNum:dayNum,
                startDate:startDate?startDate+ ' 00:00:00':'',
                endDate:endDate?endDate+' 23:59:59':'',
            }
        }

        dispatch({
            type: 'docanalysisdetil/getdoctoranalysisstatistics',
            payload,
            callback:(data)=>{
                // console.log(data.recordList,111)
                if(type==1){
                    if(data.recordList.length>0){
                        const data_1 = data.recordList.map((item,key)=>{
                            return {
                                key:key+1,
                                doctorName:item.doctorName,
                                funsNum:item.funsNum,
                                inquirySum:item.inquirySum,
                                // noReplyNum:item.noReplyNum,
                                // replyTime:item.replyTime,
                                score_avg:parseFloat(item.score_avg),
                                total_fee:'￥'+(item.total_fee / 100).toFixed(2),

                            }
                        })
                        this.setState({
                            detailData:data_1
                        })
                    }
          
                }else if(type==2){
                    console.log('this.props........',this.props)
                    if(data.recordList.length>0){

                       const data1 = data.recordList.map((item,key)=>{
                                return {
                                    key:key+1,
                                    inquirySum:item.inquirySum,
                                    noReplyNum:item.noReplyNum,
                                    replyTime:item.replyTime,
                                    score_avg:parseFloat(item.score_avg),
                                    total_fee:'￥'+(item.total_fee / 100).toFixed(2),
                                    maxInquiry:item.maxInquiry,
                                }
                        })
                        // console.log(data2)
                        this.setState({
                            detailData1:data1
                        }) 

                    }


                }


            }
        });
    }

    changeType1=(val)=>{
        // console.log(val)
        this.setState({
            type1:val
        },()=>{
            this.getdata(2,val)
        })

    }

    changeTimeLimit1=(val)=>{
        // console.log(val)


        if(val==='zdy'){
            this.setState({
                showdata1:true
            })
        }else{
            this.setState({
                showdata1:false,
                granularity1:val
            },()=>{
                this.getdata(2,'',val)
            })
        }

    }

    changeTableDate1=()=>{
        // console.log(this.state.startDate1,this.state.endDate1)
        this.getdata(2,'','',this.state.startDate1,this.state.endDate1)

    }


    inquirytable=()=>{
        const { dispatch ,location} = this.props;

        dispatch({
            type: 'docanalysisdetil/getinquirytypestatistics',
            payload:{
                platformId:sessionStorage.getItem('hisId'),
                doctorId:location.query.doctorId,
                dayNum:this.state.granularity2,
                startDate:this.state.startDate2?this.state.startDate2+' 00:00:00':'',
                endDate:this.state.endDate2?this.state.endDate2+' 23:59:59':'',
            },
            callback:(data)=>{
                // console.log(data)
                let dataT={
                    key:1,
                    Consultation_tw:0,
                    Consultation_dh:0,
                    Consultation_sp:0,
                }
                data.map((item,key)=>{
                    if(item.type==='1'){
                        dataT.Consultation_tw = item.totalSum ||0;
                    }else if(item.type==='2'){
                        dataT.Consultation_dh = item.totalSum ||0;

                    }else if(item.type==='3'){
                        dataT.Consultation_sp = item.totalSum ||0;
                    }
                })
                dataT.inquirySum = dataT.Consultation_tw + dataT.Consultation_dh + dataT.Consultation_sp;
                // console.log(dataT)


                this.setState({
                    detailData2:[dataT]
                }) 
            }
        })

    }

    changeTimeLimit2=(val)=>{

        if(val==='zdy'){
            this.setState({
                showdata2:true
            })
        }else{
            this.setState({
                granularity2:val,
                showdata2:false
    
            },()=>{
                this.inquirytable()
            })
            
        }

    }

    changeTableDate2=()=>{

    this.setState({
            granularity2:'',
        },()=>{
            this.inquirytable()
        })
    }


    inquiryChart=()=>{
        const { dispatch, location} = this.props;
        dispatch({ 
            type: 'docanalysisdetil/getinquirytotalstatistics' ,
            payload:{
                hisId: sessionStorage.getItem('hisId'),
                platformId: sessionStorage.getItem('hisId'),
                doctorId:location.query.doctorId,
                startDate:this.state.startDate3?this.state.startDate3+' 00:00:00':'',
                endDate:this.state.endDate3?this.state.endDate3+' 23:59:59':'',
                status:this.state.status3,
                type:this.state.type3,
                dayNum:this.state.dayNum3,
                granularity:this.state.granularity3

            }
        });
    }

    changeChartStatus=(val)=>{
        // console.log(val)
        this.setState({
            status3:val
        },()=>{
            this.inquiryChart()
        })
    }

    changeChartType=(val)=>{
        this.setState({
            type3:val
        },()=>{
            this.inquiryChart()
        })
    }

    changeChartTime=(val)=>{
        // console.log(val)
        if(val==='zdy'){
            this.setState({
                showdata3:true
            })
        }else{
            this.setState({
                dayNum3:val,
                showdata3:false
            },()=>{
                this.inquiryChart()
            })
        }
        
    }

    changeChartDate3=()=>{
        this.setState({
            dayNum3:''
        },()=>{
            this.inquiryChart()
        })
    }

    getchartdata=()=>{
        const { modelData = {} } = this.props;
        const { chartdata: data = [] } = modelData;
        // console.log(data)
        const cols = {
            'totalSum': { min: 0,tickCount:data.length==1?2:5},
            'dt': {
              range: [0, 1],
            }
          };
        return { data, cols };
    }


    changeDate1 = (dates, dateStrings) => {
        this.setState({
          dates1:dates,
          startDate1: dateStrings[0],
          endDate1: dateStrings[1],
        });
      }
    
    changeDate2 = (dates, dateStrings) => {
    this.setState({
        dates2:dates,
        startDate2: dateStrings[0],
        endDate2: dateStrings[1],
    });
    }

    changeDate3 = (dates, dateStrings) => {
    this.setState({
        dates3:dates,
        startDate3: dateStrings[0],
        endDate3: dateStrings[1],
    });
    }

    disabledDate =(current)=> {
        return current && current.valueOf() > Date.now();
    }

    render(){
        const detailColumns = [
              {
                title: '医生',
                dataIndex: 'doctorName',
                key: 'doctorName',
              },
              {
                title: '累积咨询',
                dataIndex: 'inquirySum',
                key:'inquirySum'
              },
              {
                title: '粉丝数',
                dataIndex: 'funsNum',
                key:'funsNum'
              },
              {
                title: '满意度',
                dataIndex: 'score_avg',
                key:'score_avg',
                render: (item) => {
                  return (
                      <Rate disabled value={ parseFloat(item) || 0} />
                  );
                }
              },
              {
                title: '总收入',
                dataIndex: 'total_fee',
                key:'total_fee'
              },
        ]

        const detailColumns1 = [
            {
              title: '咨询条数',
              dataIndex: 'inquirySum',
              key: 'inquirySum',
            },
            {
              title: '超时咨询',
              dataIndex: 'noReplyNum',
              key:'noReplyNum'
            },
            {
              title: '平均回复时长',
              dataIndex: 'replyTime',
              key:'replyTime'
            },
            {
                title: '待回复上限',
                dataIndex: 'maxInquiry',
                key:'maxInquiry'
              },
            {
              title: '满意度',
              dataIndex: 'score_avg',
              key:'score_avg',
              render: (item) => {
                return (
                    <Rate disabled value={ parseFloat(item) || 0} />
                );
              }
            },
            {
              title: '总收入',
              dataIndex: 'total_fee',
              key:'total_fee'
            },
      ]


      const detailColumns2 = [
        {
          title: '全部条数',
          dataIndex: 'inquirySum',
          key: 'inquirySum',
        },
        {
          title: '图文咨询',
          dataIndex: 'Consultation_tw',
          key:'Consultation_tw'
        },
        {
          title: '电话咨询',
          dataIndex: 'Consultation_dh',
          key:'Consultation_dh'
        },
        {
          title: '视频咨询',
          dataIndex: 'Consultation_sp',
          key:'Consultation_sp'
        },
  ]

    const getchartdata = this.getchartdata();

  
        return(
            <div className="deptanalysisdetail">
                <div className="bcfff pa20 mb16">
                    <h4><b>基础信息</b></h4>
                    <Table
                        columns={detailColumns}
                        dataSource={this.state.detailData}
                        pagination={false} 
                    />
                </div>

                <div className="bcfff pa20 mb16">
                    <h4>
                        <b>咨询情况</b> 
                        <Select
                            className="mlr25"
                            size="large"
                            defaultValue={this.state.type1}
                            style={{width:120}}
                            onChange={value=>this.changeType1(value)}
                        >
                            <Option value="">全部咨询</Option>
                            <Option value="1">图文咨询</Option>
                            <Option value="2">电话咨询</Option>
                            <Option value="3">视频咨询</Option>
                        </Select>

                        <Select
                            size="large"
                            defaultValue={this.state.granularity1}
                            style={{width:120}}
                            onChange={value=> this.changeTimeLimit1(value)}
                        >
                            <Option value="yesterday">昨日</Option>
                            <Option value="week">上周</Option>
                            <Option value="month">上个月</Option>
                            <Option value="season">上季度</Option>
                            <Option value="all">全部</Option>
                            <Option value="year">去年</Option>
                            <Option value="zdy">自定义时间</Option>

                        </Select>
                        {
                            this.state.showdata1?
                            <span>
                        <i className="line"></i>

                        <RangePicker size="large" 
                            disabledDate={this.disabledDate}
                            value={this.state.dates1}
                             
                            onChange={this.changeDate1} locale={locale} />

                        <Button className="ml25" size="large" type="primary" onClick={this.changeTableDate1}>确 定</Button>
                        </span>
                        :''}
                    </h4>

                    <Table
                        columns={detailColumns1}
                        dataSource={this.state.detailData1}
                        pagination={false}
                    />

                </div>

                <div className="bcfff pa20 mb16">
                    <h4>
                        <b>咨询条数</b>
                        <Select
                            className='ml25'
                            size="large"
                            defaultValue="all"
                            style={{width:120}}
                            onChange={value=> this.changeTimeLimit2(value)}
                        >
                            <Option value="yesterday">昨日</Option>
                            <Option value="week">上周</Option>
                            <Option value="month">上个月</Option>
                            <Option value="season">上季度</Option>
                            <Option value="all">全部</Option>
                            <Option value="year">去年</Option>
                            <Option value="zdy">自定义时间</Option>

                        </Select>
                        {
                            this.state.showdata2?
                            <span>
                        <i className="line"></i>

                        <RangePicker size="large" 
                            disabledDate={this.disabledDate}
                            value={this.state.dates2}
                             
                            onChange={this.changeDate2} locale={locale} />

                        <Button className="ml25" size="large" type="primary" onClick={this.changeTableDate2}>确 定</Button>
                        </span>
                        :''}
                    </h4>
                    <Table
                        columns={detailColumns2}
                        dataSource={this.state.detailData2}
                        pagination={false}
                    />
                </div>

                <div className="bcfff pa20 mb16">
                    <h4>
                        <b>咨询分析</b>
                        <Select
                            className="ml25"
                            size="large"
                            defaultValue={this.state.status3}
                            style={{width:120}}
                            onChange={value=>this.changeChartStatus(value)}
                        >
                            <Option value="99">累计咨询</Option>
                            <Option value="">新增咨询</Option>
                            <Option value="1">已回复咨询</Option>
                            <Option value="3">已结束咨询</Option>
                            <Option value="4">已超时咨询</Option>
                            <Option value="5">已退款咨询</Option>

                        </Select>

                        <Select
                            className="mlr25"
                            size="large"
                            defaultValue=""
                            style={{width:120}}
                            onChange={value=>this.changeChartType(value)}
                        >
                            <Option value="">全部咨询</Option>
                            <Option value="1">图文咨询</Option>
                            <Option value="2">电话咨询</Option>
                            <Option value="3">视频咨询</Option>
                        </Select>

                        <Select
                            size="large"
                            defaultValue={this.state.dayNum3}
                            style={{width:120}}
                            onChange={value=> this.changeChartTime(value)}
                        >   
                            <Option value="">请选择时间</Option>
                            <Option value="yesterday">昨日</Option>
                            <Option value="week">上周</Option>
                            <Option value="month">上个月</Option>
                            <Option value="season">上季度</Option>
                            <Option value="all">全部</Option>
                            <Option value="year">去年</Option>
                            <Option value="zdy">自定义时间</Option>

                        </Select>
                        {
                            this.state.showdata3?
                            <span>
                        <i className="line"></i>

                        <RangePicker size="large" 
                            disabledDate={this.disabledDate}
                            value={this.state.dates3}
                             
                            onChange={this.changeDate3} locale={locale} />

                            <span className="ml25">粒度：</span>
                            <Select
                            size="large"
                            defaultValue="day"
                            style={{width:100}}
                            onChange={value=>this.setState({granularity3:value})}
                            >
                            <Option value="day">日</Option>
                            <Option value="week">周</Option>
                            <Option value="month">月</Option>
                            </Select>

                        <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate3}>确 定</Button>
                        </span>
                        :''}
                    </h4>

                    <div>
                    <Chart placeholder  height={400} padding='auto' data={getchartdata.data} scale={getchartdata.cols} width={800}>
                  <Axis name="dt"  />
                  <Axis name="totalSum"  />

                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom type="line" position="dt*totalSum"  shape="smooth" size={2} 
                    tooltip={['dt*totalSum', (dt, totalSum) => {
                      return {
                        name: '咨询数',
                        value: totalSum
                      };
                    }]}
                    
                  />
                  <Geom
                    type="point"
                    position="dt*totalSum"
                    size={4}
                    shape={"circle"}
                    style={{
                      stroke: "#fff",
                      lineWidth: 1
                    }}
                    tooltip={['dt*totalSum', (dt, totalSum) => {
                        return {
                          name: '咨询数',
                          value: totalSum
                        };
                      }]}
                  />
                </Chart>

                    </div>

                </div>


            </div>
        )
    }
    
}
export default connect((state) => {
    const { docanalysisdetil = {} } = state;
    return {
      modelData: docanalysisdetil,
    };
  })(docanalysisdetil);