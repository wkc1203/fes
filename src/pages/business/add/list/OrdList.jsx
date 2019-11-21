import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';

import {Table, Input, Select, DatePicker, Button, Modal, message ,Radio } from 'antd';
import {Drawer } from 'antd'
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../../utils/utils';
import './style.less';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class OrdList extends React.Component {
  state = {
    searchId: '',
    status: '',
    startDate: '',
    endDate: '',
    phone:'',
    isSendValidate:true,
    leftTime:'',
    visible:false,
    valicode:'',
    cardShow:false,
    dates: [
      // moment(formatDate(new Date(new Date() - (365 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
    orderId: '',
    showModal: false,
    showModal2: false,
    hospitalTradeno:'',
    reason: '用户投诉',
    isInput: true,
    type:'',
    ordertype:'',
    patientName:'',
    userName:'',
    status:'',
    showordertype:false,
    inquiryStatus:'',
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
     console.log("@32111")
    this.query(1);
    this.setState({
      phone: sessionStorage.getItem('phone')
    })
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
    const { dispatch,location } = this.props;
     console.log("query1111")
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
        type:this.state.ordertype || '', 
        patientName:this.state.patientName.replace(/(^\s*)|(\s*$)/g, "")|| '',
        userName:this.state.userName.replace(/(^\s*)|(\s*$)/g, "")|| '',
        status:this.state.status|| '',
        // orderStatus:this.state.orderStatus||''
         
      };
      console.log("query2")

      dispatch({ type: 'addordList/getAddOrderList', payload });
    

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

  //退款原因
  refund = () => {
    const { dispatch } = this.props;
    var _this =this;
      dispatch({
        type: 'addordList/refund',
        payload: {hospitalTradeno: this.state.hospitalTradeno},
        
        callback:(res)=>{
            console.log(res)
            
            if(res.code===0){
              _this.query(_this.state.pnum)
            }
        }
      });
  }
  setNormal = (hospitalTradeno) => {
    const { dispatch } = this.props;
    var _this =this;
      dispatch({
        type: 'addordList/subscrib',
        payload: {hospitalTradeno: hospitalTradeno},
        callback:(res)=>{
            console.log("rr",res)
            if(res.code===0){
              _this.query(_this.state.pnum)
            }
        }
      });
  }


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
  back=(hospitalTradeno,pnum)=>{
    if(this.state.phone!=''){
      
      this.setState({hospitalTradeno: hospitalTradeno, cardShow: true})
    }else{
      Modal.info({
        title:'提示',
        iconType:'',
        content:'您暂无此功能体验权限',
        onOk() {},
      });
    }
    
  }
  getCode(){
    const { dispatch } = this.props;
     if(this.state.phone){
      dispatch({
        type: 'addordList/getcode',
        payload: {phone: this.state.phone, type:'refund'},
        callback:(res)=>{
          console.log(res)
          if(res.code==0){
            this.setState({
              leftTime:120,
              isSendValidate:false,
          })
           this.clock();
          }
      }
      });
     
      
    
     }
   
  }
  /**
     * 倒计时
     */
    clock() {
      var clockTimer = setTimeout(() => {
          var leftTime1 = this.state.leftTime;
          --leftTime1;
          this.setState({
              leftTime: leftTime1
          })
          if (leftTime1 <= 0) {
// 查询超时，跳转详情页面
              this.setState({
                  isSendValidate: true,
              })
          } else {
              this.setState({
                  leftTime: leftTime1
              })
              this.clock();
          }
      }, 1000);
  }
  checkCode(orderId,pnum){
    const { dispatch } = this.props;
     if(this.state.phone){
      dispatch({
        type: 'addordList/checkcode',
        payload: {phone: this.state.phone, validateCode:this.state.valicode},
        callback:(res)=>{
          console.log("res",res)
          if(res.code==0){
            this.setState({
              cardShow:false,
              valicode:'',
              isSendValidate:true,
          });
          this.refund();
          
          }
      }
      });
     
      
    
     }
   
  }
  info(id,val) {
    Modal.info({
      title: (<span className="model2">退款原因</span>),
      iconType:'',
      content: (
        <div className="prl40">
          <p>{val||'无'}</p>
          {/* <p>{id}</p> */}
        </div>
      ),
      onOk() {},
    });
  }
 
  changeReason(e){
    console.log(e)
    if(e.target.value==2){
      this.state.reason=='用户投诉'?
      this.setState({
        reason:''
      })
      :'';

      this.setState({
        isInput:false,
        RadioVal:e.target.value,
      })
    }else{
      this.setState({
        isInput:true,
        RadioVal:e.target.value,
        reason:'用户投诉'
      })
    }
  }
  getDetail = (id) => {
    const { dispatch, location = {} } = this.props;
   
    dispatch({
      type: 'addordList/getDetail',
      payload: { id:id, }
    });
  }
  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }

  render() {
    var operateList='';
    var addRefund=false;
    var addNormal=false;
    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='SUB_REFUND')
          {
           addRefund=true;
          }
          if(operateList[i]=='SUB_SET_NORMAL')
          {
           addNormal=true;
          }
          
  }
    }
   
   
    
    const inquiry=this.props.detaillist?this.props.detaillist:'';
    console.log(inquiry,'addlist........')
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;

    const columns = [
      {
        title: '加号时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '订单号',
        dataIndex: 'orderStr',
        key: 'orderStr',
      },
      {
        title: '医院订单号',
        dataIndex: 'hospitalTradeno',
        key: 'hospitalTradeno',
      },
      {
        title: '科室名称',
        dataIndex: 'deptName',
        key: 'deptName',
      },
      {
        title: '医生名称',
        dataIndex: 'doctorName',
        key: 'doctorName',
      },
      {
        title: '用户',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '就诊人姓名',
        dataIndex: 'patientName',
        key: 'patientName',
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        // sorter: (a, b) => a.fee - b.fee,
      },      
      {
        title: '订单金额',
        dataIndex: 'fee',
        key: 'fee',
      },
    
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (e) => {
           console.log("s",e)
          return (
            <span>
              <a target="_blank" onClick={
                
                () => {
                  this.getDetail(e.id);
                  this.showDrawer();
                  //const w=window.open('about:blank');
                 // w.location.href='http://'+window.location.host+'/#/business/add/detail?'+'id='+e.id
                }
                
                
                // () => hashHistory.push({pathname: '/order/detail', query: {orderId: e.orderId}})
              
              }>查看详情</a>
              {e.statusName === '异常订单'&&addRefund ? <span className="divider-v" /> : ''}
              {e.statusName === '异常订单'&&addRefund ? <a onClick={() => this.back(e.hospitalTradeno)}>退费</a> : ''}
              {e.statusName === '异常订单'&&addNormal ? <span className="divider-v" /> : ''}
              {e.statusName === '异常订单'&&addNormal ? <a onClick={() => this.setNormal(e.hospitalTradeno)}>设置为正常</a> : ''}

           
            </span>
          );
        },
      },
    ];

     console.log("pp",this.state)
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
        time:new Date(item.createTime).getFullYear() + '-' + ( new Date(item.createTime).getMonth() + 1) + '-' +  new Date(item.createTime).getDate() + ' ' +  new Date(item.createTime).getHours() + ':' +(new Date(item.createTime).getMinutes()<10?'0':'')+  new Date(item.createTime).getMinutes()+ ':' +(new Date(item.createTime).getSeconds()<10?'0':'')+  new Date(item.createTime).getSeconds(),
        orderStr: item.orderStr,
        deptName: item.deptName,
        doctorName: item.doctorName,
        hospitalTradeno:item.hospitalTradeno,
        userName: item.userName,
        patientName:item.patientName,
        status:item.statusName||'',
        fee: (item.fees / 100).toFixed(2),
        action: {id: item.id,statusName:item.statusName,  hospitalTradeno:item.hospitalTradeno},
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
            {inquiry!=''&&<div className="p-opt-cs-dtl">
            <div style={{padding:30,backgroundColor:'#fff'}}>
           <div className="m-info">
              <div className="info-hd">订单信息</div>
              <div className="info-bd">
              
                  <div className="item" style={{'flex':'50%'}}>
                    <div className="item-key">订单号：</div>
                    <div className="item-value">{inquiry!=''&&inquiry.orderStr||''}</div>

                  </div>
                  <div className="item" style={{'flex':'50%'}}>
                    <div className="item-key">医院订单号：</div>
                    <div className="item-value">{inquiry!=''&&inquiry.hospitalTradeno||''}</div>

                  </div>
                 
              </div>
              <div className="info-bd">
                  <div className="item" style={{'flex':'50%'}}>
                  <div className="item-key">就诊时间：</div>
                  <div className="item-value">{inquiry!=''&&inquiry.orderDate.substring(0,10)+" "+(inquiry.times=='上午'?'11:00-11:30':inquiry.times=='礼嘉分院'?'15:30-16:00':'17:00-17:30')||''}</div>
                </div>
                <div className="item" style={{'flex':'50%'}}>
                  <div className="item-key">订单金额：</div>
                  <div className="item-value">￥{inquiry!=''&&(inquiry.fees / 100).toFixed(2)}</div>
                </div>
               
              
              </div>
              <div className="info-bd">
              <div className="item" style={{'flex':'50%'}}>
              <div className="item-key">订单状态：</div>
              <div className="item-value">{inquiry!=''&&inquiry.statusName}</div>
            </div>
              <div className="item" style={{'flex':'50%'}}>
                <div className="item-key">号别：</div>
                <div className="item-value">{inquiry!=''&&inquiry.registLevel||''}</div>
              </div>
    
            </div>
            </div>
    
            <div className="m-info">
              <div className="info-hd">用户信息</div>
              <div className="info-bd">
     
                <div className="item">
                  <div className="item-key">用户名：</div>
                  <div className="item-value">{inquiry!=''&&inquiry.userName||'暂无'}</div>
                </div>
                <div className="item">
                  <div className="item-key">就诊人：</div>
                  <div className="item-value">{inquiry!=''&&inquiry.patientName}</div>
                </div>
                <div className="item">
                  <div className="item-key">用户编号：</div>
                  <div className="item-value">{inquiry!=''&&inquiry.userId||''}</div>
                </div>
              </div>
            </div>
    
            <div className="m-info">
              <div className="info-hd">业务类型</div>
              <div className="info-bd">
                <div className="item">
                  <div className="item-key">业务类型：</div>
                  <div className="item-value">诊疗类</div>
                </div>
                <div className="item">
                  <div className="item-key">订单类型：</div>
                  <div className="item-value">加号</div>
                </div>
              </div>
            </div>
    
            <div className="m-info">
              <div className="info-hd">医生信息</div>
              <div className="info-bd">
                <div className="item">
                  <div className="item-key">咨询医生</div>
                  <div className="item-value">{inquiry!=''&&inquiry.doctorName||''}</div>
                </div>
               
              </div>
            </div>
            <div className="m-msg">
           <div className="msg-go" onClick={()=>{
             window.location.href='http://'+window.location.host+'/#/operate/consult/detail?'+'inquiryId='+inquiry.inquiryId
           }}>进入咨询详情</div>
          
         </div>
           </div>
           
    
          </div>}
    </Drawer>
      {this.state.cardShow&&<div className='modal'
           onClick={(e)=>{
            this.setState({
            cardShow:false,
            valicode:'',
            isSendValidate:true,
            })
            }}>
            <div className='modal-body-register'
            onClick={(e)=>{
            e.stopPropagation()
            }}
            >
            <div className='modal-title'>
               <p className='title'>短信验证</p>
               <p className='sub-title'>为了你的安全，请先短信验证</p>
            </div>
            <div className='modal-content-register'>
                 <input className='ant-input' maxLength='11' type='tel' placeholder='请输入手机号'  readOnly
                 value={this.state.phone}
                
                 />
                 <input  className='ant-input' maxLength='6' type='tel'  placeholder='请输入验证码' 
                 value={this.state.valicode}
                 onChange={(e)=>{
                  this.setState({
                    valicode:e.target.value
                  })
             }}
                 />
                {this.state.isSendValidate&&<span onClick={()=>{
                      this.getCode();
                 }}>获取验证码</span>
                }
                 {!this.state.isSendValidate&&<span>{this.state.leftTime} s 后重试</span>}
            </div>
            {this.state.phone&&this.state.valicode&&<div className='modal-btn-register'>
                 <p onClick={()=>{
                  this.checkCode(this.state.orderId,this.state.pnum);
                }}>确定</p>
            </div>}
            {(this.state.phone==''||this.state.valicode=='')&&<div className='modal-btn-register1'>
                <p >确定</p>
            </div>}
            </div>
         </div>}
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
          <Option value="0">未就诊</Option>
          <Option value="1">待付款</Option>
           <Option value="2">已就诊</Option> 
          <Option value="3">已超时</Option>
          <Option value="4">已过期</Option>
          <Option value="5">加号失败</Option>
          <Option value="6">已退号</Option>
          <Option value="7">异常订单</Option>

        </Select>
        <span>用户：</span>
        <Input onChange={e=>this.setState({userName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:120}} size="large" placeholder="请输入用户姓名" />
        <span>就诊人：</span>
        <Input onChange={e=>this.setState({patientName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:120}} size="large" placeholder="请输入就诊人姓名" />

          <RangePicker size="large"   value={this.state.dates} onChange={this.changeDate} disabledDate={this.disabledDate} locale={locale.DatePicker} />
          <Button size="large" type="primary" onClick={() => this.query(1)}>确 定</Button>
          {/* <Button size="large" onClick={this.reset}>重 置</Button> */}
        </div>

        <div>
          <Table
          locale={locale.Table}
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
  const { addordList } = state;
  return {
    ...addordList,
  };
})(OrdList);
