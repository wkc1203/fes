import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert, Icon,Switch, Checkbox, DatePicker,InputNumber, Modal, Upload, message, Input,Select,Drawer } from 'antd';
import { formatDate } from '../../../utils/utils';
import './style.less';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const {RangePicker} = DatePicker
const dateFormat = 'YYYY-MM-DD';
const QRCode = require('qrcode.react');
const { TextArea } = Input;
const confirm = Modal.confirm;
import "cropperjs/dist/cropper.css";
import Cropper from 'react-cropper';
const content = (
  <div>数字越大越靠前</div>
);

class prescription extends React.Component {
  state = {
    ids: [],
    doctorName: '',
    auditSuggest:'',
    refundtext:'',
    pageNum:'',
    deptName:'',
    patientName:'',
    showDetail:false,
    showModal:false,
    auditStatus:'',
    status:'',
    isOnDuty: true,
    isOnDuty1: true,
    isStatus:true,
    hideMobile:'',
    show:false,
    showMore:false,
    src: null,
    img:'',
    dates: [
      // moment(formatDate(new Date(new Date() - (365 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
    submitPrescStartDate:'',
    submitPrescEndDate:'',
  }
  changeDate = (dates, dateStrings) => {
    this.setState({
      dates,
      submitPrescStartDate: dateStrings[0],
      submitPrescEndDate: dateStrings[1],
    });
  }
  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }
  componentDidMount(){
    this.query(1);
  }



  query = (pageNum) => {
    const { dispatch } = this.props;
    this.setState({
      pageNum:pageNum,
    })
    console.log("s",pageNum,this.state.name)

    dispatch({
      type: 'prescription/list',
      payload: {
        pageNum,
        doctorName:this.state.doctorName,
        deptName:this.state.deptName,
        patientName:this.state.patientName,
        status:this.state.status,
        prescStartDate:this.state.submitPrescStartDate?this.state.submitPrescStartDate+ ' 00:00:00':'',
        prescEndDate:this.state.submitPrescEndDate?this.state.submitPrescEndDate+ ' 23:59:59':'',
        hisId: sessionStorage.getItem('hisId'),
      },
    });
  }

  action = (ids, operType) => {
    var that=this;

    if(operType=='12'&&this.state.refundtext==''){
      message.warning('请完善审核备注，注明审核不通过的原因', 2);
      return false;
    }
    const { dispatch } = this.props;
  
      confirm({
        content: '操作不可撤销，是否确定？',
        onOk() {
          dispatch({ type: 'prescription/refund', 
          payload: {id:ids, 
                    // auditStatus:operType,
                    operatorId:sessionStorage.getItem('account'),
                    cancelReason:that.state.refundtext,
                    hisId:sessionStorage.getItem('hisId'),
                    // operator:operatorId
                  },
          callback:(res)=>{
            console.log(res)
          }

          });
        },
    }); 

    
  }

  action1 = (ids, operType) => {
    var that=this;
      Modal.info({
        /*  title: (<span className="model2">审核备注</span>), */
        iconType:'',
        footer:null,
        maskClosable:true,
        okText:'确定',
        cancelText:'取消',
        content: (
          <div style={{color:'#333',width:'300px',textAlign:'center',position:'relative',left:'-42px'}}>
                <TextArea placeholder='请输入退款原因' 
                onChange={(e)=>{
                  console.log(e.target)
                  that.setState({
                    refundtext:e.target.value
                  })
                }} style={{height:'100px'}}></TextArea>
          </div>
          ),
         onOk() {
          const { dispatch } = that.props;
          var id=[];
          id.push(ids);
          
            confirm({
              content: '操作不可撤销，是否确定？',
              onOk() {
                dispatch({ type: 'prescription/refund', 
                  payload: {id:ids, 
                    // auditStatus:operType,
                    operatorId:sessionStorage.getItem('account'),
                    cancelReason:that.state.refundtext,
                    hisId:sessionStorage.getItem('hisId'),
                    // operator:operatorId
                  },
                  callback:(res)=>{
                    console.log(res)
                  }
              
                });
              },
            });
         },
      });
  }

