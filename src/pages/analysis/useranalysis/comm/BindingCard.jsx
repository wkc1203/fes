import React from 'react';
import { connect } from 'dva';
import { Select , DatePicker ,Button} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../../utils/utils';
import moment from 'moment';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  } from "bizcharts";
// import DataSet from "@antv/data-set";

const Option = Select.Option;
const { RangePicker } = DatePicker;
// const { DataView } = DataSet;



class Widget extends React.Component {
  state = {
        startDate1: formatDate(new Date(new Date() - (7 * 24 * 60 * 60 * 1000))),
        endDate1: formatDate(new Date()),
        dates1: [
          moment(formatDate(new Date(new Date() - (7 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        dayNum1:'',
        getnum:'',
        // granularity2:'day',


        startDate2: formatDate(new Date(new Date() - (6 * 24 * 60 * 60 * 1000))),
        endDate2: formatDate(new Date()),
        dates2: [
          moment(formatDate(new Date(new Date() - (6 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        dayNum2:'zdy',
        granularity2:'day',
        showdata2:true,


        startDate3: formatDate(new Date(new Date() - (6 * 24 * 60 * 60 * 1000))),
        endDate3: formatDate(new Date()),
        dates3: [
          moment(formatDate(new Date(new Date() - (6 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        dayNum3:'zdy',
        granularity3:'day',
        showdata3:true,

  }

  componentDidMount() {
    this.activeNum1()
    this.activeChart2()
    this.activeChart3()
    
  }

  activeNum1=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'userAnalysis/getbindusernumstatistics' ,
      payload:{
                // hisId: sessionStorage.getItem('hisId'),
                platformId:sessionStorage.getItem('hisId'),
                dayNum:this.state.dayNum1,
                startDate:this.state.startDate1?this.state.startDate1+' 00:00:00':'',
                endDate:this.state.endDate1?this.state.endDate1+' 23:59:59':'',
            },
      callback:(data)=>{
        // console.log(data)
        this.setState({
          getnum:data.totalSum || 0
        })
      }
    });
  }

  activeChart2=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'userAnalysis/getbinduseranalysisstatistics' ,
      payload:{
                // hisId: sessionStorage.getItem('hisId'),
                platformId:sessionStorage.getItem('hisId'),
                dayNum:this.state.dayNum2,
                granularity:this.state.granularity2,
                startDate:this.state.startDate2?this.state.startDate2+' 00:00:00':'',
                endDate:this.state.endDate2?this.state.endDate2+' 23:59:59':'',
            }
    });
  }

  activeChart3=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'userAnalysis/getnewbindusernumstatistics' ,
      payload:{
            platformId:sessionStorage.getItem('hisId'),
            dayNum:this.state.dayNum3,
            granularity:this.state.granularity3,
            startDate:this.state.startDate3?this.state.startDate3+' 00:00:00':'',
            endDate:this.state.endDate3?this.state.endDate3+' 23:59:59':'',
          }
    });
  }


  getChart1 = () => {
    const { BingCardData1: data = [] } = this.props.modelData;
    // const { inquirytotal: data = [] } = modelData;
    // console.log(data,this.props)
    const cols = {
      'totalSum': { min: 0,tickCount:data.length==1?2:5},
      'dt': {
        range: [0, 1],
      }
    };
    return { data, cols };
  }

  getChart2 = () => {
    const { BingCardData2: data = [] } = this.props.modelData;
    // const { inquirytotal: data = [] } = modelData;
    // console.log(data,'chart2')
    const cols = {
      'totalSum': { min: 0,tickCount:data.length==1?2:5},
      'dt': {
        range: [0, 1],
      }
    };
    return { data, cols };
  }


  changeTime1=(val)=>{
    this.setState({
      dayNum1:val,
    },()=>{
      this.activeNum1()
    })
  }

  changeChartDate1=()=>{
    this.setState({
      dayNum1:'',
    },()=>{
      this.activeNum1()
    })
  }

  changeTime2=(val)=>{
    if(val==='zdy'){
      this.setState({
        showdata2:true
      })
    }else{
      this.setState({
        dayNum2:val,
        showdata2:false

      },()=>{
        this.activeChart2()
      })
    }

  }

  changeChartDate2=()=>{
    this.setState({
      dayNum2:'',
    },()=>{
      this.activeChart2()
    })
  }

  changeTime3=(val)=>{
    if(val==='zdy'){
      this.setState({
        showdata3:true
      })
    }else{
      this.setState({
        dayNum3:val,
        showdata3:false

      },()=>{
        this.activeChart3()
      })
    }
  }

  changeChartDate3=()=>{
    this.setState({
      dayNum3:'',
    },()=>{
      this.activeChart3()
    })
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

  render() {

    const getChart1 = this.getChart1();
    const getChart2 = this.getChart2();

    return (
      <div className="Box">
            <div className="pa20 bcfff registerTit mb16">
                <div>
                  <Select
                        size="large"
                        defaultValue={this.state.dayNum1}
                        style={{width:120}}
                        onChange={value=> this.changeTime1(value)}
                      >
                        <Option value="yesterday">昨日</Option>
                        <Option value="week">上周</Option>
                        <Option value="month">上月</Option>
                        <Option value="season">上季度</Option>
                        <Option value="all">全部</Option>
                        <Option value="year">去年</Option>
                        <Option value="">自定义时间</Option>

                  </Select>
                  <RangePicker className="mlr25"  size="large" 
                      disabledDate={this.disabledDate}
                      value={this.state.dates1}
                       
                      onChange={this.changeDate1} locale={locale} />
                  <Button size="large" type="primary" onClick={this.changeChartDate1}>确 定</Button>
                </div>

                <div className="usernumr">
                    用户数：<span>{this.state.getnum}</span>
                </div>

            </div>
            {/* 2 */}
            <div className="ChartBox mb16">
                <div className="filter">
                    <b>绑卡分析</b>
                    <Select
                      size="large"
                      defaultValue="zdy"
                      style={{width:120}}
                      onChange={value=> this.changeTime2(value)}
                    >
                      <Option value="yesterday">昨日</Option>
                      <Option value="week">上周</Option>
                      <Option value="month">上月</Option>
                      <Option value="season">上季度</Option>
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

                    <span className="ml25">粒度：</span>
                    <Select
                      size="large"
                      defaultValue="day"
                      style={{width:100}}
                      onChange={value=>this.setState({granularity2:value})}
                    >
                      <Option value="day">日</Option>
                      <Option value="week">周</Option>
                      <Option value="month">月</Option>
                    </Select>

                    <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate2}>确 定</Button>
                        </span>      
                        :''
                      }
                    

                </div>
                
                <div className="ChartBox">
                <Chart placeholder  height={400} padding='auto' data={getChart1.data} scale={getChart1.cols} width={800}>
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
                        name: '总用户数',
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
                        name: '总用户数',
                        value: totalSum
                      };
                    }]}
                  />
                </Chart>
                </div>
            </div>

            {/* 3 */}

            <div className="ChartBox">
                <div className="filter">
                    <b>新增绑卡分析</b>
                    <Select
                      size="large"
                      defaultValue="zdy"
                      style={{width:120}}
                      onChange={value=> this.changeTime3(value)}
                    >
                      <Option value="yesterday">昨日</Option>
                      <Option value="week">上周</Option>
                      <Option value="month">上月</Option>
                      <Option value="season">上季度</Option>
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
                      :''
                    }
                    

                </div>
                
                <div className="ChartBox">
                <Chart placeholder  height={400} padding='auto' data={getChart2.data} scale={getChart2.cols} width={800}>
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
                        name: '总用户数',
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
                        name: '总用户数',
                        value: totalSum
                      };
                    }]}
                  />
                </Chart>
                </div>
            </div>
            

      </div>
    );
  }
}
export default connect((state) => {
  const { userAnalysis = {} } = state;
  return {
    modelData: userAnalysis,
  };
})(Widget);
