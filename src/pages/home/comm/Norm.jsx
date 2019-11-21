import React from 'react';
import { connect } from 'dva';
import { Select , DatePicker ,Button ,Icon,Popover} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../utils/utils';
import moment from 'moment';
const Option = Select.Option;
const { RangePicker } = DatePicker;

class Widget extends React.Component {
  state = {
    dataNum:[
      {name:"交易笔数",num:'',description:'交易笔数：每产生一笔订单，都属于一笔交易。例如加号，检查单，分别检查项目'},
      {name:"交易金额",num:'',description:'交易资金：所有交易产生的资金'},
    ],
    startDate: '',
    endDate: '',
    dates: [
      // moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],

    NormData1:{
      totalSum:0,
      overtimeNum:0,
      negativeCommNum:0
    },
    NormData2:{
      totalSum:0,
      overtimeNum:0,
      negativeCommNum:0
    },
    NormData3:{
      totalSum:0,
      overtimeNum:0,
      negativeCommNum:0
    },
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'home/getkeyindicatorsstatistics' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId:  sessionStorage.getItem('hisId'),dayNum:'all'},
    callback:(data)=>{
      // console.log(data)
      this.changedata(data)
    }
    });
  }

  //更新数据
  changedata=(data)=>{

    data.map((item,key)=>{
      if(item.type==null){
          this.setState({
            dataNum:[
              {name:"交易笔数",num: item.totalSum,description:'交易笔数：每产生一笔订单，都属于一笔交易。例如加号，检查单，分别检查项目'},
              {name:"交易金额",num:(item.totalAmt / 100).toFixed(2),description:'交易资金：所有交易产生的资金'},
            ],
            NormData1:{
              totalSum:0,
              overtimeNum:0,
              negativeCommNum:0
            },
            NormData2:{
              totalSum:0,
              overtimeNum:0,
              negativeCommNum:0
            },
            NormData3:{
              totalSum:0,
              overtimeNum:0,
              negativeCommNum:0
            }
          })
        }else if(item.type==='1'){
          this.setState({
            NormData1:{
              totalSum:item.totalSum||0,
              overtimeNum:item.overtimeNum||0,
              negativeCommNum:item.negativeCommNum||0
            }
          },()=>{
            // console.log(this.state)
          })
        }else if(item.type==='2'){
          this.setState({
            NormData2:{
              totalSum:item.totalSum||0,
              overtimeNum:item.overtimeNum||0,
              negativeCommNum:item.negativeCommNum||0
            }
          },()=>{
            // console.log(this.state)
          })
        }else if(item.type==='3'){
          this.setState({
            NormData3:{
              totalSum:item.totalSum||0,
              overtimeNum:item.overtimeNum||0,
              negativeCommNum:item.negativeCommNum||0
            }
          },()=>{
            // console.log(this.state)
          })
        }
    
    })
  }

  changeTimeLimit=(val)=>{
    const { dispatch } = this.props;
    dispatch({ type: 'home/getkeyindicatorsstatistics' ,payload:{hisId:  sessionStorage.getItem('hisId'),platformId:  sessionStorage.getItem('hisId'),dayNum:val},
      callback:(data)=>{
        // console.log(data,111)
        this.changedata(data)
      }
    })
  }

  changeDate = (dates, dateStrings) => {
    this.setState({
      dates,
      startDate: dateStrings[0]||'',
      endDate: dateStrings[1]||'',
    });
  }

  changebtnDate=()=>{  
    const { dispatch } = this.props;
    dispatch({ type: 'home/getkeyindicatorsstatistics' ,
        payload:{hisId:  sessionStorage.getItem('hisId'),
                platformId:  sessionStorage.getItem('hisId'),
                startDate:this.state.startDate?this.state.startDate +' 00:00:00':'',
                endDate:this.state.endDate?this.state.endDate + ' 23:59:59':''
              },
        callback:(data)=>{
          // console.log(data,222)
          this.changedata(data)
        }});
   
  }

  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }

  render() {
    return (
      <div className="norm">
          <div className="filter bcfff pa20 mb16">
            <Select
              size="large"
              defaultValue="all"
              style={{width:120}}
              onChange={value=> this.changeTimeLimit(value)}
            >
              <Option value="yesterday">昨日</Option>
              <Option value="week">上周</Option>
              <Option value="month">上个月</Option>
              <Option value="season">上季度</Option>
              <Option value="all">全部</Option>
              <Option value="year">去年</Option>
            </Select>
            <i className="line"></i>
            <RangePicker size="large" 
              disabledDate={this.disabledDate}
              value={this.state.dates} 
              onChange={this.changeDate} locale={locale.DatePicker} />

            <Button className="ml25" size="large" type="primary" onClick={this.changebtnDate}>确 定</Button>
        </div>

        <div className="homeflexbc mb16">
            {
                (this.state.dataNum).map((item, key) => {
                  return <div className="homenum NormDescription" key={key}><span>{item.name}</span>
                  <Popover placement="topLeft" content={item.description}  trigger="hover">
                    <Icon type="question-circle" />
                  </Popover>
                <span>{item.num}</span></div>
                })
            }
            <div className="homenum"></div>
        </div>

        <div>
            
          <div className="homelist bcfff mb16">
              <h3>图文咨询</h3>
              <div>
                <p><span>咨询条数</span><span>超时咨询</span><span>患者差评</span></p>
                <p><span>{this.state.NormData1.totalSum}</span><span>{this.state.NormData1.overtimeNum}</span><span>{this.state.NormData1.negativeCommNum}</span></p>
              </div>
          </div>
          <div className="homelist bcfff mb16">
              <h3>电话咨询</h3>
              <div>
                <p><span>咨询条数</span><span>超时咨询</span><span>患者差评</span></p>
                <p><span>{this.state.NormData2.totalSum}</span><span>{this.state.NormData2.overtimeNum}</span><span>{this.state.NormData2.negativeCommNum}</span></p>

              </div>
          </div>
          <div className="homelist bcfff mb16">
              <h3>视频咨询</h3>
              <div>
                <p><span>咨询条数</span><span>超时咨询</span><span>患者差评</span></p>
                <p><span>{this.state.NormData3.totalSum}</span><span>{this.state.NormData3.overtimeNum}</span><span>{this.state.NormData3.negativeCommNum}</span></p>
              </div>
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
