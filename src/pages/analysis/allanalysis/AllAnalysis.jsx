import React from 'react';
import { connect } from 'dva';
import {Table, Input, Select, DatePicker, Button, Modal, message ,Radio } from 'antd';
import {Drawer } from 'antd'
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
import './style.less';


const Option = Select.Option;
const { RangePicker } = DatePicker;

class AllAnalysis extends React.Component {
  state = {
    //chart1
    startDate1: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
    endDate1: formatDate(new Date()),
    dates1: [
      moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
    granularity1:'day',
    dayNum1:'yesterday',
    status1:'99',
    type1:'',
    showdate1:false,

    //chart2
    startDate2: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
    endDate2: formatDate(new Date()),
    dates2: [
      moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
    dayNum2:'yesterday',
    showdate2:false,


    //chart3
    startDate3: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
    endDate3: formatDate(new Date()),
    dates3: [
      moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
    dayNum3:'yesterday',
    type3:'',
    showdate3:false,

  }

  componentDidMount() {
    this.activeChart1()
    this.activeChart2()
    this.activeChart3()
  }

  activeChart1=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'allanalysis/getinquirytotalstatistics' ,
      payload:{
                hisId: sessionStorage.getItem('hisId'),
                platformId:sessionStorage.getItem('hisId'),
                dayNum:this.state.dayNum1,
                startDate:this.state.startDate1?this.state.startDate1+' 00:00:00':'',
                endDate:this.state.endDate1?this.state.endDate1+' 23:59:59':'',
                type:this.state.type1,
                granularity:this.state.granularity1,
                status:this.state.status1,
            }
    });
  }

  getChart1 = () => {
    const { inquirytotal: data = [] } = this.props;
    // const { inquirytotal: data = [] } = modelData;
    // console.log(data,'chart1')
    const cols = {
      'totalSum': { min: 0,tickCount:data.length==1?2:5},
      'dt': {
        range: [0, 1],
      }
    };
    return { data, cols };
  }

  changeStatus1=(val)=>{
      this.setState({
        status1:val,

      },()=>{
        this.activeChart1()
      })
  }

  changeType1=(val)=>{
      this.setState({
        type1:val,
        
      },()=>{
        this.activeChart1()
      })
  }

  changeTime1=(val)=>{

    if(val==='zdy'){
      this.setState({
        showdate1:true,
        })
    }else{
      this.setState({
        dayNum1:val,
        showdate1:false,

      },()=>{
        this.activeChart1()
      })
    }

  }

  changeChartDate1=()=>{
    this.setState({
      type1:99,
      dayNum1:'',
      type1:''
    },()=>{
      this.activeChart1()
    })
  }

