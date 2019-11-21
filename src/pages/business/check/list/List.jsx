import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button, Modal, message ,Radio } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../../utils/utils';
import './style.less';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class List extends React.Component {
  state = {
    searchId: '',
    status: '',
    startDate: '',
    endDate: '',
    dates: [
      // moment(formatDate(new Date(new Date() - (365 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
    orderId: '',
    showModal: false,
    showModal2: false,
    reason: '用户投诉',
    isInput: true,
    type:'',
    ordertype:'',
    showordertype:false,
    inquiryStatus:'',
    patientName:'',
    userName:'',
    status:'',
    // showOrder
    refundDesc:'',
    RadioVal:'1',
    // orderStatus:''
    pnum:1
    // comingOvertime:''
  }
  changeDate = (dates, dateStrings) => {
    this.setState({
      dates,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
  }

  // componentWillReceiveProps(){
  //   console.log('componentWillReceiveProps')
  //   this.query(1)
  // }
  // componentwillmount(){
  //   this.query(1)

  // }

  componentDidMount(){
     console.log("@32");
    this.query(1)
  }

  //条件搜索
  query = (pageNum) => {
    const { dispatch,location } = this.props;
    
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      pageNum,
      numPerPage:10,
      // inquiryStatus:this.state.inquiryStatus,
      orderId: this.state.searchId?this.state.searchId.replace(/(^\s*)|(\s*$)/g, ""):'', 
      startDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
      endDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
      sort:'DESC',
      orderBy:'createTime',
      patientName:this.state.patientName.replace(/(^\s*)|(\s*$)/g, "")|| '',
      userName:this.state.userName.replace(/(^\s*)|(\s*$)/g, "")|| '',
      status:this.state.status|| '',
       orderStatus:this.state.orderStatus||''
       
    };


      dispatch({ type: 'checklist/getCheckOrderList', payload });
    

  }

  //搜索重置
  // reset = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'ordList/getOrderList',
  //     payload: {
  //       startDate: formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))),
  //       endDate: formatDate(new Date()),
  //     },
  //   });
  //   this.setState({
  //     searchId:  '',
  //     status: '',
  //     startDate: formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))),
  //     endDate: formatDate(new Date()),
  //     dates: [
  //       moment(formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
  //       moment(formatDate(new Date()), 'YYYY-MM-DD'),
  //     ],
  //   });
  // }

  
  changeType=(val)=>{
    if(val==='1'){
      this.setState({showordertype:false})
    }else{
      this.setState({showordertype:true,ordertype:''})
    }
    this.setState({type: val})
  }

  onKeydown(e){
    if(e.keyCode===13){
      this.query(1);
    }
  }


  render() {
    const totalCount = this.props.checkList ? this.props.checkList.totalCount : 0;
    const currentPage = this.props.checkList ? this.props.checkList.currentPage : 0;
    const checkList=!!this.props.checkList.recordList?this.props.checkList.recordList:'';
    console.log("prop11",!!this.props.checkList.recordList)
    console.log("prop",checkList)
    const columns = [
      {
        title: '申请时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '订单编号',
        dataIndex: 'orderId',
        key: 'orderId',
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '订单金额',
        dataIndex: 'fee',
        key: 'fee',
        // sorter: (a, b) => a.fee - b.fee,
      },      
      {
        title: '支付时间',
        dataIndex: 'ordertime',
        key: 'ordertime',
      },
     
      {
        title: '用户',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: '就诊人',
        dataIndex: 'patient',
        key: 'patient',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (e) => {
          // console.log(e)
          return (
            <span>
              <a target="_blank" onClick={
                
                () => {
                  const w=window.open('about:blank');
                  w.location.href='http://'+window.location.host+'/#/business/check/detail?'+'id='+e.id
                }
                
                // () => hashHistory.push({pathname: '/order/detail', query: {orderId: e.orderId}})
              
              }>查看</a>

             </span>
          );
        },
      },
    ];

    // console.log(this.props.chekListcurrentPage)
    const cheklist= checkList&& checkList.length > 0 ?
    checkList.map((item, key) => {

      return {
        key: key + 1,
        time: new Date(item.createTime).getFullYear() + '-' + ( new Date(item.createTime).getMonth() + 1) + '-' +  new Date(item.createTime).getDate() + ' ' +  new Date(item.createTime).getHours() + ':' +  new Date(item.createTime).getMinutes() + ':' +  new Date(item.createTime).getSeconds(),
        orderId: item.orderIdStr,
        type: '咨询类',
        fee: (item.totalFee / 100).toFixed(2),
        user:item.userName,
        patient: item.patientName,
        ordertime:'暂无',
        status: item.status=='0'?'待确认':item.status=='1'?'待付款':item.status=='2'?'已付款':item.status=='3'?'已过期':item.status=='4'?'已过期':'',
        action: {status: item.orderStatus, id: item.id,refundDesc:item.refundDesc||'',pnum:this.props.chekListcurrentPage,checkItem:item.checkItem},
      };
    }) : [];

    return (
      <div className="page-order-list">
        <div className={"query-box "+this.props.location.query.showsearch}>
          <span>订单编号：</span>
          <Input
            className="mb16"
            type="text" size="large" placeholder="请输入"
            value={this.state.searchId} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({searchId: e.target.value})}
          />
          <span>订单状态：</span>
          <Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            value={this.state.status}
            onChange={value => this.setState({status: value})}
          >
            <Option value="">全部</Option>
            <Option value="0">待确认</Option>
            <Option value="1">待付款</Option>
            {/* <Option value="C">已取消</Option> */}
            <Option value="2">已付款</Option>
            <Option value="3">已过期</Option>
          </Select>
          <span>用户：</span>
          <Input onChange={e=>this.setState({userName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:120}} size="large" placeholder="请输入用户姓名" />
          <span>就诊人：</span>
          <Input onChange={e=>this.setState({patientName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:120}} size="large" placeholder="请输入就诊人姓名" />

          <RangePicker size="large"   value={this.state.dates} onChange={this.changeDate} disabledDate={this.disabledDate} locale={locale} />
          <Button size="large" type="primary" onClick={() => this.query(1)}>确 定</Button>
          {/* <Button size="large" onClick={this.reset}>重 置</Button> */}
        </div>

        <div>
          <Table
            columns={columns}
            dataSource={cheklist}
            size="default"
            pagination={{
              showQuickJumper: true,
              current: currentPage,
              total: totalCount,
              showTotal: total => `共 ${total} 条`,
              onChange: pageNumber => this.query(pageNumber),
            }}
          />
        </div>

        <Modal
          title="退款原因"
          closable={false}
          visible={this.state.showModal}
          maskClosable={false}
          onCancel={() => this.setState({orderId: '', showModal: false, reason: '用户投诉', isInput: true})}
          onOk={this.refund}
        >
          <div className="files-modal">
            {/* <Select
              size="large"
              style={{width: '100%', marginBottom: '16px'}}
              placeholder="请选择退款原因"
              onChange={value => this.setState({reason: value, isInput: value == ''})}
            >
              <Option value="用户投诉">用户投诉</Option>
              <Option value="">其他原因</Option>
            </Select>
            {this.state.isInput &&
              <TextArea placeholder="请输入退款原因" onInput={e => this.setState({reason: e.target.value})} />
            } */}
            
            <RadioGroup className="RadioReason" onChange={value=>this.changeReason(value)} value={this.state.RadioVal}>
              <Radio value='1'>用户投诉</Radio>
              <Radio value='2'>其他原因</Radio>
              <TextArea placeholder="请输入退款原因" style={{width:360}} disabled={this.state.isInput} value={this.state.reason==='用户投诉'?'':this.state.reason} onInput={e => this.setState({reason: e.target.value})} />
            </RadioGroup>


          </div>
        </Modal>

         {/* <Modal
          title="退款原因"
          closable={false}
          visible={this.state.showModal2}
          maskClosable={false}
          onOk={() => this.setState({orderId: '', showModal2: false, refundDesc: ''})}
        >
          <div className="files-modal">
              {this.state.refundDesc}
              {this.state.orderId}
          </div>
        </Modal> */}

      </div>
    );
  }
}
export default connect((state) => {
  const { checklist } = state;
  return {
    ...checklist,
  };
})(List);
