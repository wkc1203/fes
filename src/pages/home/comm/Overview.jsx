import React from 'react';
import { connect } from 'dva';
import { Select , DatePicker ,Button} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import { formatDate } from '../../../utils/utils';
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
import DataSet from "@antv/data-set";
console.log("l",locale)
const Option = Select.Option;
const { RangePicker } = DatePicker;
// const { DataView } = DataSet;



class Widget extends React.Component {
  state = {
        dataNum:[
          {name:"总访问用户数",num:''},
          {name:"总注册用户数",num:''},
          {name:"总绑卡用户数",num:''}
        ],
        
        //chart1
        startDate1: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
        endDate1: formatDate(new Date()),
        dates1: [
          moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        granularity1:'day',//粒度
        showGranularity1:false,
        showdata1:false,

        //chart2
        startDate2: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
        endDate2: formatDate(new Date()),
        dates2: [
          moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        showdata2:false,

        //chart3
        startDate3: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
        endDate3: formatDate(new Date()),
        dates3: [
          moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        showdata3:false,

        //chart4
        startDate4: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
        endDate4: formatDate(new Date()),
        dates4: [
          moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        granularity4:'day',//粒度
        showdata4:false,

        //chart5
        startDate5: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
        endDate5: formatDate(new Date()),
        dates5: [
          moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        granularity5:'day',//粒度
        showdata5:false,

  }

  //触发api
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'home/getTotalNum' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId: sessionStorage.getItem('hisId'),},
      callback: (res) => {
        if (res) {
          // console.log(res);
          this.setState({
            dataNum:[
              {name:"总访问用户数",num:res.totalVisitNum},
              {name:"总注册用户数",num:res.totalRegisterNum},
              {name:"总绑卡用户数",num:res.totalBindNum}
            ],
          },()=>{
            // console.log(this.state.dataNum)
          })
        }
      }
   });

    dispatch({ type: 'home/getUserChart' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),dayNum:'lastseven'}});
    dispatch({ type: 'home/getUserSatisfaction' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),dayNum:'lastseven'}});
    dispatch({ type: 'home/getConsultationObj' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),dayNum:'lastseven'}});
    dispatch({ type: 'home/getConsultationAques' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),dayNum:'lastseven'}});
    dispatch({ type: 'home/getDailyincomeStatistics' ,payload:{hisId: sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),dayNum:'lastseven'}});
  }

  //默认新增用户统计
  getUserChart = () => {
    const { modelData = {} } = this.props;
    const { userData: data = [] } = modelData;
    // console.log(data,22222)
    const cols = {
      'totalSum': { min: 0,tickCount:data.length==1?2:5},
      'dt': {
        range: [0, 1],
      }
    };
    return { data, cols };
  }
  
  //筛选显示新增用户统计1
  changeTimeLimit=(value,type)=>{
    // console.log(value,type)
    const { dispatch } = this.props;
    switch(type)
    {
    case 1:
      if(value==='zdy'){
        this.setState({
          showdata1:true
        })
      }else{
        this.setState({
          showdata1:false,
        },()=>{
          dispatch({ type: 'home/getUserChart' ,payload:{hisId: sessionStorage.getItem('hisId'),platformId: sessionStorage.getItem('hisId'), dayNum:value}});
          this.getUserChart();
        })
      }
      break;
    case 2:
    if(value==='zdy'){
      this.setState({
        showdata2:true
        })
      }else{
        this.setState({
          showdata2:false,
        },()=>{
          dispatch({ type: 'home/getUserSatisfaction' ,payload:{hisId: sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'), dayNum:value}});
          this.getUserSatisfaction();
        })
      }

      break;
    case 3:
    if(value==='zdy'){
      this.setState({
        showdata3:true
        })
      }else{
        this.setState({
          showdata3:false,
        },()=>{
          dispatch({ type: 'home/getConsultationObj' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId: sessionStorage.getItem('hisId'), dayNum:value}});
          this.getConsultationObj();
        })
      }

      break;
    case 4:
    if(value==='zdy'){
      this.setState({
        showdata4:true
        })
      }else{
        this.setState({
          showdata4:false,
        },()=>{
          dispatch({ type: 'home/getConsultationAques' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId: sessionStorage.getItem('hisId'), dayNum:value}});
          this.getConsultationAques();
        })
      }


      break;
    case 5:

    if(value==='zdy'){
      this.setState({
        showdata5:true
        })
      }else{
        this.setState({
          showdata5:false,
        },()=>{
          dispatch({ type: 'home/getDailyincomeStatistics' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId: sessionStorage.getItem('hisId'), dayNum:value}});
          this.getDailyincomeStatistics();
        })
      }


      break;
    default:
      break;
    }

  }
  //筛选显示新增用户统计2
  changeChartDate1=()=>{  
    const { dispatch } = this.props;
    dispatch({ type: 'home/getUserChart' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId: sessionStorage.getItem('hisId'),startDate:this.state.startDate1?this.state.startDate1 +' 00:00:00':'',endDate:this.state.endDate1?this.state.endDate1 + ' 23:59:59':'' ,granularity:this.state.granularity1}});
    this.getUserChart();
  }

  changeChartDate2=()=>{  
    const { dispatch } = this.props;
    dispatch({ type: 'home/getUserSatisfaction' ,payload:{hisId: sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),startDate:this.state.startDate2?this.state.startDate2 +' 00:00:00':'',endDate:this.state.endDate2?this.state.endDate2 + ' 23:59:59':''}});
    this.getUserSatisfaction();
  }

  changeChartDate3=()=>{  
    const { dispatch } = this.props;
    dispatch({ type: 'home/getConsultationObj' ,payload:{hisId: sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),startDate:this.state.startDate3?this.state.startDate3 +' 00:00:00':'',endDate:this.state.endDate3?this.state.endDate3 + ' 23:59:59':''}});
    this.getConsultationObj();
  }

  changeChartDate4=()=>{  
    const { dispatch } = this.props;
    dispatch({ type: 'home/getConsultationAques' ,payload:{hisId: sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),startDate:this.state.startDate4?this.state.startDate4 +' 00:00:00':'',endDate:this.state.endDate4?this.state.endDate4 + ' 23:59:59':'',granularity:this.state.granularity4}});
    this.getConsultationAques();
  }

  changeChartDate5=()=>{  
    const { dispatch } = this.props;
    dispatch({ type: 'home/getDailyincomeStatistics' ,payload:{hisId: sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),startDate:this.state.startDate5?this.state.startDate5 +' 00:00:00':'',endDate:this.state.endDate5?this.state.endDate5 + ' 23:59:59':'',granularity:this.state.granularity5}});
    this.getDailyincomeStatistics();
  }

  //时间变更
  changeDate1 = (dates, dateStrings) => {
    this.setState({
      dates1:dates,
      startDate1: dateStrings[0],
      endDate1: dateStrings[1],
      showGranularity1:false
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

  changeDate4 = (dates, dateStrings) => {
    this.setState({
      dates4:dates,
      startDate4: dateStrings[0],
      endDate4: dateStrings[1],
    });
  }

  changeDate5 = (dates, dateStrings) => {
    this.setState({
      dates5:dates,
      startDate5: dateStrings[0],
      endDate5: dateStrings[1],
    });
  }

  //用户满意度
  getUserSatisfaction = () => {
    const { modelData = {} } = this.props;
    const { UserSatisfaction: data = [] } = modelData;
    // console.log(data,'getUserSatisfaction')

    if(data.length>0){
      const SatisfactionData=[]
      let allnum = 0
      data.map((item,key)=>{
        allnum+=item.totalSum
      })
      // console.log(allnum)
      data.map((item,key)=>{
        SatisfactionData.push({level:item.level,totalSum:Math.round(parseFloat(item.totalSum/allnum)*100),total:item.totalSum})
      })
      // console.log(SatisfactionData)

      const { DataView } = DataSet;
      const dv = new DataView();
      dv.source(SatisfactionData).transform({
        type: "percent",
        field: "totalSum",
        dimension: "level",
        as: "percent"
      });
      const cols = {
        percent: {
          formatter: val => {
            val =  parseInt(Math.round(val * 100)) + "%";
            return val;
          }
        }
      };
      // console.log(dv)
      return { dv, cols };
    }else{
      return { dv:[], cols:{} };
    }
  }

  //咨询统计
  getConsultationObj = () => {
    const { modelData = {} } = this.props;
    const { ConsultationObj: data = [] } = modelData;

    if(data.length>0){
      const SatisfactionData=[]
      let allnum = 0
      data.map((item,key)=>{
         
        allnum+=item.totalAmt
      })
      data.map((item,key)=>{
        SatisfactionData.push({level:item.purpose,totalSum:Math.round(parseFloat(item.totalAmt/allnum)*100),total:item.totalAmt})
      })

      const { DataView } = DataSet;
      const dv = new DataView();
      dv.source(SatisfactionData).transform({
        type: "percent",
        field: "totalSum",
        dimension: "level",
        as: "percent"
      });
      const cols = {
        percent: {
          formatter: val => {
            val =  parseInt(Math.round(val * 100)) + "%";
            return val;
          }
        }
      };
       console.log(dv)
      return { dv, cols };
    }else{
      return { dv:[], cols:{} };
    }
  }

//咨询问题总数统计
  getConsultationAques = () => {
    const { modelData = {} } = this.props;
    const { ConsultationAques: data = [] } = modelData;
    // console.log(data)
    const cols = {
      'totalSum': { min: 0},
      'dt': {
        range: [0, 1],
      }
    };
    return { data, cols };

  }

//每日收益统计
getDailyincomeStatistics = () => {
  const { modelData = {} } = this.props;
  const { DailyincomeStatistics: data = [] } = modelData;
   var data1=[];
   console.log("w1",data1)
   if(data.Consultation&&data.Consultation.length>0){
      
    for(var i=0;i<data.Consultation.length;i++){
       data1.push({
         dt:'',
         咨询:'',
         诊疗:''
       })
    }
   }
   if(data.Consultation&&data.Consultation.length>0){
    for(var i=0;i<data.Consultation.length;i++){
      data1[i].dt=data.Consultation[i].dt;
      data1[i].咨询=parseFloat((data.Consultation[i].totalAmt/100).toFixed(2));
    }
   }
   if(data.Diagnosis&&data.Diagnosis.length>0){
    for(var i=0;i<data.Diagnosis.length;i++){
      data1[i].诊疗=parseFloat((data.Diagnosis[i].totalAmt/100).toFixed(2));
    }
   }
   console.log("w",data1)
   const ds = new DataSet();
    const dv = ds.createView().source(data1);
    dv.transform({
      type: "fold",
      fields: ["咨询", "诊疗"],
      // 展开字段集
      key: "city",
      // key字段
      value: "totalAmt" // value字段
    });
    console.log(dv);
    const cols = {
      city: {
        range: [0, 1]
      }
    };


  return { dv, cols };
}

  //无法选中时间
  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }


  render() {
    const getUserChart = this.getUserChart();
    const getUserSatisfaction = this.getUserSatisfaction();
    const getConsultationObj = this.getConsultationObj();
    const getConsultationAques = this.getConsultationAques();
    const getDailyincomeStatistics = this.getDailyincomeStatistics();

    return (
      <div className="OverviewBox">
            <div className="homeflexbc">
                {
                    (this.state.dataNum).map((item, key) => {
                      return <div className="homenum" key={key}><span>{item.name}</span><span>{item.num}</span></div>
                    })
                }
            </div>
            
            {/* 图表1 */}
            <div className="OverviewChartBox">
                <div className="filter">
                    <b>新用户统计</b>
                    <Select
                      size="large"
                      defaultValue="lastseven" 
                      style={{width:120}}
                      onChange={value=> this.changeTimeLimit(value,1)}
                    >
                    <Option value="lastseven">最近一周</Option>
                      <Option value="yesterday">昨日</Option>
                      <Option value="week">上周</Option>
                      <Option value="month">上月</Option>
                      <Option value="season">上季度</Option>
                      <Option value="zdy">自定义时间</Option>

                    </Select>

                    {
                      this.state.showdata1?<span>
                    <i className="line"></i>
                    <RangePicker size="large" 
                      disabledDate={this.disabledDate}
                      value={this.state.dates1}
                      onChange={this.changeDate1} locale={locale.DatePicker} />

                    <span className="ml25">粒度：</span>
                    <Select
                      size="large"
                      defaultValue={this.state.granularity1}
                      value={this.state.granularity1}
                      style={{width:100}}
                      // disabled={this.state.showGranularity1}
                      onChange={value=>this.setState({granularity1:value})}
                    >
                      <Option value="day">日</Option>
                      <Option value="week">周</Option>
                      <Option value="month">月</Option>
                    </Select>

                    <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate1}>确 定</Button>
                      </span>:''
                    }
                </div>
                <div className="ChartBox">
                <Chart placeholder  height={400} padding='auto' data={getUserChart.data} scale={getUserChart.cols} width={800}>
                  {console.log('qqqqqqqqq',getUserChart.data)}
                  {console.log('bbbbbbbbbbbbbbbbbbbb',getUserChart.cols)}
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
                        value: totalSum*1
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
                        value: totalSum*1
                      };
                    }]}
                  />
                </Chart>
                </div>
            </div>
            
            {/* 图表2 */}            
            <div className="OverviewChartBox">
                <div className="filter">
                    <b>用户满意度统计</b>
                    <Select
                      size="large"
                      defaultValue="lastseven"
                      style={{width:120}}
                      onChange={value=> this.changeTimeLimit(value,2)}
                    >
                    <Option value="lastseven">最近一周</Option>

                      <Option value="yesterday">昨日</Option>
                      <Option value="week">上周</Option>
                      <Option value="month">上月</Option>
                      <Option value="season">上季度</Option>
                      <Option value="zdy">自定义时间</Option>

                    </Select>
                    {
                      this.state.showdata2?<span>
                        <i className="line"></i>
                    <RangePicker size="large" 
                      disabledDate={this.disabledDate}
                      value={this.state.dates2} 
                      onChange={this.changeDate2} locale={locale.DatePicker} />

                    <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate2}>确 定</Button>
                      </span>:''
                    }
                    

                </div>
                
                <div className="ChartBox">
                  <Chart
                    placeholder
                    height={400}
                    data={getUserSatisfaction.dv}
                    scale={getUserSatisfaction.cols}
                    padding={[50]}
                    width={800}
                  >
                    <Coord type="theta" radius={0.75} />
                    <Axis name="percent" />
                    <Legend
                      position="right"
                      offsetY={ -120}
                      offsetX={-80}
                    />
                    <Tooltip
                      showTitle={false}
                      itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                      type="intervalStack"
                      position="percent"
                      color="level"
                      tooltip={[
                        "level*percent",
                        (level, percent) => {
                          percent = parseInt(Math.round(percent * 100)) + "%";
                          return {
                            name: level,
                            value: percent
                          };
                        }
                      ]}
                      style={{
                        lineWidth: 1,
                        stroke: "#fff"
                      }}
                    >
                      <Label
                        content="percent"
                        formatter={(val, item) => {
                          return item.point.level + ": " + item.point.total+'人';
                        }}
                      />
                    </Geom>
                  </Chart>
                </div>
            </div>

            {/* 图表3 */}
            <div className="OverviewChartBox">
                <div className="filter">
                    <b>咨询目的统计</b>
                    <Select
                      size="large"
                      defaultValue="lastseven"
                      style={{width:120}}
                      onChange={value=> this.changeTimeLimit(value,3)}
                    >
                    <Option value="lastseven">最近一周</Option>

                      <Option value="yesterday">昨日</Option>
                      <Option value="week">上周</Option>
                      <Option value="month">上月</Option>
                      <Option value="season">上季度</Option>
                      <Option value="zdy">自定义时间</Option>

                    </Select>
                    {
                      this.state.showdata3?<span>
                        <i className="line"></i>
                    <RangePicker size="large" 
                      disabledDate={this.disabledDate}
                      value={this.state.dates3}
                      onChange={this.changeDate3} locale={locale.DatePicker} />

                    <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate3}>确 定</Button>
                      </span>:''
                    }
                    


                </div>
                
                <div className="ChartBox">
                  <Chart
                    placeholder
                    height={400}
                    data={getConsultationObj.dv}
                    scale={getConsultationObj.cols}
                    padding={[50]}
                    width={800}
                  >
                    <Coord type="theta" radius={0.75} />
                    <Axis name="percent" />
                    <Legend
                      position="right"
                      offsetY={ -120}
                      offsetX={-80}
                    />
                    <Tooltip
                      showTitle={false}
                      itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                      type="intervalStack"
                      position="percent"
                      color="level"
                      tooltip={[
                        "level*percent",
                        (level, percent) => {
                          percent = parseInt(Math.round(percent * 100)) + "%";
                          return {
                            name: level,
                            value: percent
                          };
                        }
                      ]}
                      style={{
                        lineWidth: 1,
                        stroke: "#fff"
                      }}
                    >
                      <Label
                        content="percent"
                        formatter={(val, item) => {
                          return item.point.level + ": " + item.point.total+'条';
                        }}
                      />
                    </Geom>
                  </Chart>
                </div>
            </div>

            {/* 图表4 */}
            <div className="OverviewChartBox">
                <div className="filter">
                    <b>咨询问题总数</b>
                    <Select
                      size="large"
                      defaultValue="lastseven"
                      style={{width:120}}
                      onChange={value=> this.changeTimeLimit(value,4)}
                    >
                    <Option value="lastseven">最近一周</Option>

                      <Option value="yesterday">昨日</Option>
                      <Option value="week">上周</Option>
                      <Option value="month">上月</Option>
                      <Option value="season">上季度</Option>
                      <Option value="zdy">自定义时间</Option>

                    </Select>
                    {
                      this.state.showdata4?<span>
                          <i className="line"></i>
                    <RangePicker size="large" 
                      disabledDate={this.disabledDate}
                      value={this.state.dates4}
                      onChange={this.changeDate4} locale={locale.DatePicker} />

                    <span className="ml25">粒度：</span>
                    <Select
                      size="large"
                      defaultValue="day"
                      style={{width:100}}
                      onChange={value=>this.setState({granularity4:value})}
                    >
                      <Option value="day">日</Option>
                      <Option value="week">周</Option>
                      <Option value="month">月</Option>
                    </Select>

                    <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate4}>确 定</Button>
                      </span>:''
                    }
                  

                </div>
                
                <div className="ChartBox">
                <Chart placeholder  height={400} padding='auto' data={getConsultationAques.data} scale={getConsultationAques.cols} width={800}>
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
                        name: '问题总数',
                        value: totalSum*1
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
                        name: '问题总数',
                        value: totalSum*1
                      };
                    }]}
                  />
                </Chart>
                </div>
            </div>

            {/* 图表5 */}
            <div className="OverviewChartBox">
                <div className="filter">
                    <b>每日收益统计</b>
                    <Select
                      size="large"
                      defaultValue="lastseven"
                      style={{width:120}}
                      onChange={value=> this.changeTimeLimit(value,5)}
                    >
                    <Option value="lastseven">最近一周</Option>

                      <Option value="yesterday">昨日</Option>
                      <Option value="week">上周</Option>
                      
                      <Option value="month">上月</Option>
                      <Option value="season">上季度</Option>
                      <Option value="zdy">自定义时间</Option>

                    </Select>
                    {
                      this.state.showdata5?<span>
                        <i className="line"></i>
                    <RangePicker size="large" 
                      disabledDate={this.disabledDate}
                      value={this.state.dates5}
                      onChange={this.changeDate5} locale={locale.DatePicker} />

                    <span className="ml25">粒度：</span>
                    <Select
                      size="large"
                      defaultValue="day"
                      style={{width:100}}
                      onChange={value=>this.setState({granularity5:value})}
                    >
                      <Option value="day">日</Option>
                      <Option value="week">周</Option>
                      <Option value="month">月</Option>
                    </Select>

                    <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate5}>确 定</Button>
                      </span>:''
                    }
                    
                    
                </div>
                
                <div className="ChartBox">
                <Chart placeholder  height={400} padding='auto' data={getDailyincomeStatistics.dv} scale={getDailyincomeStatistics.cols} width={800}>
                  <Axis name="dt"  />
                  <Axis name="totalAmt"  />

                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom 
                  type="line" 
                  position="dt*totalAmt"  
                  shape="smooth" 
                  size={2} 
                  color={"city"}
                  

                    
                  />
                  <Geom
                    type="point"
                    position="dt*totalAmt"
                    size={4}
                    shape={"circle"}
                    color={"city"}
                    style={{
                      stroke: "#fff",
                      lineWidth: 1
                    }}
                    
                  />
                
                </Chart>
                </div>
            </div>
                
      </div>
    );
  }
}
export default connect((state) => {
  const { home = {} } = state;
  return {
    modelData: home,
  };
})(Widget);
