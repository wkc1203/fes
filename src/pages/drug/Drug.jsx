import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert, Icon,Switch, Checkbox, DatePicker,InputNumber, Modal, Upload, message, Input,Select,Drawer } from 'antd';
import { formatDate } from '../../utils/utils';
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

class Drug extends React.Component {
  state = {
    ids: [],
    doctorName: '',
    auditSuggest:'',
    pageNum:'',
    deptName:'',
    patientName:'',
    showDetail:false,
    showModal:false,
    auditStatus:'',
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
    this.getImg();
    this.updateImg();
  }
  showMobile= (phone)=>{
    if(phone==''){
      this.setState({
        show:true
      })
    }
}
getImg = () => {
  const { dispatch } = this.props;
  dispatch({
    type: 'drug/getImg',
    payload:{hisId:sessionStorage.getItem('hisId'),doctorId:sessionStorage.getItem('account')},
  });
}
updateImg = () => {
  const { dispatch } = this.props;
  dispatch({
    type: 'drug/updateImg',
    payload:{hisId:sessionStorage.getItem('hisId'),doctorId:sessionStorage.getItem('account')},
  });
}
changeDet = (payload) => {
  const { dispatch } = this.props;
  dispatch({
    type: 'drug/changeDet',
    payload,
  });
}
changeDet1 = () => {
  document.getElementById('mobile').value='';
}
changeSer1 = (checked) => {
  this.setState({isOnDuty: checked});
  this.changeDuty(false, 1);
  this.changeDuty(false, 2);
}
changeStatus = () => {
 // this.setState({ isStatus: !this.state.isStatus });
  if(this.props.detail.status=='1'){
    this.changeDet({status:'2'});
  }else{
    this.changeDet({status:'1'});
  }
}
changeSer = () => {
  this.setState({ isOnDuty1: !this.state.isOnDuty1 });
  if(this.state.isOnDuty1){
      const {dispatch}=this.props;
      dispatch({
          type: 'drug/changeRef',
          payload:{reviewAdmin:'0',reviewDoctor:''},
      });

  }

}
changeDuty = (checked, type) => {
const { dispatch } = this.props;
if (type == 1) {
  dispatch({
    type: 'drug/changegraphic',
    payload: {isOnDuty: checked ? 1 : 0},
  });
}
if (type == 2) {
  dispatch({
    type: 'drug/changevideo',
    payload: {isOnDuty: checked ? 1 : 0},
  });
}
if (type == 3) {
  dispatch({
    type: 'drug/changeradio',
    payload: {isOnDuty: checked ? 1 : 0},
  });
}
}
changeDuty1 = (type) => {
  if(!!this.props.referral&&!!this.props.referral){
      if(type==1){
          const { dispatch } = this.props;
           var value=!!this.props.referral.reviewAdmin?this.props.referral.reviewAdmin:'';
           if(value=='1'){
               value='0';
           }else{
              value='1';
           }
          var payload={reviewAdmin:value};
          dispatch({
              type: 'drug/changeRef',
              payload,
          });
      }
      if(type==2){
          const { dispatch } = this.props;
          var value=!!this.props.referral.reviewDoctor?this.props.referral.reviewDoctor:'';
           if(value=='3'){
               value='2';
           }else{
               if(value=='2'){
                  value='3';
               }else{
                   if(value=='1'){
                      value='';
                   }else{
                      value='1';
                   }
                      
               }
           }
          var payload={reviewDoctor: value };
          dispatch({
              type: 'drug/changeRef',
              payload,
          });
      }
      if(type==3){
          const { dispatch } = this.props;
          var value=!!this.props.referral.reviewDoctor?this.props.referral.reviewDoctor:'';
          if(value=='3'){
              value='1';
          }else{
              if(value=='1'){
                 value='3';
              }else{
                  if(value=='2'){
                      value='';
                  }else{
                      value='2';
                  }
                 
              }
          }
          var  payload={reviewDoctor: value };
          dispatch({
              type: 'drug/changeRef',
              payload,
          });
      }
  }else{
      if(type==1){
          const { dispatch } = this.props;
          var payload={reviewAdmin:'1'};
          dispatch({
              type: 'drug/changeRef',
              payload,         
          });
      }
      if(type==2){
          const { dispatch } = this.props;
          var payload={reviewDoctor: '1' };
          dispatch({
              type: 'drug/changeRef',
              payload,
          });
      }
      if(type==3){
          const { dispatch } = this.props;
          var  payload={reviewDoctor: '2' };
          dispatch({
              type: 'drug/changeRef',
              payload,
          });        
      }
  }
  console.log("pprop",this.props)
}
changeMoney = (v, type) => {
  if (/^\d+(\.\d{0,2})?$/.test(v) || v === '') {
    const { dispatch } = this.props;
    if (type == 1) {
      dispatch({
        type: 'drug/changegraphic',
        payload: {remune: v},
      });
    }
    if (type == 2) {
      dispatch({
        type: 'drug/changevideo',
        payload: {remune: v},
      });
    }
    if (type ==3) {
      dispatch({
        type: 'drug/changeradio',
        payload: {remune: v},
      });
    }
  }
}
beforeUpload = (file) => {
  console.log("f",file);
  if (/^[\s\S]+\.png|[\s\S]+\.jpg|[\s\S]+\.jpeg$/.test(file.name)) {
    return true;
  } else {
    message.warning('请选择正确格式的图片文件上传', 2);
    return false;
  }
}
beforeUpload1 = (file) => {
  if (/^[\s\S]+\.png|[\s\S]+\.jpg|[\s\S]+\.jpeg$/.test(file.name)) {
    return true;
  } else {
    message.warning('请选择正确格式的图片文件上传', 2);
    return false;
  }
}
fileChange1 = (info) => {
  if (/^[\s\S]+\.png|[\s\S]+\.jpg|[\s\S]+\.jpeg$/.test(info.file.name)) {
    this.setState({fileList1: [info.file]});
  }
  if (info.file.status === 'done') {
    if (info.file.response.code === 0) {
      message.success(info.file.response.msg, 2);
      this.changeDet({circleImage: info.file.response.data});
      this.setState({showModal1: false, fileList1: []});
    } else if (info.file.response.code === 999) {
      message.error(info.file.response.msg, 3, () => hashHistory.push({pathname: '/login'}));
    } else {
      message.error(info.file.response.msg);
    }
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 文件上传失败`);
  }
}
fileChange = (info) => {
  if (/^[\s\S]+\.png|[\s\S]+\.jpg|[\s\S]+\.jpeg$/.test(info.file.name)) {
    this.setState({fileList: [info.file]});
  }
  if (info.file.status === 'done') {
    if (info.file.response.code === 0) {
      message.success(info.file.response.msg, 2);
      var image=new Image();
      image.src = info.file.response.data;
      var Img=new Image();
       Img.src = info.file.response.data;
       console.log("image",image.width,image.height)
      if (image.width < 1200&& image.height < 1340) {
        Img.width = 1200;   //以框的宽度为标准
        Img.height =1340;
      }else{
          if (1200/ 1340  <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
          {
              Img.width = 1200;   //以框的宽度为标准
              Img.height =1340
          } 
          else {   //原图片宽高比例 小于 图片框宽高比例
              Img.width = 1200;
              Img.height = 1340  ;   //以框的高度为标准
          }

      }
      console.log("img",Img);
      console.log("image",Img.width,Img.height)
      

      this.changeDet({image: Img.src});
      

      this.setState({showModal1: false, fileList: []});
    } else if (info.file.response.code === 999) {
      message.error(info.file.response.msg, 3, () => hashHistory.push({pathname: '/login'}));
    } else {
      message.error(info.file.response.msg);
    }
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 文件上传失败`);
  }
}
cancelModal=()=>{
  this.setState({
    showModal:false
  })
}

  query = (pageNum) => {
    const { dispatch } = this.props;
    this.setState({
      pageNum:pageNum,
    })
    console.log("s",pageNum,this.state.name)

    dispatch({
      type: 'drug/list',
      payload: {
        pageNum,
        doctorName:this.state.doctorName,
        deptName:this.state.deptName,
        patientName:this.state.patientName,
        auditStatus:this.state.auditStatus,
        submitPrescStartDate:this.state.submitPrescStartDate?this.state.submitPrescStartDate+ ' 00:00:00':'',
        submitPrescEndDate:this.state.submitPrescEndDate?this.state.submitPrescEndDate+ ' 23:59:59':'',
        hisId: sessionStorage.getItem('hisId'),
      },
    });
    console.log('this.props',this.props)
  }
  action = (ids, operType,code) => {
    this.getImg();
    var that=this;
    this.updateImg();
    if(!!this.props.signImg.signatureImg){
         if(operType=='4'&&this.state.auditSuggest==''){
            message.warning('请完善审核备注，注明审核不通过的原因', 2);
           return false;
         }
          const { dispatch } = this.props;
          // var id=[];
          // id.push(ids);
            confirm({
              content: '操作不可撤销，是否确定？',
              onOk() {
                dispatch({ type: 'drug/action', payload: {id:ids, auditStatus:operType,pharDoctorId:sessionStorage.getItem('account'),auditSuggest:that.state.auditSuggest,hisId:sessionStorage.getItem('hisId') } });
                console.log(that.props)
                if(!!code){
                  that.qrCode(code)
                }
                
              },
            }); 
    }else{
      Modal.info({
        // title: (<span className="model2">备注信息</span>),
        iconType:'',
        footer:null,
        maskClosable:true,
        okText:'',
        cancelText:'',
        content: (
          <div style={{color:'#333',width:'250px',textAlign:'center'}}>
            {/* <QRCode value={this.props.signUrl&&this.props.signUrl.data.url} size={220} /> */}
            {/* <QRCode value={} size={220} /> */}
            {/* <p>请打开手机app扫一扫识别二维码完成电子签章信息采集</p> */}
            失败
          </div>
        
          ),
        // onOk() {},
      });
    }
  }
  action1 = (ids, operType) => {
    var that=this;
    if(!!this.props.signImg.signatureImg){
      Modal.info({
        /*  title: (<span className="model2">审核备注</span>), */
        iconType:'',
        footer:null,
        maskClosable:true,
        okText:'确定',
        cancelText:'取消',
        content: (
          <div style={{color:'#333',width:'300px',textAlign:'center',position:'relative',left:'-42px'}}>
                <TextArea placeholder='请输入审核备注' 
                onChange={(e)=>{
                  console.log(e.target)
                  that.setState({
                  auditSuggest:e.target.value
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
                dispatch({ type: 'drug/action', payload: {ids:ids, auditStatus:operType,pharDoctorId:sessionStorage.getItem('account'),auditSuggest:that.state.auditSuggest,hisId:sessionStorage.getItem('hisId') } });
              },
            });
         },
      });
             
    }else{
      Modal.info({
        /*  title: (<span className="model2">审核备注</span>), */
        iconType:'',
        footer:null,
        maskClosable:true,
        className:'qrcode',
        okText:'',
        cancelText:'',
        content: (
          <div style={{color:'#333',width:'250px',textAlign:'center'}}>
            <QRCode value={that.props.signUrl&&that.props.signUrl.data.url} size={220} />
            <p>请打开手机扫一扫识别二维码完成电子签章信息采集</p>
          </div>
        
          ),
          onOk() { that.getImg();
            that.updateImg();},
      });
    }
    

   
  }
  actions = (operType) => {
    this.getImg();
    this.updateImg();
    var that=this;
    if (this.state.ids.length > 0) {
          //this.action(this.state.ids.join(','), operType);
          if(!!this.props.signImg.signatureImg){
          const { dispatch } = this.props;
          
          confirm({
            content: '操作不可撤销，是否确定？',
            onOk() {
              dispatch({ type: 'drug/actions', payload: {ids:that.state.ids.join(','), auditStatus:operType,pharDoctorId:sessionStorage.getItem('account'),auditSuggest:that.state.auditSuggest,hisId:sessionStorage.getItem('hisId') } });
            },
          });
        }else{
          Modal.info({
            // title: (<span className="model2">备注信息</span>),
            iconType:'',
            footer:null,
            maskClosable:true,
            okText:'',
            className:'qrcode',
            cancelText:'',
            content: (
              <div style={{color:'#333',width:'250px',textAlign:'center'}}>
                <QRCode value={that.props.signUrl&&that.props.signUrl.data.url} size={220} />
                <p>请打开手机扫一扫识别二维码完成电子签章信息采集</p>
              </div>
            
              ),
             onOk() { that.getImg();
              that.updateImg();},
          });
        }


    } else {
      message.warning('请选择！', 2);
    }
  }
  
 onClose=()=>{
   this.setState({
     showDetail:false
   })
 }
 showM=(docId,id)=>{
  this.setState({
    showModal:true,
  })
  const { dispatch } = this.props;
   this.getFunc();
  dispatch({ type: 'drug/detail', payload: {id:id,hisId:sessionStorage.getItem('hisId'),signFlag:'1' } }); 
  }
  show=(id)=>{
    this.setState({
      showDetail:true,
      auditSuggest:'',
    })
    const { dispatch } = this.props;
    dispatch({ type: 'drug/detail', payload: {id:id,hisId:sessionStorage.getItem('hisId'),signFlag:'1' } });
 
    
    }
  reset = (doctorId,id) => {
    const { dispatch } = this.props;
    confirm({
      content: '重置密码操作不可撤销，是否确定重置密码？',
      onOk() {
        dispatch({ type: 'drug/reset', payload: {account: doctorId,id:id,hisId:sessionStorage.getItem('hisId') } });
      },
    });
  }
  qrCode = (code) => {
    var that = this
    // doctorId, deptId,ticket
    // const form =  document.getElementById('exportCode');// eslint-disable-line
    // const scene =  document.getElementById('scene');// eslint-disable-line
    // scene.value = `doctorId=${doctorId}&deptId=${deptId}&ticket=${ticket}`;
    // form.submit();
    Modal.info({
      // title: (<span className="model2">备注信息</span>),
      iconType:'',
      footer:null,
      maskClosable:true,
      okText:'确定',
      cancelText:'',
      content: (
        <div style={{color:'#333',width:'250px',textAlign:'center'}}>
          {/* <QRCode value={this.props.signUrl&&this.props.signUrl.data.url} size={220} /> */}
            <QRCode value={code} size={220} />
          <p>请打开手机app扫一扫识别二维码完成电子签章信息采集</p>
        </div>
      
        ),
      onOk(){
        const { dispatch } = that.props;
        dispatch({type:'drug/ewm'})
      },
    });
  }
  render() {
    console.log("hisp",this.props.location.query.operate);
    var operateList='';
    var doctorAdd=false;
    var doctorStart=false;
    var doctorStop=false;
    var doctorEdit=false;
    var doctorDel=false;
    var doctorReset=false;
    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='DOCTOR_ADD')
          {
           doctorAdd=true;
          }
          if(operateList[i]=='DOCTOR_START')
          {
           doctorStart=true;
          }
          if(operateList[i]=='DOCTOR_STOP')
          {
           doctorStop=true;
          }
          if(operateList[i]=='DOCTOR_EDIT')
          {
           doctorEdit=true;
            
          }
          if(operateList[i]=='DOCTOR_DEL')
          {
           doctorDel=true;
            
          }
          if(operateList[i]=='DOCTOR_RESET')
          {
           doctorReset=true;
            
          }
          

  }
    }
     
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    const columns = [{
      title: '创建时间',
      dataIndex: 'createDate',
    }, {
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
    }, {
      title: '性别',
      dataIndex: 'patientSex',
    }, {
      title: '年龄',
      dataIndex: 'patientAge',
    },  {
      title: '体重(kg)',
      dataIndex: 'patientWeight',
    }, {
      title: '就诊卡号',
      dataIndex: 'patCardNo',
    }, {
      title: '金额(元)',
      dataIndex: 'totalFee',
    }, {
      title: '处方状态',
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
            {action.pharSignStatus == 'WAITING_USER_SIGN'&&<span className="divider-v" />}
            {action.pharSignStatus == 'WAITING_USER_SIGN'&&<a onClick={() =>
            this.qrCode(action.pharSignQr)
            }>二维码</a>}
            {action.status=='2'&&action.auditStatus=='0'&&<span className="divider-v" />}
           {action.status=='2'&&action.auditStatus=='0'&&<a onClick={() =>
              this.action(action.id,'2',action.pharSignQr)
              }>通过</a>}
              {action.status=='2'&&action.auditStatus=='0'&&<span className="divider-v" />}
              {action.status=='2'&&action.auditStatus=='0'&&<a className="delete" 
              onClick={() => this.action1(action.id,'4')}>不通过</a>}
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
        doctorName: item.doctorName,
        hisDoctorName:item.hisDoctorName,
        deptName: item.deptName,
        hospitalCode: !!item.hospitalCode=='0001'?'渝中本部':'礼嘉分院',
        patientName: item.patientName,
        patientSex: item.patientSex,
        patientAge: item.patientAge,
        patientWeight:!!item.patientWeight?item.patientWeight:'',
        patCardNo: item.patCardNo,
        totalFee: item.totalFee/100,
        statusName: item.auditStatus=='-1'?'未提交':item.auditName,
        action: {id: item.id, doctorId: item.doctorId, status:item.status,auditStatus:item.auditStatus,pharSignStatus:item.pharSignStatus,pharSignQr:item.pharSignQr},
      };
    }) : [];
    return (
      <div className="page-doc1-mng">
        <div className="query-box-drug">
        <div style={{marginBottom:'10px',fontWeight:'bold'}}>  查询条件</div>
          <span>申请时间：</span>
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
            value={this.state.auditStatus}
            onChange={value => this.setState({auditStatus: value})}
          >
            <Option value="">全部</Option>
            <Option value="0">审核中</Option>
            <Option value="2">已通过</Option>
            <Option value="4">未通过</Option>

          </Select>
          <Button size="large"   type="primary" onClick={() => this.query(1)}>确 定</Button>
          
            
            
        </div>{/* this.query(1) */}
        <div style={{marginBottom:'35px',fontWeight:'bold'}}>  审方列表
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
          rowSelection={{
            selectedRowKeys: this.state.ids,
            onChange: (selectedRowKeys) => {
              
              this.setState({ids: selectedRowKeys});
            },
          }}
        />
        <div style={{position:'relative',top: '-43px',width:'500px'}}>
            {/* {<Button style={{marginRight: '10px'}}  size="large" onClick={() => this.actions('2')}>批量通过</Button>} */}
              {/* <Button style={{marginRight: '10px'}} size="large" onClick={() => this.actions('4')}>批量不通过</Button> */}
              <span style={{color: '#108ee9'}}>已选中{this.state.ids.length}条数据</span>
        </div>
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
                            <div className="name">{item.Drug_name}</div>
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
            {this.props.detail.status=='2'&&this.props.detail.auditStatus=='0'&&<div>
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
                
            </div>}
            {this.props.detail.status=='2'&&this.props.detail.auditStatus=='0'&&<div className="btn" style={{borderBottom:'none'}}>
                   <p className="left" onClick={()=>this.action(this.props.detail.id,'2')}>通过</p>
                   <p className="right" onClick={()=>this.action(this.props.detail.id,'4')}>不通过</p>
           </div> }
           {/* {this.props.detail.status!=='0'&&this.props.detail.status!=='1'&&this.props.detail.status!=='2'&&!!this.props.detail.pharDoctorId&&<div> */}
            {!!this.props.detail.pharDoctorId&&<div>
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
            </div>}
             
          </div>}
        </Drawer>
      </div>
    );
  }
}
export default connect((state) => {
  const { drug } = state;
  return {
    ...drug,
  };
})(Drug);
