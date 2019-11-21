import React from 'react';
import { connect } from 'dva';
import { Select , DatePicker ,Button,Progress,Table} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { Chart, View, Geom,Label,Guide ,Coord ,Axis ,Legend ,Tooltip} from 'bizcharts';
import DataSet from '@antv/data-set';
import data from '../../../../config/json/chart-city.json';
import dataprovince from '../../../../config/json/province.js';

const {RangePicker} = DatePicker;
const { DataView } = DataSet;
const { Html } = Guide;
const Option = Select.Option;

class Widget extends React.Component {
  state = {
    startDate:'',
    endDate:'',
    dates:[],
    type:''
  }

  //触发api
  componentDidMount(){
      this.getProvince()
      this.getProvince(1,50)
      this.getCity()
      this.getSex()
      this.getAge()
  }

  getProvince=(pageNum=1,numPerPage=6)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'userAnalysis/getaccountprovincestatistics' ,
      payload:{
          platformId:sessionStorage.getItem('hisId'),
          pageNum,
          numPerPage,
      }
    })
  }

  getProvinceData=()=>{
    const { modelData = {} } = this.props;
    const { UserProvince = {} } = modelData;
    const { recordList = [], currentPage = 1, numPerPage = 10, totalCount = 0 ,countResultMap={}} = UserProvince;
    let list =[]
    if(recordList.length>0){
      list = recordList.map((item,key)=>{
        return {
          key: key+1,
          Province:item.province,
          userNumber:item.totalSum,
          PercentageStr:parseInt((item.totalSum/countResultMap.total)*100)+'%',
          Percentage:{val: parseInt((item.totalSum/countResultMap.total)*100)}
        }
      })
    }
   
    return {
      list,
      currentPage,
      numPerPage,
      totalCount,
    }
  }

  getCity=(provinceCode='',pageNum=1,numPerPage=6)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'userAnalysis/getaccountcitystatistics' ,
      payload:{
          platformId:sessionStorage.getItem('hisId'),
          pageNum,
          numPerPage,
          provinceCode,
      }
    })
  }

  getCityData=()=>{
    const { modelData = {} } = this.props;
    const { UserCity = {} } = modelData;
    const { recordList = [], currentPage = 1, numPerPage = 10, totalCount = 0 ,countResultMap={}} = UserCity;
    let list =[]
    if(recordList.length>0){
      list = recordList.map((item,key)=>{
        return {
          key: key+1,
          city:item.city,
          userNumber:item.totalSum,
          Percentage:{val: parseInt((item.totalSum/countResultMap.total)*100)}
        }
      })
    }
   
    return {
      list,
      currentPage,
      numPerPage,
      totalCount,
    }
  }

  changeCity=(val)=>{
    this.getCity(val)
  }


  getSex=()=>{
    const { dispatch } = this.props;
    const {startDate='',endDate='',type=''} =this.state;

    dispatch({
      type: 'userAnalysis/getaccountsexstatistics' ,
      payload:{
          platformId:sessionStorage.getItem('hisId'),
          startDate:startDate?startDate+' 00:00:00':'',
          endDate:endDate?endDate+' 23:59:59':'',
          type,
      }
    })
  }

  getSexData=()=>{
    const { modelData = {} } = this.props;
    const { UserSex = {} } = modelData;

    if(UserSex.length>0){
      let allTotal = 0
      UserSex.map((item)=>{
        allTotal+=item.totalSum
      })

      const dv = new DataView();
      dv.source(UserSex).transform({
        type: "percent",
        field: "totalSum",
        dimension: "sex",
        as: "percent"
      });
      const cols = {
        percent: {
          formatter: val => {
            val =  parseInt((val/allTotal) * 100) + "%";
            return val;
          }
        }
      };
      return {dv,cols}
    }else{
      return {dv:[],cols:[]}

    }

  }

  getAge=()=>{
    const { dispatch } = this.props;
    const {startDate='',endDate='',type=''} =this.state;
    dispatch({
      type: 'userAnalysis/getaccountagestatistics' ,
      payload:{
          platformId:sessionStorage.getItem('hisId'),
          startDate:startDate?startDate+' 00:00:00':'',
          endDate:endDate?endDate+' 23:59:59':'',
          type,
      }
    })
  }

  getAgeData=()=>{
    const { modelData = {} } = this.props;
    const { UserAge = {} } = modelData;
    let aval=[],tval=10;
    if(UserAge.length>0){
      UserAge.map((item)=>{

        // if(item.totalSum==0)item.totalSum= parseInt(Math.random()*100) 
        
        aval.push(item.totalSum)
      })
    }

    if(aval.length>0){
      var maxval = Math.max.apply(null,aval);
      console.log(maxval,'maxxxx')
      function stval(vals){
         var _pva = parseInt(vals)
         if(_pva<10){
          tval=2;
         }else if(_pva<20){
          tval=4;
         }else if(_pva<50){
          tval=6;
         }else if(_pva<100){
          tval=10;
         }else if(_pva<500){
          tval=50;
         }else if(_pva<1000){
          tval=100;
         }else if(_pva<2000){
          tval=200;
         }else if(_pva<5000){
          tval=500; 
         }else{
          tval=1000; 
         }
      } 
      stval(maxval)
    }
    console.log(tval,'tval')
    const cols = {
      // 'sales':{tickInterval:tval},
      'totalSum': { min: 0,tickInterval:tval},
      'age': {
        // range: [0, 1],
      }
    };
    const label={
      // offset: 40,
    }
    return { UserAge, cols,label};
  }

  sexAgeType=(val)=>{
    this.setState({
      type:val
    },()=>{
      this.getSex()
      this.getAge()
    })

  }

  changeDate = (dates, dateStrings) => {
    this.setState({
      dates:dates,
      startDate: dateStrings[0]||'',
      endDate: dateStrings[1]||'',
    });
  }

  changeSexAge=()=>{
    this.getSex()
    this.getAge()
  }

  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }

  render() {

    const getProvinceData = this.getProvinceData() || []
    const getCityData = this.getCityData() || []
    const getSexData = this.getSexData() || []
    const getAgeData = this.getAgeData() || []
    
    const { modelData = {} } = this.props;
    const { AllUserProvince = {} } = modelData;

    console.log(AllUserProvince,data,'123')

    data.features.map((item)=>{
      // let totalSum=0;
      if(AllUserProvince.recordList){

        AllUserProvince.recordList.length>0?AllUserProvince.recordList.map((item2)=>{
            if(item2.provinceCode.substr(0,2) == item.properties.id){
              item.properties.totalSum=item2.totalSum
              // console.log(item2.provinceCode.substr(0,2),item.properties.id)
            }
        }):[];

        item.properties.totalSum?'':item.properties.totalSum=0
      }
      // item.properties.totalSum=0
    })

    console.log(data)
    const geoDv = new DataSet.View().source(data, {
      type: 'GeoJSON',
    });
 
    const scale = {
      latitude: {
        sync: true,
        nice: false,
      },
      longitude: {
        sync: true,
        nice: false,
      },
    };

    const columns = [
      {
        width:'20%',
        title: '省份',
        dataIndex: 'Province',
        key: 'Province',
      },
      {
        width:'20%',
        title: '用户数',
        dataIndex: 'userNumber',
        key: 'userNumber',
        sorter: (a, b) => a.userNumber - b.userNumber,

      },
      {
        width:'20%',
        title: '占比',
        dataIndex: 'PercentageStr',
        key: 'PercentageStr',
      },
      {
        title: '',
        dataIndex: 'Percentage',
        key: 'Percentage',
        render: (e) => {
          console.log(e,'eeeeeeeeeeee')
          return ( <Progress percent={e.val} width={80} showInfo={false} /> );
        }
      },
      
    ]

    const columns2 = [
      {
        width:'25%',
        title: '城市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        width:'25%',
        title: '用户数',
        dataIndex: 'userNumber',
        key: 'userNumber',
        sorter: (a, b) => a.userNumber - b.userNumber,

      },
      {
        title: '',
        dataIndex: 'Percentage',
        key: 'Percentage',
        render: (e) => {
          return ( <Progress percent={e.val} width={80} showInfo={false} /> );
        }
      },
      
    ]


    return (
      <div className="">
        <div className="userAttributeBOX">
            <h4 className="mb16">地图分布</h4>
            <div className="AttributeChart">
                <div>
                <Chart height={400} scale={scale}  padding={[10]}>
                    <Tooltip showTitle={false}  />
                    <View data={geoDv}>
                      <Geom type="polygon" position="longitude*latitude"   select={{
                        // 设置是否允许选中以及选中样式
                            mode: "single",
                            // 多选还是单选
                            style: {
                              fill: "#1890ff" // 选中的样式
                            }
                          }}
                          // tooltip="name"
                          tooltip={[
                            "name*properties",
                            (name, properties) => {
                              return {
                                name: name,
                                value: properties.totalSum
                              };
                            }
                          ]}

                          style={{
                            stroke: "#fff",
                            lineWidth: 1
                          }}
                          color='#629fe0'
                      >
                      </Geom>
                     </View>
                  </Chart>
                </div>

                <div>
                <Table
                  columns={columns}
                  dataSource={getProvinceData.list}
                  size="default"
                  pagination={{
                    defaultPageSize:6,
                    showQuickJumper: false,
                    current: getProvinceData.currentPage,
                    pageSize: getProvinceData.numPerPage,
                    total: getProvinceData.totalCount,
                    onChange: (page, pageSize) => {
                      this.getProvince(page, pageSize);
                    }
                  }}
                />

                </div>
            </div>
        </div>

        <div className="userAttributeBOX">
            <h4 className="mb16">城市分布
              <Select
                size="large"
                style={{width: '150px', marginLeft: '30px'}}
                placeholder="请选择"
                defaultValue=''
                onChange={value => this.changeCity(value)}
              >
                <Option value="">全国</Option>

                {
                  dataprovince.map((item,key)=>{
                    return <Option key={key+2} value={item.provinceCode}>{item.provinceName}</Option>
                  })

                }

              </Select>
            </h4>
            <div className="AttributeChart">
                <div>
                
                <Table
                  columns={columns2}
                  dataSource={getCityData.list}
                  size="default"
                  pagination={{
                    defaultPageSize:6,
                    showQuickJumper: false,
                    current: getCityData.currentPage,
                    pageSize: getCityData.numPerPage,
                    total: getCityData.totalCount,
                    onChange: (page, pageSize) => {
                      this.getCity('',page, pageSize);
                    }
                  }}
                />
                </div>
            </div>
        </div>

        <div className="userAttributeBOX">
            <h4 className="mb16">性别及年龄分布</h4>
            <div>
            <Select
                size="large"
                style={{width: '120px',marginBottom:'30px'}}
                placeholder="请选择"
                defaultValue='1'
                onChange={value=> this.sexAgeType(value)}
              >
                <Option value="1">新增用户数</Option>
                <Option value="2">累计用户数</Option>
              </Select>
                  
              <i className="line"></i>

              <RangePicker size="large" 
                      disabledDate={this.disabledDate}
                      value={this.state.dates}
                       
                      onChange={this.changeDate} locale={locale} />

              <Button className="ml25" size="large" type="primary" onClick={this.changeSexAge}>确 定</Button>              

            </div>
            <div className="AttributeChart">
                <div>
                <Chart
                      placeholder
                      height={400}
                      data={getSexData.dv}
                      scale={getSexData.cols}
                      padding={[80, 100, 80, 80]}
                    >
                      <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                      <Axis name="percent" />

                      <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                      />
                      <Guide>
                        <Html
                          position={["50%", "50%"]}
                          html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;><br><span style=&quot;color:#262626;font-size:2.5em&quot;></span></div>"
                          alignX="middle"
                          alignY="middle"
                        />
                      </Guide>
                      <Geom
                        type="intervalStack"
                        position="percent"
                        color="sex"
                        tooltip={[
                          "sex*percent",
                          (sex, percent) => {
                            percent = parseInt(percent*100)  + "%";
                            return {
                              name: sex,
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
                          return item.point.sex + ": " + parseInt(item.point.totalSum)+'人' ;
                        }}
                      />
                      </Geom>
                    </Chart>
                </div>

                <div>
                <Chart placeholder height={400} data={getAgeData.UserAge} scale={getAgeData.cols} padding={[30,10,40,60]}>
                  <Axis name="age" />
                  <Axis name="totalSum" 
                    label ={getAgeData.label}
                  />
                  <Tooltip
                    crosshairs={{
                      type: "x"
                    }}
                  />
                  
                  <Geom type="interval" position="age*totalSum" 
                     tooltip={['age*totalSum', (age, totalSum) => {
                      return {
                        name: age,
                        value: totalSum
                      };
                    }]}
                  />
                </Chart>
                </div>
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