  activeChart2=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'allanalysis/getinquirytypestatistics' ,
      payload:{
                hisId: sessionStorage.getItem('hisId'),
                platformId:sessionStorage.getItem('hisId'),
                dayNum:this.state.dayNum2,
                startDate:this.state.startDate2?this.state.startDate2+' 00:00:00':'',
                endDate:this.state.endDate2?this.state.endDate2+' 23:59:59':'',
            }
    });
  }

  getChart2 = () => {
    const { inquirytype: data = [] } = this.props;
    // const { inquirytotal: data = [] } = modelData;
    // console.log(data,'chart2')

    if(data.length>0){
      const SatisfactionData=[]
      let allnum = 0
      data.map((item,key)=>{
        allnum+=item.totalSum
      })
      // console.log(allnum)
      data.map((item,key)=>{
        let typetext = ''
        if(item.type==='1'){
          typetext='图文咨询'
        }else if(item.type==='2'){
          typetext='电话咨询'
        }else if(item.type==='3'){
          typetext='视频咨询'
        }
        SatisfactionData.push({level:typetext,totalSum:Math.round(parseFloat(item.totalSum/allnum)*100),total:item.totalSum})
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

  changeTime2=(val)=>{

    if(val==='zdy'){
      this.setState({
        showdate2:true,
        })
    }else{
      this.setState({
        dayNum2:val,
        showdate2:false,

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


  activeChart3=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'allanalysis/getinquirygoalstatistics' ,
      payload:{
                hisId: sessionStorage.getItem('hisId'),
                platformId:sessionStorage.getItem('hisId'),
                dayNum:this.state.dayNum3,
                type:this.state.type3,
                startDate:this.state.startDate3?this.state.startDate3+' 00:00:00':'',
                endDate:this.state.endDate3?this.state.endDate3+' 23:59:59':'',
            }
    });
  }

  getChart3 = () => {
    const { inquirygoal: data = [] } = this.props;
    // const { inquirytotal: data = [] } = modelData;
    // console.log(data,'chart3')

    if(data.length>0){
      const SatisfactionData=[]
      let allnum = 0
      data.map((item,key)=>{
        allnum+=item.totalAmt
      })
      // console.log(allnum)
      data.map((item,key)=>{
        SatisfactionData.push({level:item.purpose,totalSum:Math.round(parseFloat(item.totalAmt/allnum)*100),total:item.totalAmt})
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

  changeType3=(val)=>{
    this.setState({
      type3:val,
    },()=>{
      this.activeChart3()
    })
  }

  changeTime3=(val)=>{
    if(val==='zdy'){
      this.setState({
        showdate3:true,
        })
    }else{
      this.setState({
        dayNum3:val,
        showdate3:false,

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
    const getChart1 = this.getChart1()
    const getChart2 = this.getChart2()
    const getChart3 = this.getChart3()
    // console.log(getChart1)

    return (
      <div className="allanalysis">

        {/* chart1 */}
        <div className="mb16 bcfff pa20">
          <div className="filter">
              <b className="mr25">咨询分析</b>

              <Select
                className="mb16"
                size="large"
                defaultValue="99"
                style={{width:120}}
                onChange={value=> this.changeStatus1(value)}
              >
                <Option value="99">累计咨询</Option>
                <Option value="">新增咨询</Option>
                <Option value="1">已回复咨询</Option>
                <Option value="3">已结束咨询</Option>
                <Option value="4">已超时咨询</Option>
              </Select>

              <Select
                className="mlr25"
                size="large"
                defaultValue=""
                style={{width:120}}
                onChange={value=> this.changeType1(value)}
              >
                <Option value="">全部咨询</Option>
                <Option value="1">图文咨询</Option>
                <Option value="2">电话咨询</Option>
                <Option value="3">视频咨询</Option>
              </Select>

              <Select
                size="large"
                defaultValue="yesterday"
                style={{width:120}}
                onChange={value=> this.changeTime1(value)}
              >
                <Option value="yesterday">昨日</Option>
                <Option value="week">上周</Option>
                <Option value="month">上月</Option>
                <Option value="season">上季度</Option>
                <Option value="zdy">自定义时间</Option>
              </Select>
              {
                this.state.showdate1?
                <span>
                   <i className="line"></i>
                  <RangePicker size="large" 
                    disabledDate={this.disabledDate}
                    value={this.state.dates1}
                     
                    onChange={this.changeDate1} locale={locale.DatePicker} />

                  <span className="ml25">粒度：</span>
                  <Select
                    size="large"
                    defaultValue="day"
                    style={{width:100}}
                    onChange={value=>this.setState({granularity1:value})}
                  >
                    <Option value="day">日</Option>
                    <Option value="week">周</Option>
                    <Option value="month">月</Option>
                  </Select>

                  <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate1}>确 定</Button>
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

        {/* chart2 */}
        <div className="mb16 bcfff pa20">
          <div className="filter">
              <b className="mr25">咨询类型</b>
              <Select
                size="large"
                defaultValue="yesterday"
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
                this.state.showdate2?
                <span>
              <i className="line"></i>
              <RangePicker size="large" 
                disabledDate={this.disabledDate}
                value={this.state.dates2}
                 
                onChange={this.changeDate2} locale={locale.DatePicker} />

              <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate2}>确 定</Button>
              </span>:''}
          </div>
          <div className="ChartBox">
                  <Chart
                    placeholder
                    height={400}
                    data={getChart2.dv}
                    scale={getChart2.cols}
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
                          // console.log(item)
                          return item.point.level + ": " + item.point.total+'人';
                        }}
                      />
                    </Geom>
                  </Chart>
          </div>

        </div>

        {/* chart3 */}

        <div className="mb16 bcfff pa20">
          <div className="filter">
              <b className="mr25">咨询目的</b>
              <Select
                className="mr25"
                size="large"
                defaultValue=""
                style={{width:120}}
                onChange={value=> this.changeType3(value)}
              >
                <Option value="">全部咨询</Option>
                <Option value="1">图文咨询</Option>
                <Option value="2">电话咨询</Option>
                <Option value="3">视频咨询</Option>
              </Select>
              <Select
                size="large"
                defaultValue="yesterday"
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
                this.state.showdate3?
                <span>
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
                    data={getChart3.dv}
                    scale={getChart3.cols}
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

      </div>
    );
  }
}
export default connect((state) => {
  const { allanalysis } = state;
  return {
    ...allanalysis,
  };
})(AllAnalysis);
