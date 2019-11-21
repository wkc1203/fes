import React from 'react';
import { connect } from 'dva';
import { Table, Input, DatePicker, Button, Alert } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../../utils/utils';
import '../style.less';

const { RangePicker } = DatePicker;

class Widget extends React.Component {
  state = {
    // checked: 0,
    startDate: '',
    endDate: '',
    dates: [
      // moment(formatDate(new Date(new Date() - (30 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
    name: '',
  }

  disabledDate =(current)=> {
    // console.log(Date.now())
    return current && current.valueOf() > Date.now();
  }

  componentDidMount(){
    this.query()
  }

  changeDate = (dates, dateStrings) => {
    this.setState({
      dates,
      startDate: dateStrings[0]||'',
      endDate: dateStrings[1]||'',
    });
  }

  onKeydown(e){
    if(e.keyCode===13){
      this.query();
    }
  }

  query = (pageNum=1) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userList/RegisterList',
      payload: {
        platformId:sessionStorage.getItem('hisId'),
        pageNum,
        startDate: this.state.startDate?this.state.startDate+' 00:00:00' :'',
        endDate: this.state.endDate?this.state.endDate+' 23:59:59':'',
        userName: this.state.name||'',
        numPerPage:10

      },
    });
  }

  render() {
    const totalCount = this.props.RegisterList ? this.props.RegisterList.totalCount : 0;
    const currentPage = this.props.RegisterList ? this.props.RegisterList.currentPage : 0;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'realName',
        key:'realName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '身份证号码',
        dataIndex: 'idNo',
      },
      
      {
        title: '注册时间',
        dataIndex: 'createTime',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '地域',
        dataIndex: 'province',
      },
    ];
    const data = this.props.RegisterList && this.props.RegisterList.recordList.length > 0 ?
    this.props.RegisterList.recordList.map((item, key) => {
      return {
        key: key + 1,
        realName: item.nickName,
        sex: item.sex || '未知',
        createTime: item.createDate?item.createDate.substr(0,10): '--',
        idNo: item.idNo || '未知',
        age: item.age || '未知',
        province: item.province || '未知',
      };
    }) : [];
    return (
      <div className="page-order-list">
        <div className="query-box">
          <span>用户：</span>
          <Input
            type="text" size="large" placeholder="请输入用户姓名"
            value={this.state.name} 
            onChange={e => this.setState({name: e.target.value})}
            onKeyDown={(e)=> this.onKeydown(e)}
          />
          {/* <Button size="large" type="primary" onClick={() => this.reset()}>确 定</Button> */}
          {/* <i className="line"></i> */}
          <span>注册时间：</span>
          <RangePicker size="large"   value={this.state.dates} onChange={this.changeDate} locale={locale}
              disabledDate={this.disabledDate}          
          />

          <Button size="large" type="primary" onClick={() => this.query()}>确 定</Button>
          {/* <Button size="large" onClick={this.reset}>重 置</Button> */}
        </div>
        {/* <Alert
          message={<p>已选择 <span style={{color: '#EB6CA4'}}>{this.state.checked}</span> 项</p>} type="info" showIcon
        /> */}
        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              showQuickJumper: true,
              current: currentPage,
              total: totalCount,
              showTotal: total => `共 ${total} 条`,
              onChange: pageNumber => this.query(pageNumber),
            }}
            // rowSelection={{
            //   onChange: (selectedRowKeys, selectedRows) => {
            //     // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            //     this.setState({checked: selectedRows.length});
            //   },
            // }}
          />
        </div>
      </div>
    );
  }
}
export default connect((state) => {
  const { userList } = state;
  return {
    ...userList,
  };
})(Widget);
