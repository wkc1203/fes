import React from 'react';
import { connect } from 'dva';
import {Table, Input, Select, DatePicker, Button, Modal, message ,Radio } from 'antd';
import {Drawer } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../utils/utils';
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

class FlowUpData extends React.Component {
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
    times:true,
    percent:false,
    deptId:'',
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

     //chart4
     startDate4: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
     endDate4: formatDate(new Date()),
     dates4: [
       moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
       moment(formatDate(new Date()), 'YYYY-MM-DD'),
     ],
     dayNum4:'yesterday',
     type4:'',
     showdate3:false,

  }

  componentDidMount() {
    this.activeChart1()
    this.activeChart2()
    this.activeChart3()
    this.activeChart4()
    this.getDept();
  }
  getDept=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'flowUpData/getDept',
      payload: {
        hisId:sessionStorage.getItem('hisId')
      },
    });
  }
  activeChart1=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'flowUpData/getinquirytotalstatistics' ,
      payload:{
                hisId: sessionStorage.getItem('hisId'),
                platformId:sessionStorage.getItem('hisId'),
                dayNum:this.state.dayNum1,
                deptId:this.state.deptId,
                startDate:this.state.startDate1?this.state.startDate1:'',
                endDate:this.state.endDate1?this.state.endDate1:'',
            }
    });
  }

  getChart1 = () => {
     console.log(this.props)
    const { inquirytotal: data = [] } = this.props;
    // const { inquirytotal: data = [] } = modelData;
    // console.log(data,'chart1')
    const cols = {
      'patientNum': { min: 0,tickCount:data.length==1?2:5},
      'dateTime': {
        range: [0, 1],
      }
    };
    return { data, cols };
  }
  getChart2 = () => {
    console.log(this.props)
   const { inquirytype: data = [] } = this.props;
   // const { inquirytotal: data = [] } = modelData;
   // console.log(data,'chart1')
   const cols = {
     'recordNum': { min: 0,tickCount:data.length==1?2:5},
     'dateTime': {
       range: [0, 1],
     }
   };
   return { data, cols };
 }
 getChart3= () => {
  console.log(this.props)
 var  { inquirygoal: data = [] } = this.props;
 // const { inquirytotal: data = [] } = modelData;
 // console.log(data,'chart1')
 for(var i=0;i<data.length;i++){
  data[i].recordPercent1=parseInt(data[i].recordPercent.substring(0,data[i].recordPercent.indexOf('%')));
}
 const cols = {
   'recordPercent1': { min: 0,tickCount:data.length==1?2:5},
   'dateTime': {
     range: [0, 1],
   }
 };
 return { data, cols };
}
getChart4= () => {
  console.log(this.props)
 var { completetotal: data = [] } = this.props;
  for(var i=0;i<data.length;i++){
    console.log(data[i].completePercent.indexOf('%'))
    data[i].completePercent1=parseInt(data[i].completePercent.substring(0,data[i].completePercent.indexOf('%')));
  }
  console.log("Data",data)


 // const { inquirytotal: data = [] } = modelData;
 // console.log(data,'chart1')
 const cols = {
   'completePercent1': { min: 0,tickCount:data.length==1?2:5},
   'dateTime': {
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
      type: 'flowUpData/getinquirytypestatistics' ,
      payload:{
                hisId: sessionStorage.getItem('hisId'),
                platformId:sessionStorage.getItem('hisId'),
                dayNum:this.state.dayNum2,
                deptId:this.state.deptId,
                startDate:this.state.startDate2?this.state.startDate2:'',
                endDate:this.state.endDate2?this.state.endDate2:'',
            }
    });
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
      type: 'flowUpData/getinquirygoalstatistics' ,
      payload:{
                hisId: sessionStorage.getItem('hisId'),
                platformId:sessionStorage.getItem('hisId'),
                dayNum:this.state.dayNum3,
                deptId:this.state.deptId,
                startDate:this.state.startDate3?this.state.startDate3:'',
                endDate:this.state.endDate3?this.state.endDate3:'',
            }
    });
  }
  activeChart4=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'flowUpData/getfollowCompleteStatistics' ,
      payload:{
                hisId: sessionStorage.getItem('hisId'),
                platformId:sessionStorage.getItem('hisId'),
                dayNum:this.state.dayNum4,
                deptId:this.state.deptId,
                startDate:this.state.startDate4?this.state.startDate4:'',
                endDate:this.state.endDate4?this.state.endDate4:'',
            }
    });
  }

  changeType3=(val)=>{
    this.setState({
      type3:val,
    },()=>{
      this.activeChart3()
    })
  }
  changeType4=(val)=>{
    this.setState({
      type4:val,
    },()=>{
      this.activeChart4()
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
  changeTime4=(val)=>{
    console.log("val",val)
    if(val==='zdy'){
      this.setState({
        showdate4:true,
        })
    }else{
      this.setState({
        dayNum4:val,
        showdate4:false,

      },()=>{
        this.activeChart4()
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
  changeChartDate4=()=>{
    this.setState({
      dayNum4:'',
    },()=>{
      this.activeChart4()
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
  changeDate4 = (dates, dateStrings) => {
    this.setState({
      dates4:dates,
      startDate4: dateStrings[0],
      endDate4: dateStrings[1],
    });
  }

  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }


  render() {
    const getChart1 = this.getChart1()
    const getChart2 = this.getChart2()
    const getChart3 = this.getChart3()
    const getChart4 = this.getChart4()
    // console.log(getChart1)

    return (
      <div className="flowUpData">
      <div className="query-box">
      
      <span className='text'>科室</span>
      <Select
        
        style={{width: '120px', marginLeft: '30px'}}
        placeholder="请选择科室"
        value={this.state.deptId}
        onChange={value =>{
          
          this.setState({deptId: value});
          console.log(value)
          
        }}
      >
      <Option  value=''>全部</Option>
      {!!this.props.deptList&&this.props.deptList.map((item,index)=>{
        return(
         <Option key={index} value={item.no}>{item.name}</Option>
        )
    })}

      </Select>
       <Button type='primary' style={{marginLeft:'20px'}} onClick={()=>{
        this.activeChart1()
        this.activeChart2()
        this.activeChart3()
        this.activeChart4()
       }}>确定</Button>
      </div> 
        {/* chart1 */}
        {this.state.times&&<div className="mb16 bcfff pa20">
           {this.state.times&&<span className='times' onClick={()=>{
              this.setState({times:true,percent:false})
           }}>随访次数</span>}
           {!this.state.times&&<span className='times' style={{background:'#ccc'}} onClick={()=>{
            this.setState({times:true,percent:false})
         }}>随访次数</span>}

           {this.state.percent&&<span className='percent' onClick={()=>{
            this.setState({times:false,percent:true})
         }}>随访完成率</span>}
         {!this.state.percent&&<span className='percent'  style={{background:'#ccc'}} onClick={()=>{
          this.setState({times:false,percent:true})
       }}>随访完成率</span>}
          <div className="filter" style={{marginTop:'20px'}}>
              <b className="mr25">医院随访人数</b>

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

                

                  <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate1}>确 定</Button>
                </span>
                :''
              }
             

          </div>

          <div className="ChartBox">
                <Chart placeholder  height={400} padding='auto' data={getChart1.data} scale={getChart1.cols} width={800}>
                  <Axis name="dateTime"  />
                  <Axis name="patientNum"  />
                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom type="line" position="dateTime*patientNum"  shape="smooth" size={2} 
                    tooltip={['dateTime*patientNum', (dt, patientNum) => {
                      return {
                        name: '随访人数',
                        value: patientNum
                      };
                    }]}
                    
                  />
                  <Geom
                    type="point"
                    position="dateTime*patientNum"
                    size={4}
                    shape={"circle"}
                    style={{
                      stroke: "#fff",
                      lineWidth: 1
                    }}
                    tooltip={['dateTime*patientNum', (dateTime, patientNum) => {
                      return {
                        name: '随访人数',
                        value: patientNum
                      };
                    }]}
                  />
                </Chart>
          </div>

        </div>}

        {/* chart2 */}
        {this.state.times&&<div className="mb16 bcfff pa20">
          <div className="filter">
              <b className="mr25">医院随访次数</b>
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
              <Chart placeholder  height={400} padding='auto' data={getChart2.data} scale={getChart2.cols} width={800}>
              <Axis name="dateTime"  />
              <Axis name="recordNum"  />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Geom type="line" position="dateTime*recordNum"  shape="smooth" size={2} 
                tooltip={['dateTime*recordNum', (dateTime, recordNum) => {
                  return {
                    name: '随访次数',
                    value: recordNum
                  };
                }]}
                
              />
              <Geom
                type="point"
                position="dateTime*recordNum"
                size={4}
                shape={"circle"}
                style={{
                  stroke: "#fff",
                  lineWidth: 1
                }}
                tooltip={['dateTime*recordNum', (dateTime, recordNum) => {
                  return {
                    name: '随访次数',
                    value: recordNum
                  };
                }]}
              />
            </Chart>
          </div>

        </div>}

        {/* chart3 */}

        {this.state.percent&&<div className="mb16 bcfff pa20">
            {this.state.times&&<span className='times' onClick={()=>{
              this.setState({times:true,percent:false})
          }}>随访次数</span>}
          {!this.state.times&&<span className='times' style={{background:'#ccc'}} onClick={()=>{
            this.setState({times:true,percent:false})
        }}>随访次数</span>}

          {this.state.percent&&<span className='percent' onClick={()=>{
            this.setState({times:false,percent:true})
        }}>随访完成率</span>}
        {!this.state.percent&&<span className='percent'  style={{background:'#ccc'}} onClick={()=>{
          this.setState({times:false,percent:true})
      }}>随访完成率</span>}
          <div className="filter" style={{marginTop:'20px'}}>
              <b className="mr25">
              随访率（随访人数/医院总患者数）</b>
              
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
            <Chart placeholder  height={400} padding='auto' data={getChart3.data} scale={getChart3.cols} width={800}>
            <Axis name="dateTime"  />
            <Axis name="recordPercent1"  />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="line" position="dateTime*recordPercent1"  shape="smooth" size={2} 
              tooltip={['dateTime*recordPercent', (dateTime, recordPercent) => {
                return {
                  name: '随访率',
                  value: recordPercent
                };
              }]}
              
            />
            <Geom
              type="point"
              position="dateTime*recordPercent1"
              size={4}
              shape={"circle"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
              tooltip={['dateTime*recordPercent', (dateTime, recordPercent) => {
                return {
                  name: '随访率',
                  value: recordPercent
                };
              }]}
            />
          </Chart>
          </div>

        </div>}

        {/* chart4 */}

        {this.state.percent&&<div className="mb16 bcfff pa20">
          <div className="filter">
              <b className="mr25">随访完成率（随访完成次数/全部随访次数）</b>
              <Select
                size="large"
                defaultValue="yesterday"
                style={{width:120}}
                onChange={value=> this.changeTime4(value)}
              >
                <Option value="yesterday">昨日</Option>
                <Option value="week">上周</Option>
                <Option value="month">上月</Option>
                <Option value="season">上季度</Option>
                <Option value="zdy">自定义时间</Option>
              </Select>
              {
                this.state.showdate4?
                <span>
              <i className="line"></i>
              <RangePicker size="large" 
                disabledDate={this.disabledDate}
                value={this.state.dates4}
                 
                onChange={this.changeDate4} locale={locale.DatePicker} />

              <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate4}>确 定</Button>
                </span>:''
              }


          </div>
          <div className="ChartBox">
            <Chart placeholder  height={400} padding='auto' data={getChart4.data} scale={getChart4.cols} width={800}>
            <Axis name="dateTime"  />
            <Axis name="completePercent1"  />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="line" position="dateTime*completePercent1"  shape="smooth" size={2} 
              tooltip={['dateTime*completePercent', (dateTime, completePercent) => {
                return {
                  name: '随访完成率',
                  value: completePercent
                };
              }]}
              
            />
            <Geom
              type="point"
              position="dateTime*completePercent1"
              size={4}
              shape={"circle"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
              tooltip={['dateTime*completePercent', (dateTime, completePercent) => {
                return {
                  name: '随访完成率',
                  value: completePercent
                };
              }]}
            />
          </Chart>
          </div>
        </div>}

      </div>
    );
  }
}
export default connect((state) => {
  const { flowUpData } = state;
  return {
    ...flowUpData,
  };
})(FlowUpData);
