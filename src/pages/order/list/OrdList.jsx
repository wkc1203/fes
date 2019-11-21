import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button, Modal, message ,Radio,Drawer,Rate } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../utils/utils';
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
    visible:false,

    phone:'',
    isSendValidate:true,
    leftTime:'',
    valicode:'',
    cardShow:false,
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
    console.log("12121121")
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
    console.log("99999",pageNum)
    const { dispatch,location } = this.props;
    if(location.query.ordertype==='comingOvertime'&&location.query.type){
      dispatch({
        type: 'comingOvertimeList',
        payload: {
          platformId:sessionStorage.getItem('hisId'),
          sort:'DESC',
          orderBy:'createTime',
          pageNum,
          operType:'1',
          numPerPage:10,
          type:location.query.type

        },
      });
    }else{
      console.log("2")
      const payload = {
        hisId:sessionStorage.getItem('hisId'),
        pageNum,
        numPerPage:10,
        // inquiryStatus:this.state.inquiryStatus,
        orderId: this.state.searchId, 
        startDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
        endDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
        sort:'DESC',
        orderBy:'createTime',
        type:this.state.ordertype || '',
        businessType:this.state.type||'',
        operType:'1',

        // orderStatus:this.state.orderStatus||''
      };
      if (this.state.status) {
        payload.orderStatus = this.state.status;
      }
      if (this.state.inquiryStatus) {
        payload.inquiryStatus = this.state.inquiryStatus;
      }

      dispatch({ type: 'ordList/getOrderList', payload });
    }

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
    console.log(this.state.reason)
    var _this =this;
    if (this.state.reason) {
      dispatch({
        type: 'ordList/refund',
        payload: {orderId: this.state.orderId, reason: this.state.reason},
        callback:(res)=>{
            console.log("rr",res);
            if(res.code===0){
              _this.query(_this.state.pnum)
            }
        }
      });

      this.setState({orderId: '', showModal: false, reason: '用户投诉', isInput: true,RadioVal:'1',});
    } else {
      message.warning('请选择或输入退款原因', 2);
    }
  }

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
  getCode(){
    const { dispatch } = this.props;
     if(this.state.phone){
      dispatch({
        type: 'ordList/getcode',
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
  checkCode(orderId,pnum){
    const { dispatch } = this.props;
     if(this.state.phone){
      dispatch({
        type: 'ordList/checkcode',
        payload: {phone: this.state.phone, validateCode:this.state.valicode,type:'refund'},
        callback:(res)=>{
          console.log("res",res)
          if(res.code==0){
            this.setState({
              cardShow:false,
              valicode:'',
              isSendValidate:true,
          });
          this.setState({orderId: orderId, showModal: true,pnum:pnum,});
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
  back=(orderId,pnum)=>{
    if(this.state.phone!=''){
      
      this.setState({orderId: orderId, cardShow: true,pnum:pnum})
    }else{
      Modal.info({
        title:'提示',
        iconType:'',
        content:'您暂无此功能体验权限',
        onOk() {},
      });
    }
    
  }
  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }

  render() {

    console.log("hisp",this.props.location.query.operate);
    var operateList='';
    var refundM=false;
    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='ORDER_REFUND')
          {
            refundM=true;
            break;
          }

  }
    }
     

    const datadetail=this.props.detaildata?this.props.detaildata:'';
    console.log("detail",datadetail);
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
        title: '状态',
        dataIndex: 'status',
        key: 'status',
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
                  //const w=window.open('about:blank');
                 // w.location.href='http://'+window.location.host+'/#/order/detail?'+'orderId='+e.orderId
                 const { dispatch } = this.props;
                 dispatch({
                    type: 'ordList/detail',
                    payload:{orderId:e.orderId,hisId: sessionStorage.getItem('hisId'),}
                  });
                  this.showDrawer();
                }
                
                // () => hashHistory.push({pathname: '/order/detail', query: {orderId: e.orderId}})
              
              }>查看</a>

              {refundM&&(e.status === 'S'|| e.status === 'R' )? <span className="divider-v" /> : ''}
              {refundM&&e.status === 'S' &&e.totalFee!==0? <a onClick={() => this.back(e.orderId,e.pnum)}>退费</a> : ''}
              {refundM&&e.status === 'S' &&e.totalFee==0? <a  style={{color:'#ccc',cursor:'pointer'}} title="免费报告解读不支持退费">退费</a> : ''}
             
              {e.status === 'R' ? <a onClick={() => this.info(e.orderId,e.refundDesc)}>已退费</a> : ''}
            </span>
          );
        },
      },
    ];

    // console.log(this.props.data.currentPage)
    const data = this.props.data && this.props.data.recordList.length > 0 ?
    this.props.data.recordList.map((item, key) => {
      let ordertype = '--';

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
        ordertype:item.businessType=='1'?item.type=='5'?'MDT会诊':ordertype:item.type=='1'?'检查检验单':item.type=='3'?'处方药品':'门诊加号',
        fee: (item.totalFee / 100).toFixed(2),
        user:item.userName,
        patient: item.patientName,
        status: item.statusName?item.statusName:item.orderStatusName?item.orderStatusName:'',
        action: {status: item.orderStatus, orderId: item.orderIdStr,refundDesc:item.refundDesc||'',pnum:this.props.data.currentPage,totalFee:item.totalFee},
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
                {datadetail.businessType=='1'&&datadetail.type==='5'?<p><span>MDT会诊</span></p>:''}
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
            <Option value="U">未支付</Option>
            <Option value="R">已退款</Option>
            {/* <Option value="C">已取消</Option> */}
            <Option value="S">已支付</Option>
          </Select>
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
            <Option value="2">诊疗类</Option>
            {/* <Option value="2">宣教类</Option>
           
            <Option value="4">物流类</Option>
            <Option value="5">其他</Option> */}
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
            <Option value="5">MDT会诊</Option>
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



          <RangePicker size="large"   value={this.state.dates} onChange={this.changeDate} disabledDate={this.disabledDate} locale={locale.datePicker} />
          <Button size="large" type="primary" onClick={() => this.query(1)}>确 定</Button>
          {/* <Button size="large" onClick={this.reset}>重 置</Button> */}
        </div>

        <div>
          <Table
            columns={columns}
            dataSource={data}
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
  const { ordList } = state;
  return {
    ...ordList,
  };
})(OrdList);
