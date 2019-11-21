import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Select, DatePicker, Button } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import { formatDate } from '../../../utils/utils';

import './style.less';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts"
import DataSet from "@antv/data-set";
const Option = Select.Option;
const { RangePicker } = DatePicker;


class Index extends React.Component {
    state = {
        //chart1
        startDate1: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
        endDate1: formatDate(new Date()),
        dates1: [
          moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        granularity1:'day',//粒度
        showdata1:false,
        dayNum1:'lastseven',
        hospital1:'',
        dept1:'',

        //chart2
        startDate2: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
        endDate2: formatDate(new Date()),
        dates2: [
          moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        granularity2:'day',//粒度
        showdata2:false,
        dayNum2:'lastseven',
        hospital2:'',
        dept2:'',

        //chart3
        startDate3: formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))),
        endDate3: formatDate(new Date()),
        dates3: [
          moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
          moment(formatDate(new Date()), 'YYYY-MM-DD'),
        ],
        granularity3:'day',//粒度
        showdata3:false,
        dayNum3:'lastseven',
        hospital3:'',
        dept3:'',
        loginInfo:{},
        isRefer:false,
    }
    changeTimeLimit=(value,type)=>{
        // console.log(value,type)
        const { dispatch } = this.props;
        switch(type)
        {
        case 1:
          if(value==='zdy'){
            this.setState({
              showdata1:true,
              dayNum1:value,
            })
          }else{
            this.setState({
              showdata1:false,
              dayNum1:value,
            },()=>{
              this.getApply()
              this.getConsultationObj();
            })
          }
          break;
        case 2:
        if(value==='zdy'){
          this.setState({
            showdata2:true,
            dayNum2:value,
            })
          }else{
            this.setState({
              showdata2:false,
              dayNum2:value,
            },()=>{
                this.getApply2();
                this.getConsultationAques();
            })
          }
    
          break;
        case 3:
        if(value==='zdy'){
          this.setState({
            showdata3:true,
            dayNum3:value,
            })
          }else{
            this.setState({
              showdata3:false,
              dayNum3:value,
            },()=>{
                this.getSpeed();
                this.getDailyincomeStatistics();
            })
          }
          break;
        default:
          break;
        }
    
      }
  changeChartDate1=()=>{  
    const { dispatch } = this.props;
     this.getApply();
     this.getConsultationObj();
  }

  changeChartDate2=()=>{  
    this.getApply2();
    this.getConsultationAques();
    }
 
  changeChartDate3=()=>{  
    
        this.getSpeed();
      this.getDailyincomeStatistics();
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
      endDate5: dateStrings[1],
    });
  }

    componentDidMount(){
      var data=JSON.parse(sessionStorage.getItem('loginInfo'));
      this.setState({
        loginInfo:data
      })
      if(!!data&&data[2].referral){
        this.setState({isRefer:true})
      }else{
        this.setState({isRefer:false});

      }
        this.getSurvey();
       
        this.getSpeed();

        this.getDept();
           this.getApply();
           this.getConsultationObj();
          this.getApply2();
          this.getConsultationAques();
         this.getDailyincomeStatistics();
        
    }
    onChange = () => {
        console.log(2)
    }
    getApply=(status)=>{
        const { dispatch,location } = this.props;
         // deptId
               // startDate
               // endDate
        dispatch({
            type: 'index/getApply',
            payload: {
                hisId:sessionStorage.getItem('hisId'),
                granularity:this.state.granularity1,
                startDate:this.state.startDate1,
                endDate:this.state.endDate1,
                deptId:this.state.dept1,
                status:'',
                dayNum:this.state.dayNum1,
            },
          });
    }
    getDept=()=>{
      const { dispatch } = this.props;
      dispatch({
          type: 'index/dept',
          payload: {
              hisId:sessionStorage.getItem('hisId'),
          },
      });
  }
    getApply2=()=>{
        const { dispatch,location } = this.props;
         // deptId
               // startDate
               // endDate
        dispatch({
            type: 'index/getApply2',
            payload: {
                hisId:sessionStorage.getItem('hisId'),
                granularity:this.state.granularity2,
                startDate:this.state.startDate2,
                endDate:this.state.endDate2,
                deptId:this.state.dept2,
                status:'2',
                dayNum:this.state.dayNum2,
            },
          });
    }
    getSpeed=()=>{
        const { dispatch,location } = this.props;
         // deptId
               // startDate
               // endDate
        dispatch({
            type: 'index/getSpeed',
            payload: {
                hisId:sessionStorage.getItem('hisId'),
                granularity:this.state.granularity3,
                startDate:this.state.startDate3,
                endDate:this.state.endDate3,
                deptId:this.state.dept3,
                dayNum:this.state.dayNum3,
            },
          });
    }
    getSurvey=()=>{
        const { dispatch,location } = this.props;
        dispatch({
            type: 'index/getSurvey',
            payload: {
                
            }, 
          });
    }
    /* 通过数量 */
    getConsultationAques= () => {
        const data  = !!this.props.applydata1&&this.props.applydata1;
        // console.log(data)
        const cols = {
          'totalSum': { min: 0,tickCount:data.length==1?2:5},
          'dt': {
            range: [0, 1],
          }
        };
        return { data, cols };
      }
    //转诊申请统计
    getConsultationObj = () => {
        const data  = !!this.props.applydata&&this.props.applydata;
         console.log("dddddd",data)
        const cols = {
        'totalSum': { min: 0,tickCount:data.length==1?2:5},
        'dt': {
            range: [0, 1],
        }
        };
        return { data, cols };
    }
