import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Drawer,Input, Select,Table, DatePicker, Button, Modal,Pagination, Radio, message, Tag} from 'antd';
//import { Input, Select,Table, DatePicker, Button, Modal, Radio} from 'antd';

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import { formatDate } from '../../../utils/utils';
import './style.less';

function log(e) {
  console.log(e);
}

const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const confirm = Modal.confirm;
class Team extends React.Component {
  state = {
    searchId: '',
    status: '',
    update:false,//是否修改
    startDate: '',
    endDate: '',
    visible:false,
    show:false,
    detail:'',//团队介绍
    name:'',
    teamName:'',//团队名字
    leaderName:'',//领队名称
    price:'',

    dates: [
      // moment(formatDate(new Date(new Date() - (365 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
    showModal: false,
    showModal2: false,
    type:'',
    doctor1:true,
    doctor2:false,
    doctor3:false,
    doctor4:false,
    depts:[],
    deptList:[],
    dept1List:[],
    dept2List:[],
    dept3List:[],
    docList:[],
    doc1List:[],
    doc2List:[],
    doc3List:[],
    doc1:[],
    doc2:[],
    doc3:[],
    doc4:[],
  }
  changeDate = (dates, dateStrings) => {
    this.setState({
      dates,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
  }

  componentDidMount(){
    this.query(1);
    this.getdeptList1();
    this.getdeptList2();
    this.getdeptList3();
    this.getdeptList4();
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
  //选择领队
  selectDoc=(id)=>{
    let docList=this.state.docList;
    let doc1=[];
    for(let i=0;i<docList.length;i++){
      if(id==docList[i].id){
        console.log("hh",id,docList[i].id,!docList[i].active)
          if(!!docList[i].active){
            docList[i].active=false;
          }else{
            docList[i].active=true;
          }
      }else{
        docList[i].active=false;
      }
      if(!!docList[i].active){
        let info={};
        info.deptId=docList[i].deptIds;
        info.deptName=docList[i].deptName;
        info.doctorId=docList[i].doctorId;
        info.hisId=docList[i].hisId;
        info.hisName=docList[i].hisName;
        info.image=docList[i].image;
        info.name=docList[i].name;
        info.title=docList[i].level;
        info.type='2';
        doc1.push(info);
      }
    }
    this.setState({
      docList:docList,
      doc1:doc1
    })
  }
  /* 选择次席专家 */
  select1Doc=(id)=>{
    let doc1List=this.state.doc1List;
    let doc2=[];
    for(let i=0;i<doc1List.length;i++){
       console.log(id,doc1List[i].id)
      if(id==doc1List[i].id){
        if(!!doc1List[i].active){
          doc1List[i].active=false;
        }else{
          doc1List[i].active=true;
        }
      }
      if(!!doc1List[i].active){
        let info={};
        info.deptId=doc1List[i].deptIds;
        info.doctorId=doc1List[i].doctorId;
        info.deptName=doc1List[i].deptName;
        info.hisId=doc1List[i].hisId;
        info.hisName=doc1List[i].hisName;
        info.image=doc1List[i].image;
        info.name=doc1List[i].name;
        info.title=doc1List[i].level;
        info.type='3';
        doc2.push(info);
      }
    }
    this.setState({
      doc1List:doc1List,
      doc2:doc2
    })
  }
  /* 选择会诊专家 */
  select2Doc=(id)=>{
    let doc2List=this.state.doc2List;
    let doc3=[];
    for(let i=0;i<doc2List.length;i++){
       console.log(id,doc2List[i].id)
      if(id==doc2List[i].id){
        
        if(!!doc2List[i].active){
          doc2List[i].active=false;
        }else{
          doc2List[i].active=true;
        }
      }
      if(!!doc2List[i].active){
        let info={};
        info.deptId=doc2List[i].deptIds;
        info.doctorId=doc2List[i].doctorId;
        info.hisId=doc2List[i].hisId;
        info.deptName=doc2List[i].deptName;
        info.hisName=doc2List[i].hisName;
        info.image=doc2List[i].image;
        info.name=doc2List[i].name;
        info.title=doc2List[i].level;
        info.type='1';
        doc3.push(info);
      }
    }
    this.setState({
      doc2List:doc2List,
      doc3:doc3
    })
  }
  /* 选择协调员 */
  select3Doc=(id)=>{
    let doc3List=this.state.doc3List;
    let doc4=[];
    for(let i=0;i<doc3List.length;i++){
       console.log(id,doc3List[i].id)
      if(id==doc3List[i].id){
        if(!!doc3List[i].active){
          doc3List[i].active=false;
        }else{
          doc3List[i].active=true;
        }
      }
      if(!!doc3List[i].active){
        let info={};
        info.deptId=doc3List[i].deptIds;
        info.doctorId=doc3List[i].doctorId;
        info.hisId=doc3List[i].hisId;
        info.hisName=doc3List[i].hisName;
        info.image=doc3List[i].image;
        info.deptName=doc3List[i].deptName;
        info.name=doc3List[i].name;
        info.title=doc3List[i].level;
        info.type='4';
        doc4.push(info);
      }
    }
    this.setState({
      doc3List:doc3List,
      doc4:doc4
    })
  }
  /* 首席专家 */
  getdocList=(id)=>{ 
     /* 选中状态 */
     console.log("---",this.state);
     var ids='';
    let data=[];
    for(let i=0;i<this.state.deptList.length;i++){
       let dept=this.state.deptList[i];
       dept.active=false;
       console.log("---11",this.state)
      if(id==this.state.deptList[i].no){
        console.log("iiiiiiiiiiiiid")
        dept.active=true;
        ids=this.state.deptList[i].id;
      }
      

      data.push(dept)
    }

     this.setState({ 
      deptList:data
    }) 
    console.log(data,this.state.deptList)

     /* 查医生列表 */
     const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      deptId:id
    };
    let that=this;
    dispatch(
      { 
        type: 'team/docList',
         payload,
         callback:(data)=>{
              if(data.length>0){
                let docList=data;
                for(let i=0;i<docList.length;i++){
                  docList[i].active=false;
                  docList[i].deptIds=ids;
                  for(var j=0;j<this.state.doc1.length;j++){
                    if(this.state.doc1[j].doctorId==docList[i].doctorId){
                      docList[i].active=true;
                    }
                  }
                }
                that.setState({
                  docList:docList,
                })
              }
         } 
      });
  }
  /* 次席专家 */
  getdoc1List=(id)=>{
    console.log(id)
     /* 选中状态 */
    const  dept1List=this.state.dept1List;
       let data1=dept1List;
       var ids='';
    for(let i=0;i<data1.length;i++){
      if(id==data1[i].no){
        data1[i].active=true;
        ids=dept1List[i].id;
      }else{
        data1[i].active=false;
      }
    }
    this.setState({
      dept1List:data1 
    })
     /* 查医生列表 */
     const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      deptId:id
    };
    let that=this;
    dispatch(
      { 
        type: 'team/docList',
         payload,
         callback:(data)=>{
              if(data.length>0){
                let doc1List=data;
                for(let i=0;i<doc1List.length;i++){
                  doc1List[i].active=false;
                  doc1List[i].deptIds=ids;
                  for(var j=0;j<this.state.doc2.length;j++){
                    if(this.state.doc2[j].doctorId==doc1List[i].doctorId){
                      doc1List[i].active=true;
                    }
                  }
                }
                that.setState({
                  doc1List:doc1List,
                 
                })
              }
         } 
      });
  }
  getdoc2List=(id)=>{ 
    console.log(id)
     /* 选中状态 */
    let dept2List=this.state.dept2List;
    var ids='';
    for(let i=0;i<dept2List.length;i++){
      if(id==dept2List[i].no){
        dept2List[i].active=true;
        ids=dept2List[i].id;
      }else{
        dept2List[i].active=false;
      }
    }
    this.setState({
      dept2List:dept2List
    })
     /* 查医生列表 */
     const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      deptId:id
    };
    let that=this;
    dispatch(
      { 
        type: 'team/docList',
         payload,
         callback:(data)=>{
              if(data.length>0){
                let doc2List=data;
                for(let i=0;i<doc2List.length;i++){
                  doc2List[i].active=false;
                  doc2List[i].deptIds=ids;
                  for(var j=0;j<this.state.doc3.length;j++){
                    if(this.state.doc3[j].doctorId==doc2List[i].doctorId){
                      doc2List[i].active=true;
                    }
                  }
                }
                that.setState({
                  doc2List:doc2List,
                })
              }
         } 
      });
  }
  /* 会诊专家 */
  getdoc3List=(id)=>{
    console.log(id)
     /* 选中状态 */
    let dept3List=this.state.dept3List;
    var ids='';
    for(let i=0;i<dept3List.length;i++){
      if(id==dept3List[i].no){
        dept3List[i].active=true;
        ids=dept3List[i].id;
      }else{
        dept3List[i].active=false;
      }
    }
    this.setState({
      dept3List:dept3List
    })
     /* 查医生列表 */
     const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      deptId:id
    };
    let that=this;
    dispatch(
      { 
        type: 'team/docList',
         payload,
         callback:(data)=>{
              if(data.length>0){
                let doc3List=data;
                for(let i=0;i<doc3List.length;i++){
                  doc3List[i].active=false;
                  doc3List[i].deptIds=ids;
                  for(var j=0;j<this.state.doc4.length;j++){
                    if(this.state.doc4[j].doctorId==doc3List[i].doctorId){
                      doc3List[i].active=true;
                    }
                  }
                }
                that.setState({
                  doc3List:doc3List
                })
              }
         } 
      });
  }
  //保存团队
  save=()=>{
     console.log(this.state.name,this.state.detail,this.state.doc1,this.state.doc2,this.state.doc3,this.state.doc4)
    let mdtDoctorVoList=[];
    for(let i=0;i<this.state.doc1.length;i++){
      mdtDoctorVoList.push(this.state.doc1[i])
    }
    for(let i=0;i<this.state.doc2.length;i++){
      mdtDoctorVoList.push(this.state.doc2[i])
    }
    for(let i=0;i<this.state.doc3.length;i++){
      mdtDoctorVoList.push(this.state.doc3[i])
    }
    for(let i=0;i<this.state.doc4.length;i++){
      mdtDoctorVoList.push(this.state.doc4[i])
    }
    if(this.state.name==''){
      message.warning('请输入团队名称！', 2);
           return false;
    }else{
      if(this.state.doc1.length<=0){
        message.warning('会诊专家!', 2);
             return false;
      }
    }
    this.setState({
      visible1:false
    })
    if(this.state.update){
      const { dispatch } = this.props;
      dispatch({ 
       type: 'team/update', 
       payload:{
         hisId:sessionStorage.getItem('hisId'),
         name:this.state.name,
         id:this.props.detaildata.id,
         introduction:this.state.detail,
         price:this.state.price,
         mdtDoctorListStr:JSON.stringify(mdtDoctorVoList)
       }
      });
    }else{
      const { dispatch } = this.props;
      dispatch({ 
       type: 'team/add', 
       payload:{
         hisId:sessionStorage.getItem('hisId'),
         name:this.state.name,
         introduction:this.state.detail,
         price:this.state.price,
         mdtDoctorListStr:JSON.stringify(mdtDoctorVoList)
       }
      });
    }
     
  }
  /* 查询科室 */
  getdeptList1= () => {
    const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      
    };
    let that=this;
    dispatch({ 
      type: 'team/deptList', 
      payload,
      callback:(data)=>{
        if(data.length>0){
          that.setState({
            deptList:data,
          })
        }
   }
     });
  }
   /* 查询科室 */
   getdeptList2= () => {
    const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      
    };
    let that=this;
    dispatch({ 
      type: 'team/deptList', 
      payload,
      callback:(data)=>{
        if(data.length>0){
           
          that.setState({
            dept1List:data,
          })
        }
   }
     });
  }
   /* 查询科室 */
   getdeptList3= () => {
    const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      
    };
    let that=this;
    dispatch({ 
      type: 'team/deptList', 
      payload,
      callback:(data)=>{
        if(data.length>0){
           
          that.setState({
            dept2List:data,
          })
        }
   }
     });
  }
   /* 查询科室 */
   getdeptList4= () => {
    const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      
    };
    let that=this;
    dispatch({ 
      type: 'team/deptList', 
      payload,
      callback:(data)=>{
        if(data.length>0){
           
          that.setState({
            dept3List:data,
          })
        }
   }
     });
  }
  //条件搜索
  query = (pageNum) => {
    const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      pageNum,
      numPerPage:10,
      name:this.state.teamName,
      leaderName:this.state.leaderName
    };
    dispatch({ type: 'team/getOrderList', payload });
  }
  del=(id)=>{
    const { dispatch } = this.props;
    confirm({
      content: '删除操作不可撤销，是否确定删除？',
      onOk() {
        dispatch({ type: 'team/del', payload: {hisId:sessionStorage.hisId,id:id} });
      },
    });
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



  onKeydown(e){
    if(e.keyCode===13){
      this.query(1);
    }
  }
  cancelModal=()=>{
    this.setState({
      visible:false,
    })
  }
  //关闭添加团队
  cancelModal1=()=>{
    this.setState({
      visible1:false
    })
  }
  /* 查看详情 */
  showDetail(id){
    const { dispatch } = this.props;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      id:id,
    };
    const payload1 = {
      hisId:sessionStorage.getItem('hisId'),
      teamId:id,
    };
    dispatch({ type: 'team/detail', payload });
    dispatch({ type: 'team/teamDetail', payload1 });
     this.setState({
       visible:true
     })
  }
  /* 显示选择首席专家*/
  show1=()=>{
     this.setState({
       doctor1:true,
     })
  }
  /* 显示选择次席专家*/
  show2=()=>{
     this.setState({
       doctor2:true,
     })     
  }
  /* 编辑 */
  edit=()=>{
    this.setState({
      name:this.props.detaildata.name,
      detail:this.props.detaildata.introduction,
      visible1:true,
      visible:false,
      update:true,
      doctor1:true,
      doctor2:true,
      doctor3:true,
      doctor4:true,
     })
     var team=this.props.teamdetail;
     var team1=[];
     var team2=[];
     var team3=[];
     var team4=[];
     for(var i=0;i<team.length;i++){
        if(team[i].type=='2'){
            team1.push(team[i]);
         }
         if(team[i].type=='3'){
          team2.push(team[i]);
        }
        if(team[i].type=='1'){
          team3.push(team[i]);
        }
        if(team[i].type=='4'){
          team4.push(team[i]);
        } 
     }
     this.setState({
       doc1:team1,
       doc2:team2,
       doc3:team3,
       doc4:team4,
     })
     
  }
  /* 显示选择会诊专家*/
  show3=()=>{
     this.setState({
       doctor3:true,
     })
  }
  /* 显示选择协调员*/
  show4=()=>{
     this.setState({
       doctor4:true,
     })
  }
  showAdd=()=>{

      this.setState({
          visible1:true,
          update:false,
          visible:false,
          doctor1:true,
     })
  }

  render() {
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    console.log("cur",currentPage)
    

    return (
      <div className="page-order-list">
      <Modal
      className='team-modal'
      title="团队信息"
      style={{ top: 60,width:'1000px',height:'700px'}}
      footer={null}
      visible={this.state.visible}
      maskClosable={true}
      onCancel={this.cancelModal}
      onOk={this.okModal}
    >
      <div className="detail-team-modal">
        <span className='edit' onClick={()=>{
            this.edit()
          }}>编辑</span>
        <div>团队名称：<span>{!!this.props.detaildata&&this.props.detaildata.name}</span></div>
        <div>会诊科室：
              <span>
               {!!this.props.teamdetail&&this.props.teamdetail.map((item,index)=>{
                 return(
                   (index!=0?"、"+item.deptName:item.deptName)
                 )
               })}
              </span>
        </div>
        <div>会诊专家：
              <span>
               {!!this.props.teamdetail&&this.props.teamdetail.map((item,index)=>{
                 return(
                   (index!=0?"、"+item.name:item.name)
                 )
               })}
              </span>
        </div>
        <div>
          <p>团队介绍：</p>
          <p>{!!this.props.detaildata&&this.props.detaildata.introduction}</p>
        </div>
        {/* <div>
          <p>会诊金额：</p>
          <p>{!!this.props.detaildata&&!!this.props.detaildata.price&&this.props.detaildata.price}</p>
        </div> */}
        <div className="confirm">
          <span  onClick={()=>{this.cancelModal()}}>确定</span>
        </div>
      </div>
     
    </Modal>
    <Modal
      className='team-modal'
      title="团队信息"
      style={{ top: 60,width:'1000px',height:'700px'}}
      footer={null}
      visible={this.state.visible1}
      maskClosable={true}
      onCancel={this.cancelModal1}
      onOk={this.cancelModal1}
    >
      <div className="detail-team-modal">
        <div className='input-info'>
           <p>
           <span>团队名称</span>
           <Input
             className="mb16"
             type="text" size="large" placeholder="请输入团队名称"
             value={this.state.name}  onChange={e => this.setState({name: e.target.value})}
           />
           </p>
           <p>

           <span style={{marginTop:'8px'}}>会诊专家</span>
           {!this.state.doctor1&&<Input
            className="mb16"
            type="text" size="large" placeholder="请选择"
            readOnly
            onClick={this.show1}
          />
           }
           {this.state.doctor1&& 
            <div className="person">
               {!!this.state.doc1&&!!this.state.doc1.length>0&&<div className="dept" style={{display:'block'}}>
                 
                {this.state.doc1.map((item,index)=>{
                  return( 
                    <Tag closable onClose={log} key={index} className="item" style={{display:'inline-block', height:'40px',backgroundColor:'#f3f3f3',marginLeft:0,marginBottom:0,textAlign:'right',position:'relative',padding:'5px 20px 0 10px',fontSize:'14px'}}>
                      {!!item.deptName?item.deptName:''}-{!!item.name?item.name:''}
                    </Tag>
                  // <span key={index} className="item" style={{display:'inline-block'}}>
                  // {!!item.deptName?item.deptName:''}-{!!item.name?item.name:''}<img src="./images/scx.png" alt=""/>
                  // </span>
                  )
              })}
                  </div>}
               
               {!this.state.doc1&&!this.state.doc1.length>0&&<div className="dept">
                  <span ></span>
               </div>}
               <div className="select-dept">
                 {/* 左边 */}
                  <div className="dept-list">
                     {
                       this.state.deptList&&this.state.deptList.length>0&&this.state.deptList.map((item,index)=>{
                         return(
                          <span
                           key={index} 
                           style={item.active?{background:'#108ee9',color:'white'}:{}} 
                           onClick={()=>{this.getdocList(item.no)}}
                          >{item.name}</span>
                         )
                       })
                     }
                  </div>
                  {/* 右边 */}
                  {
                    this.state.docList&&this.state.docList.length>0&&<div className="doc-list">
                    <div>
                      {this.state.docList.map((item,index)=>{
                        return( 
                        <span 
                        key={index} 
                        style={item.active?{color:'#108ee9'}:{}}
                        onClick={()=>{this.selectDoc(item.id)}}
                        >{item.name}</span>
                        )
                      })
                    }
                   </div>
                    </div>
                  }
                 {
                   this.state.docList&&this.state.docList.length<=0&&
                   <div className="doc-list" style={{textAlign:'center',paddingTop:'100px',width:'460px'}}>
                      暂未查询到医生信息
                   </div>
                 }
              </div>
              
              </div>}
           </p>

           <p>
           <span>团队介绍</span>
           <TextArea
             className="mb16 team-detail"
             type="text" size="large" placeholder="请输入团队介绍"
             value={this.state.detail} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({detail: e.target.value})}
           />
           </p>
           {/* <p>
           <span>会诊金额</span>
           <Input
             className="mb16"
             type="number" size="large"  placeholder="请输入会诊金额"
             value={this.state.price}  onChange={e => this.setState({price: e.target.value})}
           />
           </p> */}
        </div>
        <div className="confirm">
          <span style={{color:'#108ee9',background:'white',marginRight:'20px'}} onClick={()=>{this.cancelModal1()}}>取消</span>
          <span  onClick={()=>{this.save()}}>保存</span>
        </div>
       
        </div>
     
    </Modal>

        <div className="query-box">
        <div style={{marginBottom:'10px',fontWeight:'bold'}}>  查询条件</div>
          <span>团队名称：</span>
          <Input
            type="text" size="large" placeholder="请输入" className="mb16"
            value={this.state.teamName} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({teamName: e.target.value})}
          />
          <span>团队领队：</span>
          <Input
            type="text" size="large" placeholder="请输入" className="mb16"
            value={this.state.leaderName} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({leaderName: e.target.value})}
          />
          <Button size="large" type="primary" onClick={() => this.query(1)}>查询</Button>
          {/* <Button size="large" onClick={this.reset}>重 置</Button> */}
        </div>

        <div>
        <div style={{marginBottom:'30px',fontWeight:'bold',position:'relative'}}> 
         团队列表
          <div className="fresh">
           <span onClick={()=>{
            this.query(1)}}>刷新</span>
           <span onClick={()=>{
            this.setState({
                show:!this.state.show,
          })}}>删除</span>
           <span onClick={this.showAdd}>添加</span>
          </div>
         </div>
           <div className="team">
           {this.props.data&&this.props.data.recordList.length > 0&&
            this.props.data.recordList.map((item,index)=>{
              return(
                <div className="item" key={index}>
                {this.state.show&&<img src="./images/team-del.png" onClick={()=>{
                  this.del(item.id)
                }} alt=""/>}
                   <div className='title'><p>{item.name}</p></div>
                    <p className='detail'>
                       <span>领队：<span className='num'>{!!item.leaderName&&item.leaderName}</span></span>
                       <span>科室数量：<span className='num'>{!!item.deptCount&&item.deptCount}</span></span>
                    </p>
                    <p className='detail'>
                       <span>专家人数：<span className='num'>{!!item.doctorCount&&item.doctorCount}</span></span>
                       <span>已会诊数：<span className='num'>{!!item.mdtCount&&item.mdtCount}</span></span>
                    </p>
                    <p style={{cursor:'pointer'}} onClick={()=>{
                      this.showDetail(item.id);
                    }}>查看详情</p>
                </div>
              )
            })}
           </div>
          
           {!!this.props.data&&!!this.props.data.currentPage&&<div style={{textAlign:'right'}}> 
              <Pagination showQuickJumper defaultCurrent={!!this.props.data&&!!this.props.data.currentPage&&this.props.data.currentPage} total={totalCount} />
           </div>  }
          
        </div>

      </div>
    );
  }
}
export default connect((state) => {
  const { team } = state;
  return {
    ...team,
  };
})(Team);