  // actions = (operType) => {
  //   this.getImg();
  //   this.updateImg();
  //   var that=this;
  //   if (this.state.ids.length > 0) {
  //         //this.action(this.state.ids.join(','), operType);
  //         if(!!this.props.signImg.signatureImg){
  //         const { dispatch } = this.props;
          
  //         confirm({
  //           content: '操作不可撤销，是否确定？',
  //           onOk() {
  //             dispatch({ type: 'prescription/action', payload: {ids:that.state.ids.join(','), auditStatus:operType,pharDoctorId:sessionStorage.getItem('account'),auditSuggest:that.state.auditSuggest,hisId:sessionStorage.getItem('hisId') } });
  //           },
  //         });
  //       }else{
  //         Modal.info({
  //           // title: (<span className="model2">备注信息</span>),
  //           iconType:'',
  //           footer:null,
  //           maskClosable:true,
  //           okText:'',
  //           className:'qrcode',
  //           cancelText:'',
  //           content: (
  //             <div style={{color:'#333',width:'250px',textAlign:'center'}}>
  //             <QRCode value={that.props.signUrl&&that.props.signUrl.data.url} size={220} />
  //             <p>请打开手机扫一扫识别二维码完成电子签章信息采集</p>
  //             </div>
            
  //             ),
  //            onOk() { that.getImg();
  //             that.updateImg();},
  //         });
  //       }


  //   } else {
  //     message.warning('请选择！', 2);
  //   }
  // }
  
 onClose=()=>{
   this.setState({
     showDetail:false
   })
 }


  show=(id)=>{
    this.setState({
      showDetail:true,
      refundtext:'',
    })
    const { dispatch } = this.props;
    dispatch({ type: 'prescription/detail', payload: {id:id,hisId:sessionStorage.getItem('hisId'),signFlag:'1' } });
  }



