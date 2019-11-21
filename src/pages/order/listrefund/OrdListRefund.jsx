import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Drawer,Input, Select,Table, DatePicker, Button, Modal, Radio} from 'antd';
//import { Input, Select,Table, DatePicker, Button, Modal, Radio} from 'antd';

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import { formatDate } from '../../../utils/utils';
import '../list/style.less';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class ordListRefund extends React.Component {
  state = {
    searchId: '',
    docname:'',
    status: '',
    startDate: '',
    endDate: '',
    visible:false,

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
    // showOrder
    refundDesc:'',
    RadioVal:'1',
    // orderStatus:''
  }
  changeDate = (dates, dateStrings) => {
    this.setState({
      dates,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
  }

  componentDidMount(){
    this.query(1)
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }
  //条件搜索
  query = (pageNum) => {
    const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      pageNum,
      numPerPage:10,
      orderId: this.state.searchId, 
      operatorName:this.state.docname,
      startDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
      endDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
      sort:'DESC',
      orderBy:'createTime',
      operType:'2',
      type:this.state.ordertype || '',
      businessType:this.state.type||'',
      orderStatus:'R'
    };

    dispatch({ type: 'ordListRefund/getOrderList', payload });
  }

  getexcl(){
    const { dispatch } = this.props;
    console.log(this.props.data.recordList,'this.props.data.recordList')
    let arrid=[]
    !!this.props.data.recordList&&this.props.data.recordList.map((item,index)=>{
      arrid.push(item.orderIdStr)
    })
    arrid = arrid.join(',');
    // arrid =arrid.substr(0,arrid.length); 
    const payload ={
      operatorName:JSON.stringify( {
        orderId: this.state.searchId, 
        operatorName:this.state.docname,
        startDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
        endDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
        sort:'DESC',
        orderBy:'createTime',
        operType:'2',
        type:this.state.ordertype || '',
        businessType:this.state.type||'',
        orderStatus:'R'
      }),
      ids:arrid
    }
    console.log(arrid,'arrid',payload)

    dispatch({ type: 'ordListRefund/getexcel', payload });
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
       if(val==='2'){
        this.setState({showordertype:false})
       }else{
        this.setState({showordertype:true,ordertype:''})

       }
    }
    this.setState({type: val})
  }

  onKeydown(e){
    if(e.keyCode===13){
      this.query(1);
    }
  }

  render() {
    const datadetail=this.props.detaildata?this.props.detaildata:'';
    
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;

    const columns = [
      {
        title: '下单时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '订单编号',
        dataIndex: 'orderId',
        key: 'orderId',
      },
      {
        title: '业务类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '订单类型',
        dataIndex: 'ordertype',
        key: 'ordertype',
      },
      {
        title: '订单金额',
        dataIndex: 'fee',
        key: 'fee',
        // sorter: (a, b) => a.fee - b.fee,
      },      
      {
        title: '操作时间',
        dataIndex: 'refundTime',
        key: 'refundTime',
      },
      
      {
        title: '操作人',
        dataIndex: 'operatorName',
        key: 'operatorName',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (e) => {
          return (
            <span>
              <a onClick={
                 () => {
                  const { dispatch } = this.props;
                  dispatch({
                     type: 'ordListRefund/detail',
                     payload:{orderId:e.orderId,hisId: sessionStorage.getItem('hisId'),}
                   });
                   this.showDrawer();
                  //const w=window.open('about:blank');
                  //w.location.href='http://'+window.location.host+'/#/order/detail?'+'orderId='+e.orderId
                }
                // () => hashHistory.push({pathname: '/order/detail', query: {orderId: e.orderId}})
              
              }>查看</a>
            </span>
          );
        },
      },
    ];

    const data = this.props.data && this.props.data.recordList.length > 0 ?
    this.props.data.recordList.map((item, key) => {
      let ordertype = '--'
      if(item.type==='1'){
        ordertype='图文咨询'
      }else if(item.type==='2'){
        ordertype='电话咨询'
      }else if(item.type==='3'){
        ordertype='视频咨询'
      }
      return {
        key: key + 1,
        time: item.createDate,
        orderId: item.orderIdStr,
        type: item.businessType=='1'?'咨询类':'诊疗类',
        ordertype:item.businessType=='1'?ordertype:item.type=='1'?'检查检验单':item.type=='3'?'处方药品':'门诊加号',
        fee: (item.totalFee / 100).toFixed(2),
        refundTime:item.refundTime,
        operatorName:item.operatorName || '',
        // user:item.userName,
        // patient: item.patientName,
        status: item.statusName,
        action: {status: item.orderStatus, orderId: item.orderIdStr,refundDesc:item.refundDesc||''},
      };
    }) : [];

    return (
      <div className="page-order-list">
      <Drawer
      title="订单信息"
      placement="right"
      bodyStyle={{
        width: '1000px',
      
      }}
      width='1200'
      closable={true}
      onClose={this.onClose}
      visible={this.state.visible}
    >
            {datadetail!=''&&<div className="page-order-det">
            <div>
              <p className="title">订单信息</p>
              <div>
                <p>订单号：<span>{datadetail.orderIdStr}</span></p>
                <p>订单金额：<span>￥{(datadetail.totalFee / 100).toFixed(2)}</span></p>
                <p>下单时间：<span>{datadetail.createDate}</span></p>
                {/* <p>过期时间：<span>2018/06/20 17:35:20</span></p> */}
                <p>订单状态：<span>{datadetail.statusName}</span></p>

                {data.orderStatus ==='R' ?
                  <p>退款操作账号：<span>{datadetail.operatorName|| '无'}</span></p> : ''}

                {data.orderStatus ==='R' ?
                  <p>退款时间：<span>{datadetail.refundTime|| '无'}</span></p> : ''}

                {data.orderStatus ==='R' ?
                  <p>退款原因：<span>{datadetail.refundDesc || '无'}</span></p> : ''}

              </div>
            </div>
            <div>
              <p className="title">用户信息</p>
              <div>
                <p>用户姓名：<span>{datadetail.userName|| '无'}</span></p>
                <p>就诊人：<span>{datadetail.patientName|| '无'}</span></p>
                <p>性别：<span>{datadetail.sex|| '未知'}</span></p>
                <p>用户编号：<span>{datadetail.patientId|| '无'}</span></p>
              </div>
            </div>
            <div>
              <p className="title">业务类型</p>
              <div>
                {datadetail.businessType=='1'&&<p>业务类型：<span>咨询类</span> </p>}
                {datadetail.businessType=='2'&&<p>业务类型：<span>诊疗类</span> </p>}
                {datadetail.businessType=='1'&&datadetail.type==='1'?<p>订单类型：<span>图文咨询</span></p>:''}
                {datadetail.businessType=='1'&&datadetail.type==='2'?<p><span>电话咨询</span></p>:''}
                {datadetail.businessType=='1'&&datadetail.type==='3'?<p><span>视频咨询</span></p>:''}
                {datadetail.businessType=='2'&&datadetail.type==='1'?<p><span>检验检查单</span></p>:''}
                {datadetail.businessType=='2'&&datadetail.type==='2'?<p><span>门诊加号</span></p>:''}
                {datadetail.businessType=='2'&&datadetail.type==='3'?<p><span>处方药品</span></p>:''}

              </div>
            </div>
            <div>
              <p className="title">订单评价</p>
              {
                datadetail.appraisalTime ? 
                <div>
                <p>评价时间：<span>{datadetail.appraisalTime || '无'}</span></p>
                <div className='Ratelikep'>评价分数：<span>{datadetail.score?<Rate disabled value={datadetail.score} />:'无'}</span></div>
                {/* <p>评价时间：<span>{data.appraisalTime || '无'}</span></p> */}
                <p className="all-line">评价内容：<span>{datadetail.appraisal || '无'}</span></p>
              </div>
              : <div>无
              </div>
              }
            </div>

            {
              datadetail.orderStatus ==='R' ?
              <div>
                <p className="title">退款状态</p>
                <div>
                  <p className="all-line">退款状态：<span>{datadetail.statusName}</span></p>
                  <p className="all-line">退款原因：<span className="drtextBox">{datadetail.refundDesc||'无'}</span></p>
                </div>
                
              </div>
              :''  
              
            }

          </div>}
    </Drawer>
        <div className="query-box">
          <span>订单编号：</span>
          <Input
            type="text" size="large" placeholder="请输入" className="mb16"
            value={this.state.searchId} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({searchId: e.target.value})}
          />

          <span>医生名称：</span>
          <Input
            type="text" size="large" placeholder="请输入" className="mb16"
            value={this.state.docname} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({docname: e.target.value})}
          />

          <span>业务类型：</span>
          <Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            defaultValue=''
            onChange={value => this.changeType(value)}
          >
            <Option value="">全部</Option> 
            <Option value="1">咨询类</Option>
           {/* <Option value="2">宣教类</Option> */} 
            <Option value="2">诊疗类</Option>
            {/* <Option value="4">物流类</Option> */} 
            {/*<Option value="5">其他</Option>*/} 
          </Select>
          <span>订单类型：</span>
          {this.state.type=='1'&&<Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            value={this.state.ordertype}
            disabled={this.state.showordertype}
            onChange={value => this.setState({ordertype: value})}
          >
            <Option value="">全部</Option>
            <Option value="1">图文咨询</Option>
            <Option value="2">电话咨询</Option>
            <Option value="3">视频咨询</Option>
            {/* <Option value="S">已支付</Option> */}
          </Select>}
          {this.state.type=='2'&&<Select
              size="large"
              style={{width: '120px', marginRight: '30px'}}
              placeholder="请选择"
              value={this.state.ordertype}
              disabled={this.state.showordertype}
              onChange={value => this.setState({ordertype: value})}
            >
              <Option value="">全部</Option>
              <Option value="1">检验检查单</Option>
              <Option value="2">门诊加号</Option>
              <Option value="3">处方药品</Option>

              {/* <Option value="S">已支付</Option> */}
        </Select>}
        {this.state.type==''&&<Select
              size="large"
              style={{width: '120px', marginRight: '30px'}}
              placeholder="请选择"
              value={this.state.ordertype}
              disabled={this.state.showordertype}
              onChange={value => this.setState({ordertype: value})}
            >
              <Option value="">全部</Option>
           
              
              {/* <Option value="S">已支付</Option> */}
        </Select>}


          <RangePicker size="large"   value={this.state.dates} onChange={this.changeDate} locale={locale.DatePicker} />
          <Button size="large" type="primary" onClick={() => this.query(1)}>确 定</Button>
          <Button size="large" onClick={() => this.getexcl()}>导 出</Button>
        </div>

        <div>
          <Table
           locale={locale.Modal}
            columns={columns}
            dataSource={data}
            size="default"
            pagination={{
              showQuickJumper: true,
              current: currentPage,
              total: totalCount,
              locale:locale.Pagination,
              showTotal: total => `共 ${total} 条`,
              onChange: pageNumber => this.query(pageNumber),
            }}
          />
        </div>

      </div>
    );
  }
}
export default connect((state) => {
  const { ordListRefund } = state;
  return {
    ...ordListRefund,
  };
})(ordListRefund);