/* 平均响应速度 */    
getDailyincomeStatistics = () => {
    const data= !!this.props.speeddata&&this.props.speeddata;
     var data1=[];
     console.log("w1",data1)
     if(data.dept&&data.dept.length>0){
        
      for(var i=0;i<data.dept.length;i++){
         data1.push({
           dt:'',
           科室审核响应速度:'',
           双转办审核响应速度:''
         })
      }
     }
     if(data.dept&&data.dept.length>0){
      for(var i=0;i<data.dept.length;i++){
        data1[i].dt=data.dept[i].dt;
        data1[i].科室审核响应速度=data.dept[i].avgAuditTime==null?0:data.dept[i].avgAuditTime;
      }
     }
     if(data.mch&&data.mch.length>0){
      for(var i=0;i<data.mch.length;i++){
        data1[i].双转办审核响应速度=data.mch[i].avgAuditTime==null?0:data.mch[i].avgAuditTime;
      }
     }
     console.log("w",data1)
     const ds = new DataSet();
      const dv = ds.createView().source(data1);
      dv.transform({
        type: "fold",
        fields: ["科室审核响应速度", "双转办审核响应速度"],
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

    render() {
        console.log("hh",this.props)
        const getUserChart ={};
    const getUserSatisfaction ={ };
    const getConsultationObj = this.getConsultationObj();
    const getConsultationAques = this.getConsultationAques();
    const getDailyincomeStatistics =this.getDailyincomeStatistics(); 
    console.log("d",getConsultationObj)

        
        return (
            <div>
                <div className='survey'>转诊概况</div>
                <div className='number'>
                    <p><b>总发起转诊数量</b><span>{!!this.props.data&&this.props.data.totalReferral}</span></p>
                    <p><b>总转诊通过数量</b><span>{!!this.props.data&&this.props.data.totalAdoptReferral}</span></p>
                    <p><b>审核平均响应时间</b><span>{!!this.props.data&&this.props.data.avgAuditTime}</span></p>
                </div>
                {/* 图表3 */}
                <div className="OverviewChartBox1">
                <div className="filter">
                    <b>发起转诊数量</b>
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
                      defaultValue="day"
                      style={{width:100}}
                      onChange={value=>this.setState({granularity1:value})}
                    >
                      <Option value="day">日</Option>
                      <Option value="week">周</Option>
                      <Option value="month">月</Option>
                    </Select>

                      </span>:''
                    }
                    <span className="ml25">医院：</span>
                    <Select
                      size="large"
                      style={{width:100}}
                      onChange={value=>this.setState({hospital1:value})}
                    >
                      <Option value="2214">全部医院</Option>
                    </Select>
                    <span className="ml25">科室：</span>
                    <Select
                      size="large"
                      style={{width:100}}
                      onChange={value=>this.setState({dept1:value})}
                    >
                    {this.props.dept&&this.props.dept.map((item,index)=>{
                      return(
                        <Option value={item.id}>{item.name}</Option>
                      )
                     })
                     }
                    </Select>
                    <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate1}>确 定</Button>
                </div>
                
                <div className="ChartBox">
                <Chart placeholder  height={400} padding='auto' data={getConsultationObj.data} scale={getConsultationObj.cols} width={800}>
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
                        name: '转诊数量',
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
                        name: '转诊数量',
                        value: totalSum
                      };
                    }]}
                  />
                </Chart>
                </div>
            </div>
   
                {/* 图表4 */}
                <div className="OverviewChartBox1">
                    <div className="filter">
                        <b>转诊通过数量</b>
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

                        </span>:''
                        }
                        <span className="ml25">医院：</span>
                        <Select
                          size="large"
                          style={{width:100}}
                          onChange={value=>this.setState({hospital2:value})}
                        >
                          <Option value="2214">全部医院</Option>
                        </Select>
                        <span className="ml25">科室：</span>
                        <Select
                          size="large"
                          style={{width:100}}
                          onChange={value=>this.setState({dept2:value})}
                        >
                        {this.props.dept&&this.props.dept.map((item,index)=>{
                          return(
                            <Option value={item.id}>{item.name}</Option>
                          )
                         })
                         }
                        </Select>
                        <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate2}>确 定</Button>
                       

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
                            name: '转诊数量',
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
                            name: '转诊数量',
                            value: totalSum
                        };
                        }]}
                    />
                    </Chart>
                    </div>
                </div>

                {/* 图表5 */}
                <div className="OverviewChartBox1">
                    <div className="filter">
                        <b>平均响应速度</b>
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

                        </span>:''
                        }
                        <span className="ml25">医院：</span>
                        <Select
                          size="large"
                          style={{width:100}}
                          onChange={value=>this.setState({hospital3:value})}
                        >
                          <Option value="2214">全部医院</Option>
                        </Select>
                        <span className="ml25">科室：</span>
                        <Select
                          size="large"
                          style={{width:100}}
                          onChange={value=>this.setState({dept3:value})}
                        >
                        {this.props.dept&&this.props.dept.map((item,index)=>{
                          return(
                            <Option value={item.id}>{item.name}</Option>
                          )
                         })
                         }
                        </Select>
                        <Button className="ml25" size="large" type="primary" onClick={this.changeChartDate3}>确 定</Button>
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
        )
    }
}

export default connect((state) => {
    const { index } = state
    return {
        ...index
    }
})(Index)