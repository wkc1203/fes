import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button, Icon, Rate,Modal } from 'antd';
import './style.less';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const Option = Select.Option;
const { RangePicker } = DatePicker;

const confirm = Modal.confirm;
const content = (
  <div>数字越大越靠前</div>
);

class Sample extends React.Component {
  state = {
    viewData: [],
    startDate:'',
    endDate:'',
    
  }
  componentDidMount(){
    this.query(2);

  }
  query = (pageNumber) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/list',
      payload: {
        source:pageNumber,
        hisId:sessionStorage.getItem('hisId'),
        startDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
        endDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
      },
      callback:(res)=>{
        console.log("res",res)
         if(res.code==0){
           this.setState({
             viewData:res.data
           })
           console.log("res",JSON.stringify(res.data))
         }
      }
    });
  }
  onSubmit = () => {
  
    this.query(2);
  }
  onDateChange = (date, dateStr) => {
    this.setState({
      startDate: dateStr[0] || '',
      endDate: dateStr[1] || '',
    });
  }
  submit1 = () => { 
 
      if(this.state.viewData.length>0){
        const form =  document.getElementById('export1');// eslint-disable-line
        form.submit();
      }else{
        
      }
    
  }
  
  render() {
   
   
    const columns = [{
      title: '按钮名称',
      dataIndex: 'name',
     
      
    }, {
      title: '点击次数',
      dataIndex: 'clicks',
      
    
    },{
      title: '点击次数占比',
      dataIndex: 'clickProp',
      
    
    },{
      title: '点击人数',
      dataIndex: 'clickPersons',
      
    
    },{
      title: '点击人数占比',
      dataIndex: 'personProp',
    },{
      title: '新增人数',
      dataIndex: 'beforePersons',
    }];
    const data =this.state.viewData&&this.state.viewData.length > 0 ?
    this.state.viewData.map((item) => {
      return {
        name:item.name,
        clicks:item.clicks?item.clicks:0,
        clickProp:item.clickProp?item.clickProp:0,
        clickPersons:item.clickPersons?item.clickPersons:0,
        personProp:item.personProp?item.personProp:0,
        beforePersons:item.beforePersons?item.beforePersons:0,
      };
    }) : [];
    return (
      <div className="page-sample-mng">
        <div className="query-box">
          <span>时间：</span>
          <RangePicker size="large"   onChange={this.onDateChange} locale={locale.DatePicker} />
          <Button size="large" type="primary" style={{marginLeft: '20px'}}  onClick={this.onSubmit}>确 定</Button>
          <Button size="large" style={{marginLeft: '50px'}}  onClick={this.submit1}><Icon type="download" />导出 <i className='xia'/>
              
          </Button>
        </div>
        <form
          id="export1" method="post" target="_top"
          action={"/api/mch/user/pageview/statistics/zhyy/export?hisId="+sessionStorage.getItem('hisId')+"&source=2"+"&startDate="+this.state.startDate+"&endDate="+this.state.endDate}
        />
        <Table
        columns={columns}
        dataSource={data}
      />
       

      
      </div>
    );
  }
}
export default connect((state) => {
  const { sample } = state;
  return {
    ...sample,
  };
})(Sample);