  render() {

    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    const columns = [{
      title: '开单时间',
      dataIndex: 'createDate',
    },
    {
      title: '订单号',
      dataIndex: 'orderId',
    },
    {
      title: '医院订单号',
      dataIndex: 'hospitalTradeno',
    },
    {
      title: '开单医生',
      dataIndex: 'doctorName',
    },  {
      title: '开单科室',
      dataIndex: 'deptName',
    },{
      title: '开单院区',
      dataIndex: 'hospitalCode',
    }, {
      title: '患者姓名',
      dataIndex: 'patientName',
    },
    
    // {
    //   title: '性别',
    //   dataIndex: 'patientSex',
    // }, {
    //   title: '年龄',
    //   dataIndex: 'patientAge',
    // },  {
    //   title: '体重(kg)',
    //   dataIndex: 'patientWeight',
    // }, {
    //   title: '就诊卡号',
    //   dataIndex: 'patCardNo',
    // }, 
    
    {
      title: '金额(元)',
      dataIndex: 'totalFee',
    }, {
      title: '订单状态',
      dataIndex: 'statusName',
    },{
      title: '操作',
      dataIndex: 'action',
      render: (action) => {
        return (
          <span>
           <a onClick={() =>
            this.show(action.id)
            }>详情</a>

            {action.status=='12'&&<span className="divider-v" />}
            {action.status=='12'&&<a className="delete" onClick={() =>
              this.action1(action.id)
              }>退款</a>}
       
            {/* {action.status=='2'&&action.auditStatus=='0'&&<span className="divider-v" />}
           {action.status=='2'&&action.auditStatus=='0'&&<a  onClick={() =>
              this.action(action.id,'2')
              }>通过</a>}
              {action.status=='2'&&action.auditStatus=='0'&&<span className="divider-v" />}
              {action.status=='2'&&action.auditStatus=='0'&&<a className="delete" 
              onClick={() => this.action1(action.id,'4')}>不通过</a>} */}

          </span>
        );
      },
    }];
      console.log(this.props.data&&this.props.data.recordList)
    const data = this.props.data && this.props.data.recordList.length > 0 ?
    this.props.data.recordList.map((item) => {
      return {
        key: item.id,
        createDate: item.createDate,
        orderId:item.orderId,
        hospitalTradeno:item.hospitalTradeno,

        doctorName: item.doctorName,
        hisDoctorName:item.hisDoctorName,
        deptName: item.deptName,
        hospitalCode: !!item.hospitalCode=='0001'?'渝中本部':'礼嘉分院',
        patientName: item.patientName,

        // patientSex: item.patientSex,
        // patientAge: item.patientAge,
        // patientWeight:!!item.patientWeight?item.patientWeight:'',
        // patCardNo: item.patCardNo,

        totalFee: item.totalFee/100,
        statusName: item.statusName,
        action: {id: item.id, doctorId: item.doctorId, status:item.status,auditStatus:item.auditStatus},
      };
    }) : [];
    return (
      <div className="page-doc1-mng">
        <div className="query-box-prescription">
        <div style={{marginBottom:'10px',fontWeight:'bold'}}>  查询条件</div>
          <span>开单时间：</span>
          <RangePicker className="mb16"  value={this.state.dates} onChange={this.changeDate} disabledDate={this.disabledDate} locale={locale.datePicker} />

          <span style={{marginLeft:'10px'}}>开单医生：</span>
          <Input
            type="text"  placeholder="请输入开单医生" className="mb16"
            value={this.state.doctorName} onChange={e => this.setState({doctorName: e.target.value})}
          />
          <span>开单科室：</span>
          <Input
          className="mb16"
            type="text"  placeholder="请输入科室名称"
            value={this.state.deptName} onChange={e => this.setState({deptName: e.target.value})}
          />
          <span>患者姓名：</span>
          <Input
            type="text" placeholder="请输入患者姓名" className="mb16"
            value={this.state.patientName} onChange={e => this.setState({patientName: e.target.value})}
          />
          <span>处方状态：</span>
          <Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            value={this.state.status}
            onChange={value => this.setState({status: value})}
          >
            <Option value="">全部</Option>
            <Option value="3">未支付</Option>
            <Option value="8">已取消</Option>
            <Option value="45">已支付</Option>
            <Option value="12">申请退款中</Option>
            <Option value="11">已退款</Option>

          </Select>
          <Button size="large"   type="primary" onClick={() => this.query(1)}>确 定</Button>
          
            
            
        </div>{/* this.query(1) */}
        <div style={{marginBottom:'35px',fontWeight:'bold'}}>  医生列表
         <div style={{display:'inline',float:'right'}}>
            <Button size="large" style={{marginRight: '10px'}}  onClick={() => this.query(1)}>刷新
            </Button>
           
          </div>
        </div>
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
          //   selectedRowKeys: this.state.ids,
          //   onChange: (selectedRowKeys) => {
              
          //     this.setState({ids: selectedRowKeys});
          //   },
          // }}
        />
        {/* <div style={{position:'relative',top: '-43px',width:'500px'}}> */}
            {/* {<Button style={{marginRight: '10px'}}  size="large" onClick={() => this.actions('2')}>批量通过</Button>} */}

              {/* <Button style={{marginRight: '10px'}} size="large" onClick={() => this.actions('4')}>批量不通过</Button> */}

              {/* <span style={{color: '#108ee9'}}>已选中{this.state.ids.length}条数据</span> */}
        {/* </div> */}
        <Drawer
          title="订单详情"
          placement="right"
          bodyStyle={{
            width: '1200px',
          
          }}  
          width='1200'
          closable={true}
          onClose={this.onClose}
          visible={this.state.showDetail}
        > 
            {this.props.detail&&<div className="page-order-det">

            <div>
              <p className="title">订单信息</p>
                <div>
                  <p>开单时间：<span>{this.props.detail.createDate}</span></p>
                  <p>订单号：<span>{this.props.detail.orderId}</span></p>
                  <p>医院订单号：<span>{this.props.detail.hospitalTradeno}</span></p>
                </div>
                <div>
                  <p>订单金额：<span>￥{this.props.detail.totalFeeDouble}</span></p>
                  <p>订单状态：<span>{this.props.detail.statusName}</span></p>
                  <p></p>
                </div>
            </div>

            <div>
              <p className="title">患者信息</p>
                <div>
                  <p>姓名：<span>{this.props.detail.patientName}</span></p>
                  <p>性别：<span>{this.props.detail.patientSex}</span></p>
                  <p>年龄：<span>{this.props.detail.patientAge}</span></p>
                  <p>体重：<span>{this.props.detail.patientWeight}kg</span></p>
                  { <p>就诊卡号：<span>{this.props.detail.patCardNo}</span></p> }
                  <p>就诊类型：<span>{!!this.props.detail.caseInfo&&this.props.detail.caseInfo.visitType=='3'?'复诊':'初诊'}</span></p>
                </div>
            </div>
            <div>
              <p className="title">就诊信息</p>
                <div>
                  <p>就诊科室：<span>{this.props.detail.deptName}</span></p>
                  <p>就诊医生：<span>{this.props.detail.doctorName}</span></p>
                  <p>开方院区：<span>{!!this.props.detail.subscribeInfo?JSON.parse(this.props.detail.subscribeInfo).hospitalDistrict:''}</span></p>
                  { <p>就诊时间：<span>{!!this.props.detail.subscribeInfo?JSON.parse(this.props.detail.subscribeInfo).viditDate.substring(0,10):''}</span></p> }
                </div>
            </div>
           
            {this.props.detail.caseId&&<div> 
              <p className="title">病历信息</p>
              <div>
                  <p style={{display:'flex'}}><span style={{display:'inline-block'}}>*主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉：</span><span style={{width:'80%'}}>{this.props.caseInfo.chiefComplaint}</span></p>
                  <p style={{display:'flex'}}><span style={{display:'inline-block'}}>*现病史：</span><span style={{width:'80%'}}>{this.props.caseInfo.medicalHistory}</span></p>
              </div>
              <div>
                  <p style={{display:'flex'}}><span style={{display:'inline-block'}}>*既&nbsp;&nbsp;往&nbsp;史：</span><span style={{width:'80%'}}>{this.props.caseInfo.anamnesis}</span></p>
                  <p style={{display:'flex'}}><span style={{display:'inline-block'}}>*体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;检：</span><span style={{width:'80%'}}>{this.props.caseInfo.examination}</span></p>
              </div>
              <div>
                  <p style={{display:'flex'}}><span style={{display:'inline-block'}}>*主要诊断：</span><span style={{width:'80%'}}>{this.props.caseInfo.mainDiagnosis}</span></p>
                  <p style={{display:'flex'}}><span style={{display:'inline-block'}}>其它诊断：</span><span style={{width:'80%'}}>{this.props.caseInfo.otherDiagnosis}</span></p>
              </div>
              <div> 
                <p style={{display:'flex'}}>       
                 <span style={{display:'inline-block'}}>建&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;议：</span>
                 <span style={{width:'80%'}}>{this.props.detail.caseInfo.recommend}
                 </span>
                 </p>
                 </div>
            </div>}
            {!!this.props.detail.recipelList&&<div>
              <p className="title">处置信息</p>
                <div style={{paddingBottom:'5px',fontSize:'26px'}}>℞</div>
                <div style={{display:'block',border: '1px solid #ccc',color:'#333'}}>
                   <div className="item" style={{display:'flex',background:'#efefef',borderTop:'1px solid #ccc'}}>
                       <div className="name" >药品名称</div>
                       <div className="name">规格</div>
                       <div className="name">数量</div>
                       <div className="name">途径</div>
                       <div className="name">用量</div>
                       <div className="name">频次</div>
                   </div>   
                   {
                     !!this.props.detail.recipelList&&JSON.parse(this.props.detail.recipelList).map((item,index)=>{
                       return(
                        <div className="item" key={index}>
                            <div className="name">{item.prescription_name}</div>
                            <div className="name">{item.Package_spec}</div>
                            <div className="name">{item.amount}{item.Package_units}</div>
                            <div className="name">{item.Administration}</div>
                            <div className="name">{item.Dosage}{item.Dosage_unit}</div> 
                            <div className="name">{item.Freq_desc}</div>
                        </div>
                       )
                     })
                   }

                   <div className="item"> 
                      <div className="name">合计金额</div>
                      <div className="name">￥{this.props.detail.totalFee/100}</div>
                   </div>
                </div>
            </div>}

            {this.props.detail.status=='12'&&<div>
              <p className="title">退款原因</p>
                <div>
                   {/* <span style={{marginBottom: '50px',display: 'inline-block'}}>审核备注：</span>     */}
                   <TextArea placeholder='请输入退款原因' value={this.state.refundtext}
                   onChange={(e)=>{
                     this.setState({
                      refundtext:e.target.value
                     })
                   }} style={{width: '92%',height: '70px'}}></TextArea>
                </div>
                <Button className="mt10" type="primary" value="large"  onClick={()=>{ this.refund(this.props.detail.id) }}>退款</Button>
            </div>}

            

            {/* {this.props.detail.status=='2'&&this.props.detail.auditStatus=='0'&&<div>
              <p className="title">审核信息</p>
                <div>
                   <span style={{marginBottom: '50px',display: 'inline-block'}}>审核备注：</span>    
                   <TextArea placeholder='请输入审核备注' value={this.state.auditSuggest}
                   onChange={(e)=>{
                     this.setState({
                      auditSuggest:e.target.value
                     })
                   }} style={{width: '92%',height: '70px'}}></TextArea>
                </div>
                
            </div>} */}

            {/* {this.props.detail.status=='2'&&this.props.detail.auditStatus=='0'&&<div className="btn" style={{borderBottom:'none'}}>
                   <p className="left" onClick={()=>this.action(this.props.detail.id,'2')}>通过</p>
                   <p className="right" onClick={()=>this.action(this.props.detail.id,'4')}>不通过</p>
           </div> } */}
           {/* {this.props.detail.status!=='0'&&this.props.detail.status!=='1'&&this.props.detail.status!=='2'&&!!this.props.detail.pharDoctorId&&<div> */}
            {/* {!!this.props.detail.pharDoctorId&&<div>
                <p className="title">操作信息</p>
                <div className='oper' style={{background:'#efefef'}}>
                  <p>操作说明</p>
                  <p>操作账号</p> 
                  <p>审核药师</p>
                  <p>操作状态</p>
                  <p>电子签名</p>  
                  <p>操作时间</p>
                </div>
                <div className='oper'>
                  <p>审核处方为【{this.props.detail.auditStatus=='2'?'通过':'未通过'}】</p>
                  <p>{this.props.detail.pharDoctorId}</p>
                  <p>{this.props.detail.pharDoctorName}</p>
                  <p>{this.props.detail.auditStatus=='2'?'成功':'失败'}</p>
                  <p>{this.props.detail.auditStatus=='2'?'签名成功':'-'}</p>
                  <p>{this.props.detail.auditDate}</p>
              </div>
            </div>} */}
             
          </div>}
        </Drawer>
      </div>
    );
  }
}
export default connect((state) => {
  const { prescription } = state;
  return {
    ...prescription,
  };
})(prescription);
