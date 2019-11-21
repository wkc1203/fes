import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button, Tooltip, Rate } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../utils/utils';
import moment from 'moment';
import './style.less';
import model from '../../operate/evaluate/model';
const Option = Select.Option;
const { RangePicker } = DatePicker;
class eventanalysis extends React.Component {
  state = {
    type:'',
    word:'',
    word2:'',
    typepx:'inquirySum',
    startDate: '',
    endDate: '',
    dates: [
      // moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
  };

  componentDidMount() {
    this.getList(2);
  }

  getList = (btntype, page = 1, pageSize = 10) => {
    const { startDate = '', endDate = '',typepx='',type='',word='',word2=''} = this.state;
    if(btntype==1){
      let payload = {
        source:1,
        hisId:sessionStorage.getItem('hisId'),
       
      };
      
    const { dispatch } = this.props;
    dispatch({
      type: 'eventanalysis/getdoctoranalysisstatistics',
      payload,
    });
    }else if(btntype==2){

      let payload = {
        hisId:sessionStorage.getItem('hisId'),
        startDate:startDate?startDate+' 00:00:00':'',
        endDate:endDate?endDate+' 23:59:59':'',
        source:1,
       
      };
      
      const { dispatch } = this.props;
      dispatch({
        type: 'eventanalysis/getdoctoranalysisstatistics',
        payload,
      });
    }


  }

  onIptChange = (e) => {
    this.setState({
      word: e.target.value || '',
    });
  }

  onIptChange2 = (e) => {
    this.setState({
      word2: e.target.value || '',
    });
  }

  onKeydown(e){
    if(e.keyCode===13){
      this.getList(2);
    }
  }

  finddept_no =()=>{
    this.getList(1);

  }

  onSubmit = () => {
    this.getList(2);
  }

  onPageChange = (page, pageSize) => {
    this.getList(2,page, pageSize);
  }

  changeDate = (dates, dateStrings) => {
    this.setState({
      dates,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
  }

  disabledDate =(current)=> {
    // console.log(Date.now())
    return current && current.valueOf() > Date.now();
  }

  getColumns() {
    return [
      {
        title: '事件名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '浏览次数',
        dataIndex: 'views',
        key:'views'
      },
      {
        title: '浏览人数',
        dataIndex: 'viewPersons',
        key:'viewPersons'
      },
      {
        title: '点击次数',
        dataIndex: 'clicks',
        key:'clicks'
      },
      {
        title: '点击人数',
        dataIndex: 'clickPersons',
        key:'clickPersons'
      },
     
    ];
  }

  render() {
    const { modelData = {} } = this.props;
    console.log(modelData)
    const { listData = {} } = modelData;
    const { recordList = [], currentPage = 1, numPerPage = 10, totalCount = 0 } = listData;
    const recordLists =  listData.length>0 ? listData.map((item,key)=>{
      return {
        key:key+1,
        id:item.id,
        name:item.name,
        clickPersons:item.clickPersons==0?'--':item.clickPersons,
        clicks:item.clicks==0?'--':item.clicks,
        viewPersons:item.viewPersons==0?'--':item.viewPersons,
        views:item.views==0?'--':item.views,
      }
    }):[]

    // console.log(recordLists)

    return (
        <div className="pa24 bcfff">

          <div className="mb16">
           
            {/* <Button className="ml25" size="large" type="primary" onClick={this.finddept_no}>搜 索</Button> */}

            {/* <i className="line"></i> */}

            <RangePicker size="large" 
              disabledDate={this.disabledDate}
              value={this.state.dates}
               
              onChange={this.changeDate} locale={locale.DatePicker} />

            <Button className="ml25" size="large" type="primary" onClick={this.onSubmit}>确 定</Button>

          </div>

          <div>
            <Table
                columns={this.getColumns()}
                dataSource={recordLists}
                
                />
          </div>
        </div>
    );
  }
}
export default connect((state) => {
  const { eventanalysis = {} } = state;
  return {
    modelData: eventanalysis,
  };
})(eventanalysis);
