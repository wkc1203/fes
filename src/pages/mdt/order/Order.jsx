import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button, Modal, message ,Radio,Drawer } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../utils/utils';
import './style.less';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class Order extends React.Component {  
  state = {
    searchId: '',
    status: '',
    startDate: '',
    endDate: '',
    visible:false,
    auditStatus:'',
    orderStatus:'',
    patientName:'',
    reportStatus:'',
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
    teamName:'',
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
      const payload = {
        hisId:sessionStorage.getItem('hisId'),
        pageNum,
        numPerPage:10,
        doctorRoomIdList:'',
        timeSort:'',
        patientName:this.state.patientName,
        teamName:this.state.teamName,
        auditStatus:this.state.auditStatus,
        orderStatus:this.state.orderStatus,
        reportStatus:this.state.reportStatus,
        applyStartDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
        applyEndDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
      };
      if (this.state.status) {
        payload.orderStatus = this.state.status;
      }
      if (this.state.inquiryStatus) {
        payload.inquiryStatus = this.state.inquiryStatus;
      } 

      dispatch({ type: 'order/getOrderList', payload });
    

  }

  //搜索重置
  // reset = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'order/getOrderList',
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
        type: 'order/refund',
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
        type: 'order/getcode',
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
        type: 'order/checkcode',
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
  previewImg=(url)=>{
    Modal.info({
      // title: (<span className="model2">备注信息</span>),
      iconType:'',
      footer:null,
      maskClosable:true,
      okText:'',
      cancelText:'',
      content: (
        <img className="prl40" alt="example" style={{ width: '100%' }} src={url} />
      ),
      // onOk() {},
    });
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
    var tmp=[];
    for(var key in datadetail.report&&JSON.parse(datadetail.report).doctor){
      //key是属性,object[key]是值
      tmp.push(JSON.parse(datadetail.report).doctor[key]);//往数组中放值
    }
    console.log("detail",datadetail.report&&JSON.parse(datadetail.report));

    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    
    const columns = [
      {
        title: '申请时间',
        dataIndex: 'applyTimeName',
        key: 'applyTimeName',
      },
      {
        title: '团队名称',
        dataIndex: 'teamName',
        key: 'teamName',
      },
      {
        title: '患者信息',
        dataIndex: 'patientName',
        key: 'patientName',
      },
      {
        title: '审核人',
        dataIndex: 'auditPersonName',
        key: 'auditPersonName',
      },
      {
        title: '审核时间',
        dataIndex: 'auditTimeName',
        key: 'auditTimeName',
        // sorter: (a, b) => a.fee - b.fee,
      },      
      {
        title: '审核状态',
        dataIndex: 'auditName',
        key: 'auditName',
      },
      
      {
        title: '会诊时间',
        dataIndex: 'consultationTimeName',
        key: 'consultationTimeName',
      },
      {
        title: '金额（元）',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '订单状态',
        dataIndex: 'orderName',
        key: 'orderName',
      },
      {
        title: '会诊报告状态',
        dataIndex: 'reportName',
        key: 'reportName',
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
                    type: 'order/detail',
                    payload:{id:e.id,hisId: sessionStorage.getItem('hisId'),}
                  });
                  this.showDrawer();
                }
                
                // () => hashHistory.push({pathname: '/order/detail', query: {orderId: e.orderId}})
              
              }>详情</a>

              {/* <span className="divider-v" />  */}
              { /* <a style={{color:'#e93910'}} onClick={() => this.back(e.orderId,e.pnum)}>退款</a> */ }
             
            </span>
          );
        },
      },
    ];

    // console.log(this.props.data.currentPage)
    const data = this.props.data && this.props.data.recordList.length > 0 ?
    this.props.data.recordList.map((item, key) => {
      
      return {
        key: key + 1,
        applyTimeName: item.applyTimeName,
        teamName: item.teamName,
        patientName: item.patientName+"  "+item.patientSex+"  "+item.patientAge,
        auditPersonName: item.auditPersonName,
        auditTimeName:item.auditTimeName,
        auditName: item.auditName,
        consultationTimeName:item.consultationTimeName,
        amount: item.amount,
        orderName: item.orderName,
        reportName: item.reportName,
        
        action: {status: item.status, id: item.id},
      };
    }) : [];

    return (
      <div className="page-order-list">
      <Drawer
      title="订单信息"
      placement="right"
      bodyStyle={{
        width: '1200px',
      
      }}
      width='1200'
      closable={true}
      onClose={this.onClose}
      visible={this.state.visible}
    >
            {datadetail!=''&&<div className="page-order-det1">
            <div>
              <p className="title">患者信息</p>
              <div>
                <p>姓名：<span>{datadetail.patientName}</span></p>
                <p>性别：<span>{datadetail.patientSex}</span></p>
                <p>年龄：<span>{datadetail.patientAge}</span></p> 
                {/* <p>过期时间：<span>2018/06/20 17:35:20</span></p> */}
                <p>就诊卡号：<span>{datadetail.patientCardNo}</span></p>
              
              </div>
              <div>
            
               <p style={{flex:'0.1'}}>患者病史资料：</p>
               <p style={{textAlign:'left'}}>{datadetail.mainDiagnosis} </p>
              </div>
              <div>
              
              {!!datadetail.images&&(JSON.parse(datadetail.images)).length>0&&<p style={{flex:'0.1'}}>其他相关资料：</p>}
             {!!datadetail.images&&(JSON.parse(datadetail.images)).length>0&& <p> {
                !!datadetail.images&&(JSON.parse(datadetail.images)).map((item,index)=>{
                   return(
                          <div className= 'imageType' key={index}>
                         
                          {
                            !!item[Object.getOwnPropertyNames(item)[0]]&&
                            item[Object.getOwnPropertyNames(item)[0]].length>0&&item[Object.getOwnPropertyNames(item)[0]].map((item1,index1)=>{
                              return( 
                                <img key={index1}  src={item1} onClick={()=>{
                                  this.previewImg(item1)
                                }} alt=""/>
                               
                              )
                            })
                          }
                          
                            </div>
                   )
                })
              }</p>}
              </div>

            </div>
            <div>
              <p className="title">会诊信息</p>
              <div>
                <p style={{textAlign:'left'}}>经治医生：<span>{datadetail.patientDoctorName|| '无'}</span></p>
                <p style={{flex:'1'}}>申请时间：<span>{datadetail.applyTimeName|| '无'}</span></p>
                <p>审核人：<span>{datadetail.auditPersonName|| '未知'}</span></p>
                <p>审核时间：<span>{datadetail.auditTimeName|| '无'}</span></p>
                <p>审核状态：<span>{datadetail.auditName|| '未知'}</span></p>
               
                </div>
                <div>
                <p style={{textAlign:'left'}}>会诊团队名称：<span>{datadetail.teamName|| '未知'}</span></p>
                <p style={{textAlign:'left',flex:'2'}}>会诊团队：<span>
                  {datadetail.mdtRoomDoctorVoList.map((item,index)=>{
                    return(
                      item.name+'('+item.deptName+')'+'  '
                    )
                  })}
                    </span></p>
                </div>
                <div>
               
                <p style={{textAlign:'left'}}>会诊时间：<span>{datadetail.consultationTimeName|| '未知'}</span></p>
                <p style={{paddingLeft:'27px'}}>订单状态：<span>{datadetail.orderName}</span></p>
                <p>会诊报告状态：<span>{datadetail.reportName|| '无'}</span></p>
                </div>
            </div>
            {datadetail.inquiryItemList.length>0&&<div>
            <div>
                {datadetail.inquiryItemList.length>0&&<p style={{textAlign:'left'}}>会诊室详情</p>}
                {datadetail.inquiryItemList.length>0&&<div className='details'>
                    <div className="peopleMessage"  onClick={()=>{
                  }}>  
                      <div >
                                  <div className="userName">{datadetail.patientName}</div>
                                  <div className="userMsg">
                                      <div >
                                          <span >{datadetail.patientSex}</span>
                                          <span >{datadetail.patientAge}</span>
                                      </div>
                                      <div >主治医师：<span>{datadetail.patientDoctorName}（{datadetail.patientDoctorTitle}）</span></div>
                                      <div >主要诊断：<span> {datadetail.mainDiagnosis}</span></div>
                                  </div>
                                  
                              </div>
                      </div>
                      <div className='content2' id="content2">
                            {datadetail.inquiryItemList.length>0&&datadetail.inquiryItemList.reverse() && datadetail.inquiryItemList.reverse().map((item, index)=> {
                                return (
                                    <div key={index} className="content-item">
                                        {item.type == 'SYSTEM' && item.userIsShow == '1' &&
                                        <div
                                            className={`msg ${item.content.indexOf("p")!=-1?'redColor':''}`}>
                                            {item.content.indexOf("p")!=-1?item.content.substring(26,item.content.length-7):item.content}
                                        </div>}
                                        {item.type == 'BIZ' && item.userIsShow == '1' &&
                                        <div className='date'>{item.createTimeName}</div>}
                                        {item.type == 'BIZ' && item.userIsShow == '0' &&item.doctorIsShow == '0'&&
                                        <div
                                            className={`msg `} style={{textAlign:'center',color:'#ccc',background:'#f2f2f2'}}>
                                            撤回了一条消息
                                        </div>}
                                        {item.type == 'BIZ' && item.direction == 'TO_USER' && item.userIsShow == '1' && item.voiceTime == 0 &&
                                        <div className='left'
                                            >
                                            <div className='img'>
                                                <img src={!!JSON.parse(item.doctorInfo)&&!!JSON.parse(item.doctorInfo).image?JSON.parse(item.doctorInfo).image:'./images/defautImg.png'}/>
                                            </div>
                                            <span>{!!JSON.parse(item.doctorInfo)&&JSON.parse(item.doctorInfo).deptName} | {!!JSON.parse(item.doctorInfo)&&JSON.parse(item.doctorInfo).name} ({!!JSON.parse(item.doctorInfo)&&JSON.parse(item.doctorInfo).level})</span>
                                            {item.type == 'BIZ' && item.direction == 'TO_USER' && item.userIsShow == '1' &&item.url && item.action !== 'add' &&item.action !== 'addChecklist'&& <div
                                                className='image'
                                                onClick={()=>{this.previewImg(item.url)
                                                                    }}
                                                >
                                                <i/><img  
                                                src={item.url&&item.url.indexOf("ihoss")=='-1'?item.url:item.url+"?x-oss-process=image/resize,w_105"}/>
                                            </div>}
                                            
                                            {item.content &&item.action !== 'addChecklist'&&item.action!='reportApply'&&item.action!='add'&& 
                                             
                                              <div className='text'>
                                                {item.content}
                                            </div>}
                                            
                                                                                     
                                          {item.url && <div className='flex'></div>}
                                        </div>}
                                        {item.type == 'BIZ' && item.direction == 'TO_USER' && item.userIsShow == '1' &&item.voiceTime > 0 && <div id="a" className='left slide'>
                                            <div className='img'>
                                                        <img src={!!JSON.parse(item.doctorInfo)&&!!JSON.parse(item.doctorInfo).image?JSON.parse(item.doctorInfo).image:'./images/defautImg.png'}/>
                                            </div>  
                                            <span>{!!JSON.parse(item.doctorInfo)&&JSON.parse(item.doctorInfo).deptName} | {!!JSON.parse(item.doctorInfo)&&JSON.parse(item.doctorInfo).name} ({!!JSON.parse(item.doctorInfo)&&JSON.parse(item.doctorInfo).level})</span>
                                            {item.voiceTime && <div  
                                               
                                                className={`text radio ${item.voiceTime<5?'wid5':''} ${item.voiceTime<10&&item.voiceTime>=5?'wid6':''} ${item.voiceTime<20&&item.voiceTime>=10?'wid7':''} ${item.voiceTime>=20?'wid8':''}`}>                                            
                                                 
                                                <audio id={'s'+item.id}>
                                                    <source src={item.url} type="audio/mp3"/>
                                                </audio>
                                            </div>}
                                            {item.url && <div className='flex'></div>}
                                        </div>}
                                        {item.type == 'BIZ' &&item.direction == 'TO_DOCTOR'&&item.userIsShow== '1'&&
                                        <div id="s" className='right'>
                                            <div className='flex'></div>
                                            {item.url && item.action !== 'add' &&item.action !== 'addChecklist' &&  <div className='image'
                                                                                       onClick={()=>{
                                                                                    this.previewImg(item.url)
                                                                                     }} >
                                                <img  
                                                 src={item.url&&item.url.indexOf("ihoss")=='-1'?item.url:item.url+"?x-oss-process=image/resize,w_105"}/>
                                            </div>}
                                            {item.content &&item.content !== ''&& <div className='text'>
                                            {item.content}
                                            </div>} 

                                            <div className='img'>
                                                <p style={{width:'45px',height:'45px',background:'#4cabcf',borderRadius:'50%',padding:'0 1px'}}>{datadetail.patientName}</p>
                                            </div> 
                                        </div>} 
                                    </div>
                                )
                            })}
                            <div className="content-item" id="txt" ></div>
                        
                    </div>
                    
                 </div>}
                {!!datadetail&&!!datadetail.report&&JSON.parse(datadetail.report)&&<p style={{textAlign:'left',paddingLeft:'50px'}}>会诊报告详情</p>}
                { 
                  !!datadetail&&!!datadetail.report&&JSON.parse(datadetail.report)&&<div className='details'>
                { 
                  !!datadetail&&!!datadetail.report&&JSON.parse(datadetail.report)&&<div className="report-info">
                           <div className= 'title'>
                           <div>重庆医科大学附属儿童医院</div>
                           <div>多学科会诊报告</div>
                           </div>
                               
                         <div className= 'people'>
                           <div> 
                               <img src='./images/hzdx@2x.png'/>
                               <span>会诊对象</span>
                           </div>
                           <div className='peopleMsg'>
                               <div className= 'name'>{datadetail.patientName}</div>
                               <div className= 'msg'>
                                   <span>性别：{datadetail.patientSex}</span>
                                   <span>年龄：{datadetail.patientAge}</span>
                                   <span>就诊卡号：{datadetail.patientCardNo}</span>
                               </div>
                           </div>
                       </div>
               
                         <div className= 'people'>
                           <div> 
                               <img src='./images/sxzj@2x.png'/>
                               <span>首席专家</span>
                           </div>
                           <div className='peopleMsg'>
                               <span>{datadetail.patientDoctorName}（{datadetail.patientDoctorTitle}） </span>
                           </div>
                       </div>
               
                       <div className= 'people'>
                           <div> 
                               <img src='./images/hzsj@2x.png'/>
                               <span>会诊时间</span>
                           </div>
                           <div className='peopleMsg'>
                               <span>{datadetail.consultationTime}</span>
                           </div>
                       </div>
               
                       <div className= 'people'>
                           <div> 
                               <img src='./images/sxzj@2x.png'/>
                               <span>会诊专家</span>
                           </div>
                           <div className='peopleMsg'>
                               <span>
                                 {!!datadetail.report&&JSON.parse(datadetail.report).people&&JSON.parse(datadetail.report).people }
                               </span>
                           </div>
                       </div>
                       <div className= 'descript'>
                           <div> 
                               <img src='./images/bqbcms@2x.png'/>
                               <span>主治医师汇报病史</span>
                           </div>
                           <div className='descript1'>
                              {datadetail.mainDiagnosis}
                               <div >
                                     {
                                       !!datadetail.images&&(JSON.parse(datadetail.images)).map((item,index)=>{
                                          return(
                                                 <div className= 'imageType' key={index}>
                                                 <img src='./images/jx@2x.png'/>
                                                 <text>{Object.getOwnPropertyNames(item)[0]}</text>
                                                 <div>
                                                 {
                                                   !!item[Object.getOwnPropertyNames(item)[0]]&&
                                                   item[Object.getOwnPropertyNames(item)[0]].length>0&&item[Object.getOwnPropertyNames(item)[0]].map((item1,index1)=>{
                                                     return( 
                                                       <img key={index1}  src={item1} onClick={()=>{
                                                         this.previewImg(item1)
                                                       }} alt=""/>
                                                      
                                                     )
                                                   })
                                                 }
                                                   </div>
                                                   </div>
                                          )
                                       })
                                     }
                                   
                               </div>
                           </div>
                       </div>  
               
                       <div className='doctorReport'>111
                      
                           { !!tmp&&tmp.length>0&&tmp.map((item,index)=>{
                             return(
                             <div className='dept' key={index}>
                               <div className='deptName'>{tmp[0].deptName}</div>
                                {
                                 !!item&&item.length>0&&item.map((item1,index1)=>{
                                         return(
                                     <div className="doctorDes" key={index1}>{item1.name}:{!!item1.summary?item1.summary:'暂无'}</div>
 
                                    )
                                  })
                                }
                           </div>
                             )
                           }) }
                           
                       </div>   
                       <div className = 'descript'>
                           <div> 
                               <img src='./images/bqbcms@2x.png'/>
                               <span>总结</span>
                           </div>
                           <div className ='descript1'>
                             {!!datadetail.report&&JSON.parse(datadetail.report).info.reportSummary}
                           </div>
                       </div> 
                  </div>
                }

                </div>}
               </div>
            </div>}
           
    

          </div>}
    </Drawer>
        
        <div className={"query-box "+this.props.location.query.showsearch}>
         <div style={{marginBottom:'10px',fontWeight:'bold'}}>  查询条件</div>
        <span>申请时间：</span>
        <RangePicker size="large"   value={this.state.dates} onChange={this.changeDate} disabledDate={this.disabledDate} locale={locale.datePicker} />

          <span>团队名称：</span>
          <Input
            className="mb16"
            type="text" size="large" placeholder="请输入团队名称"
            value={this.state.teamName} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({teamName: e.target.value})}
          />
          <span>患者信息：</span>
          <Input
            className="mb16"
            type="text" size="large" placeholder="请输入患者姓名"
            value={this.state.patientName} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({patientName: e.target.value})}
          />
          <span>审核状态：</span>
          <Select
          size="large"
          style={{width: '120px', marginRight: '30px'}}
          placeholder="请选择"
          value={this.state.auditStatus}
          onChange={value => this.setState({auditStatus: value})}
          >
            <Option value="">全部</Option>
            <Option value="1">待审核</Option>
            <Option value="2">审核通过</Option>
            {/* <Option value="C">已取消</Option> */}
            <Option value="3">审核未通过</Option>
          </Select>
          <span>订单状态：</span>
          <Select
          size="large"
          style={{width: '120px', marginRight: '30px'}}
          placeholder="请选择"
          value={this.state.orderStatus}
          onChange={value => this.setState({orderStatus: value})}
          >
            <Option value="">全部</Option>
            <Option value="1">未支付</Option>
            <Option value="2">已支付</Option>
            {/* <Option value="C">已取消</Option> */}
            <Option value="6">已退款 </Option>
          </Select>
          <span>会诊报告状态：</span>
         
          <Select
              size="large"
              style={{width: '120px', marginRight: '30px'}}
              placeholder="请选择"
              value={this.state.reportStatus}
              disabled={this.state.showordertype}
              onChange={value => this.setState({reportStatus: value})}
            >
              <Option value="">全部</Option>
              <Option value="1">待出报告</Option>
              <Option value="2">待审核</Option>
              <Option value="3">审核通过</Option>
              <Option value="4">审核未通过</Option>
              
              {/* <Option value="S">已支付</Option> */}
        </Select>
          <Button size="large" type="primary" onClick={() => this.query(1)}>查询</Button>
          {/* <Button size="large" onClick={this.reset}>重 置</Button> */}
        </div>

        <div>
        <div style={{marginBottom:'30px',fontWeight:'bold'}}>  订单列表</div>
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

       

      </div>
    );
  }
}
export default connect((state) => {
  const { order } = state;
  return {
    ...order,
  };
})(Order);
