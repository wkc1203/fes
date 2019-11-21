import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Drawer,Input, Select,Table, DatePicker, Button, Modal,Pagination, Radio, message} from 'antd';
//import { Input, Select,Table, DatePicker, Button, Modal, Radio} from 'antd';

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import { formatDate } from '../../../utils/utils';
import './style.less';

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
  delDoc=(item)=>{
    console.log("ii",item)
    let docList=this.state.docList;
    let doc1=[];
    for(let i=0;i<docList.length;i++){
      if(item.doctorId==docList[i].id){
            docList[i].active=false;
      }
    }
    this.setState({
      docList:docList,
      doc1:[]
    })
  }
  delDoc1=(item)=>{
    console.log("ii11",item)
    let doc1List=this.state.doc1List;
    let doc2=[];
    for(let i=0;i<doc1List.length;i++){
      console.log("ii11",item.doctorId,doc1List[i].id)
      if(item.doctorId==doc1List[i].id){
            doc1List[i].active=false;

      }
    }
    for(var i=0;i<this.state.doc2.length;i++){
      if(item.doctorId!=this.state.doc2[i].doctorId){
        doc2.push(this.state.doc2[i])
      }
    }
    this.setState({
      doc1List:doc1List,
      doc2:doc2
    })
  }
  delDoc2=(item)=>{
    let doc2List=this.state.doc2List;
    let doc3=[];
    for(let i=0;i<doc2List.length;i++){
      if(item.doctorId==doc2List[i].id){
            doc2List[i].active=false;
      }
    }
    for(var i=0;i<this.state.doc3.length;i++){
      if(item.doctorId!=this.state.doc3[i].doctorId){
        doc3.push(this.state.doc3[i])
      }
    }
    this.setState({
      doc2List:doc2List,
      doc3:doc3
    })
  }
  delDoc3=(item)=>{
    let doc3List=this.state.doc3List;
    let doc4=[];
    for(let i=0;i<doc3List.length;i++){
      if(item.doctorId==doc3List[i].id){
            doc3List[i].active=false;
      }
    }
    for(var i=0;i<this.state.doc4.length;i++){
      if(item.doctorId!=this.state.doc4[i].doctorId){
        doc4.push(this.state.doc4[i])
      }
    }
    this.setState({
      doc3List:doc3List,
      doc4:doc4
    })
  }
 
  //选择领队
  selectDoc=(id)=>{
    let docList=this.state.docList;
    let doc1=[];
    for(let i=0;i<docList.length;i++){
      if(id==docList[i].id){
        docList[i].active=true;
       let info={};
        info.deptId=docList[i].deptId;
        info.deptName=docList[i].deptName;
        info.doctorId=docList[i].id;
        info.hisId=docList[i].hisId;
        info.hisName=docList[i].hisName;
        info.image=docList[i].image;
        info.name=docList[i].name;
        info.title=docList[i].level;
        info.type='2';
        doc1.push(info);
      }else{
        docList[i].active=false;
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
    let cur={};
    for(let i=0;i<doc1List.length;i++){
       console.log(id,doc1List[i].id)
      if(id==doc1List[i].id){
        if(!!doc1List[i].active){
          doc1List[i].active=false;
        }else{
          doc1List[i].active=true;
        }
        cur=doc1List[i];
      }
    }
    console.log("cur",cur,this.state.doc2)
    if(this.state.doc2.length>0){
      for(var i=0;i<this.state.doc2.length;i++){
        if(cur.id!==this.state.doc2[i].doctorId){
                    doc2.push(this.state.doc2[i]);
        }
      }
       if(cur.active){
        let info={};
        info.deptId=cur.deptId;
        info.doctorId=cur.id;
        info.hisId=cur.hisId;
        info.deptName=cur.deptName;
        info.hisName=cur.hisName;
        info.image=cur.image;
        info.name=cur.name;
        info.title=cur.level;
        info.type='3';
        doc2.push(info);
       }
    }else{ 
        if(cur.active){
          let info={};
          info.deptId=cur.deptId;
          info.doctorId=cur.id;
          info.hisId=cur.hisId;
          info.deptName=cur.deptName;
          info.hisName=cur.hisName;
          info.image=cur.image;
          info.name=cur.name;
          info.title=cur.level;
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
    let cur={};
    for(let i=0;i<doc2List.length;i++){
       console.log(id,doc2List[i].id)
      if(id==doc2List[i].id){
        if(!!doc2List[i].active){
          doc2List[i].active=false;
        }else{
          doc2List[i].active=true;
        }
        cur=doc2List[i];
      }
    }
    console.log("cur",cur,this.state.doc3)
    if(this.state.doc3.length>0){
      for(var i=0;i<this.state.doc3.length;i++){
        if(cur.id!==this.state.doc3[i].doctorId){
          doc3.push(this.state.doc3[i]);
        }
      }
       if(cur.active){
        let info={};
        info.deptId=cur.deptId;
        info.doctorId=cur.id;
        info.hisId=cur.hisId;
        info.deptName=cur.deptName;
        info.hisName=cur.hisName;
        info.image=cur.image;
        info.name=cur.name;
        info.title=cur.level;
        info.type='1';
        doc3.push(info);
       }
    }else{ 
        if(cur.active){
          let info={};
          info.deptId=cur.deptId;
          info.doctorId=cur.id;
          info.hisId=cur.hisId;
          info.deptName=cur.deptName;
          info.hisName=cur.hisName;
          info.image=cur.image;
          info.name=cur.name;
          info.title=cur.level;
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
    let cur={};
    for(let i=0;i<doc3List.length;i++){
       console.log(id,doc3List[i].id)
      if(id==doc3List[i].id){
        if(!!doc3List[i].active){
          doc3List[i].active=false;
        }else{
          doc3List[i].active=true;
        }
        cur=doc3List[i];
      }
    }
    console.log("cur",cur,this.state.doc4)
    if(this.state.doc4.length>0){
      for(var i=0;i<this.state.doc4.length;i++){
        if(cur.id!==this.state.doc4[i].doctorId){
          doc4.push(this.state.doc4[i]);
        }
      }
       if(cur.active){
        let info={};
        info.deptId=cur.deptId;
        info.doctorId=cur.id;
        info.hisId=cur.hisId;
        info.deptName=cur.deptName;
        info.hisName=cur.hisName;
        info.image=cur.image;
        info.name=cur.name;
        info.title=cur.level;
        info.type='4';
        doc4.push(info);
       }
    }else{ 
        if(cur.active){
          let info={};
          info.deptId=cur.deptId;
          info.doctorId=cur.id;
          info.hisId=cur.hisId;
          info.deptName=cur.deptName;
          info.hisName=cur.hisName;
          info.image=cur.image;
          info.name=cur.name;
          info.title=cur.level;
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
                  docList[i].deptId=ids;
                  for(var j=0;j<this.state.doc1.length;j++){
                    if(this.state.doc1[j].doctorId==docList[i].id){
                      docList[i].active=true;
                    }
                  }
                }
                that.setState({
                  docList:docList,
                })
              }else{
                that.setState({
                  docList:[],
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
                  doc1List[i].deptId=ids;
                  for(var j=0;j<this.state.doc2.length;j++){
                    if(this.state.doc2[j].doctorId==doc1List[i].id){
                      doc1List[i].active=true;
                    }
                  }
                }
                that.setState({
                  doc1List:doc1List,
                 
                })
              }else{
                that.setState({
                  doc1List:[],
                 
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
                  doc2List[i].deptId=ids;
                  for(var j=0;j<this.state.doc3.length;j++){
                    if(this.state.doc3[j].doctorId==doc2List[i].id){
                      doc2List[i].active=true;
                    }
                  }
                }
                that.setState({
                  doc2List:doc2List,
                })
              }else{
                that.setState({
                  doc2List:[],
                 
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
                  doc3List[i].deptId=ids;
                  for(var j=0;j<this.state.doc4.length;j++){
                    if(this.state.doc4[j].doctorId==doc3List[i].id){
                      doc3List[i].active=true;
                    }
                  }
                }
                that.setState({
                  doc3List:doc3List
                })
              }else{
                that.setState({
                  doc3List:[]
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
        message.warning('请选择首席专家！', 2);
             return false;
      }else{
        if(this.state.doc2.length<=0){
          message.warning('请选择次席专家！', 2);
               return false;
        }else{
          if(this.state.doc3.length<=0){
            message.warning('请选择会诊专家！', 2);
                 return false;
          }else{
            if(this.state.doc4.length<=0){
              message.warning('请选择会诊专家！', 2);
                   return false;
            }else{
              if(this.state.detail==''){
                message.warning('请输入团队介绍！', 2);
                     return false;
              }else{
                if(this.state.price==''){
                  message.warning('请输入会诊金额！', 2);
                  return false;
                }
              }
            }
          }
        }
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
        }else{
          that.setState({
            deptList:[],
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
        }else{
          that.setState({
            dept1List:[],
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
        }else{
          that.setState({
            dept2List:[],
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
        }else{
          that.setState({
            dept3List:[],
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
       doctor2:false,
       doctor3:false,
       doctor4:false,
     })
  }
  /* 显示选择次席专家*/
  show2=()=>{
     this.setState({
       doctor2:true,
       doctor1:false,
       doctor3:false,
       doctor4:false,
     })     
  }
  /* 编辑 */
  edit=()=>{
    this.setState({
      name:this.props.detaildata.name,
      detail:this.props.detaildata.introduction,
      price:this.props.detaildata.price,
      visible1:true,
      visible:false,
      update:true,
      doctor1:true,
      doctor2:false,
      doctor3:false,
      doctor4:false,
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
       doctor2:false,
       doctor1:false,
       doctor4:false,
     })
  }
  /* 显示选择协调员*/
  show4=()=>{
     this.setState({
       doctor4:true,
       doctor2:false,
       doctor3:false,
       doctor1:false,
     })
  }
  showAdd=()=>{

      this.setState({
        detail:'',//团队介绍
        name:'',
        teamName:'',//团队名字
        leaderName:'',//领队名称
          visible1:true,
          update:false,
          visible:false,
          doctor1:false,
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
     })
     this.getdeptList1();
     this.getdeptList2();
     this.getdeptList3();
     this.getdeptList4();
  }

  render() {
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    

    return (
      <div className="page-order-list">
      <Modal
      className='team-modal'
      title="团队信息"
      style={{ top: 60,width:'800px',height:'700px'}}
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

        <div>首席专家：
              <span>
              {!!this.props.teamdetail&&this.props.teamdetail.map((item,index)=>{
                if(item.type=='2'){
                  return(
                  item.name+"("+item.deptName+")"
                  )
                }
                
              })}
              </span>
        </div>
        <div>次席专家：
              <span>
               {!!this.props.teamdetail&&this.props.teamdetail.map((item,index)=>{
                if(item.type==3){
                  return(
                  item.name+"("+item.deptName+")"
                  )
                }
               })}
              </span>
        </div>
        <div>会诊专家：
              <span>
               {!!this.props.teamdetail&&this.props.teamdetail.map((item,index)=>{
                if(item.type=='1'){
                  return(
                  item.name+"("+item.deptName+")"
                  )
                }
               })}
              </span>
        </div>
        <div>协调员：
              <span>
               {!!this.props.teamdetail&&this.props.teamdetail.map((item,index)=>{
                if(item.type=='4'){
                  return(
                  item.name+"("+item.deptName+")"
                  )
                }
               })}
              </span>
        </div>
        <div>
          团队介绍：
          <span>{!!this.props.detaildata&&this.props.detaildata.introduction}</span>
        </div>
        <div>
          会诊价格：
          <span>{!!this.props.detaildata&&!!this.props.detaildata.price&&this.props.detaildata.price}元</span>
        </div>
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
           <span >团队名称</span>
           <Input
             className="mb16"
             type="text" size="large" placeholder="请输入团队名称"  onFocus={()=>{console.log("dd");this.setState({doctor1:false,doctor2:false,doctor3:false,doctor4:false,})}}
             value={this.state.name}  onChange={(e) =>{this.setState({name: e.target.value,doctor1:false,doctor2:false,doctor3:false,doctor4:false,})}}
           />
           </p>
           <p>

           <span >首席专家</span>
           {!this.state.doctor1&&!!this.state.doc1.length<=0&&<Button size="large"   type="primary" onClick={() => this.show1()} style={{color:'#108ee9'}}>添加</Button>
           }   
            
          {(this.state.doctor1||!!this.state.doc1.length>0)&&<div className="person">
               {!!this.state.doc1&&!!this.state.doc1.length>0&&<div className="dept" style={{display:'block'}}>
                {this.state.doc1.map((item,index)=>{
                  return( 
                  <span key={index} className="item" 
                  onClick={()=>{
                    console.log("555")
                   this.delDoc(item)
                 }}
                  style={{display:'inline-block',position:'relative'}}>
                  {!!item.deptName?item.deptName:''}-{!!item.name?item.name:''}
                  </span>
                  )
              })}
                 </div>} 
                  
               {!this.state.doc1&&!this.state.doc1.length>0&&<div className="dept">
                  <span ></span>
               </div>}
               {this.state.doctor1&&<div className="select-dept">
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
              </div>}
              </div>}
           </p>
           <p>
           <span>次席专家</span>
           {!this.state.doctor2&&!!this.state.doc2.length<=0&&<Button size="large"   type="primary" onClick={() => this.show2()} style={{color:'#108ee9'}}>添加</Button>
           }
           {(this.state.doctor2||!!this.state.doc2.length>0)&&<div className="person">
           {!!this.state.doc2&&!!this.state.doc2.length>0&&<div className="dept" style={{display:'block'}}> 
             {this.state.doc2.map((item,index)=>{
               return(
                <span key={index} className="item"
                onClick={()=>{
                  this.delDoc1(item)
                }}
                 style={{display:'inline-block',position:'relative'}}>
                  {!!item.deptName?item.deptName:''}-{!!item.name?item.name:''}
                   </span>
               )
             })}
             {!this.state.doctor2&&<Button size="large"   type="primary" onClick={() => this.show2()} style={{color:'#108ee9'}}>添加</Button>}
           </div> }
           

             {!this.state.doc2&&!this.state.doc2.length<=0&&<div className="dept">
              <span ></span>
            </div>}
            {this.state.doctor2&&<div className="select-dept">
              <div className="dept-list">
                  {
                    this.state.dept1List&&this.state.dept1List.length>0&&this.state.dept1List.map((item,index)=>{
                      return(
                      <span
                        key={index} 
                        style={item.active?{background:'#108ee9',color:'white'}:{}} 
                        onClick={()=>{this.getdoc1List(item.no)}}
                      >{item.name}</span>
                      )
                    })
                  }
              </div>
              {
                this.state.doc1List&&this.state.doc1List.length>0&&<div className="doc-list">
                <div>
                  {this.state.doc1List.map((item,index)=>{
                    return( 
                    <span 
                    key={index} 
                    style={item.active?{color:'#108ee9'}:{}}
                    onClick={()=>{this.select1Doc(item.id)}}
                    >{item.name}</span>
                    )
                  })
                }
                </div>
                </div>
              }
              {
                this.state.doc1List&&this.state.doc1List.length<=0&&
                <div className="doc-list" style={{textAlign:'center',paddingTop:'100px',width:'460px'}}>
                  暂未查询到医生信息
                </div>
              }
          </div>}
            </div>
           }
           </p>
           <p>
           <span>会诊专家</span>
           {!this.state.doctor3&&!!this.state.doc3.length<=0&&<Button size="large"   type="primary" onClick={() => this.show3()} style={{color:'#108ee9'}}>添加</Button>
           }
           {(this.state.doctor3||!!this.state.doc3.length>0)&&<div className="person">
           {!!this.state.doc3&&!!this.state.doc3.length>0&&<div className="dept" style={{display:'block'}}> 
           {this.state.doc3.map((item,index)=>{
             return(
              <span key={index} className="item"
              onClick={()=>{
                this.delDoc2(item)
              }}
               style={{display:'inline-block',position:'relative'}}>
                  {!!item.deptName?item.deptName:''}-{!!item.name?item.name:''}</span>
             )
           })}
           {!this.state.doctor3&&<Button size="large"   type="primary" onClick={() => this.show3()} style={{color:'#108ee9'}}>添加</Button>}
         </div> }
        
           {!this.state.doc3&&!this.state.doc3.length<=0&&<div className="dept">
            <span ></span>
          </div>}
          {this.state.doctor3&&<div className="select-dept">
            <div className="dept-list">
                {
                  this.state.dept2List&&this.state.dept2List.length>0&&this.state.dept2List.map((item,index)=>{
                    return(
                    <span
                      key={index} 
                      style={item.active?{background:'#108ee9',color:'white'}:{}} 
                      onClick={()=>{this.getdoc2List(item.no)}}
                    >{item.name}</span>
                    )
                  })
                }
            </div>
            {
              this.state.doc2List&&this.state.doc2List.length>0&&<div className="doc-list">
              <div>
                {this.state.doc2List.map((item,index)=>{
                  return( 
                  <span 
                  key={index} 
                  style={item.active?{color:'#108ee9'}:{}}
                  onClick={()=>{this.select2Doc(item.id)}}
                  >{item.name}</span>
                  )
                })
              }
              </div>
              </div>
            }
            {
              this.state.doc2List&&this.state.doc2List.length<=0&&
              <div className="doc-list" style={{textAlign:'center',paddingTop:'100px',width:'460px'}}>
                暂未查询到医生信息
              </div>
            }
        </div>}
          </div>
         }
         </p>
           <p>
           <span style={{paddingRight:'19px'}}>协调员  </span>
           {!this.state.doctor4&&!!this.state.doc4.length<=0&&<Button size="large"   type="primary" onClick={() => this.show4()} style={{color:'#108ee9'}}>添加</Button>
           }
           {(this.state.doctor4||!!this.state.doc4.length>0)&& <div className="person">
           {!!this.state.doc4&&!!this.state.doc4.length>0&&<div className="dept" style={{display:'block'}}> 
           {this.state.doc4.map((item,index)=>{
             return(
              <span key={index} className="item" style={{display:'inline-block',position:'relative'}}
              onClick={()=>{
                this.delDoc3(item)
              }}
              >
                  {!!item.deptName?item.deptName:''}-{!!item.name?item.name:''}
              </span>
             )
           })}
           {!this.state.doctor4&&<Button size="large"   type="primary" onClick={() => this.show4()} style={{color:'#108ee9'}}>添加</Button>}
         </div> }
         
           {!this.state.doc4&&!this.state.doc4.length<=0&&<div className="dept">
            <span ></span>
          </div>}
          {this.state.doctor4&&<div className="select-dept">
            <div className="dept-list">
                {
                  this.state.dept3List&&this.state.dept3List.length>0&&this.state.dept3List.map((item,index)=>{
                    return(
                    <span
                      key={index} 
                      style={item.active?{background:'#108ee9',color:'white'}:{}} 
                      onClick={()=>{this.getdoc3List(item.no)}}
                    >{item.name}</span>
                    )
                  })
                }
            </div>
            {
              this.state.doc3List&&this.state.doc3List.length>0&&<div className="doc-list">
              <div>
                {this.state.doc3List.map((item,index)=>{
                  return( 
                  <span 
                  key={index} 
                  style={item.active?{color:'#108ee9'}:{}}
                  onClick={()=>{this.select3Doc(item.id)}}
                  >{item.name}</span>
                  )
                })
              }
              </div>
              </div>
            }
            {
              this.state.doc3List&&this.state.doc3List.length<=0&&
              <div className="doc-list" style={{textAlign:'center',paddingTop:'100px',width:'460px'}}>
                暂未查询到医生信息
              </div>
            }
        </div>}
          </div>
         }
         </p>
           <p>
           <span>团队介绍</span>
           <TextArea
             className="mb16 team-detail"
             type="text" size="large" placeholder="请输入团队介绍" onFocus={()=>{console.log("dd");this.setState({doctor1:false,doctor2:false,doctor3:false,doctor4:false,})}}
             value={this.state.detail} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({detail: e.target.value,doctor1:false,doctor2:false,doctor3:false,doctor4:false,})}
           />
           </p>
           <p>
           <span>会诊价格</span>
           <Input
             className="mb16"
             type="number" size="large"  placeholder="请输入会诊价格（元）"  onFocus={()=>{console.log("dd");this.setState({doctor1:false,doctor2:false,doctor3:false,doctor4:false,})}}
             value={this.state.price}  onChange={e => this.setState({price: e.target.value,doctor1:false,doctor2:false,doctor3:false,doctor4:false,})}
           />
           </p>
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
            type="text" size="large" placeholder="请输入团队名称" className="mb16"
            value={this.state.teamName} onKeyDown={(e)=> this.onKeydown(e)}  onChange={e => this.setState({teamName: e.target.value})}
          />
          <span>首席专家：</span>
          <Input
            type="text" size="large" placeholder="请输入首席专家" className="mb16"
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
           <span onClick={this.showAdd} style={{color:'#108ee9'}}>添加</span>
          </div>
         </div>
           <div className="team">
           {this.props.data&&this.props.data.recordList.length<= 0&&<div  style={{textAlign:'center',paddingTop:'100px',width:'460px'}}>
                暂未查询到相关信息
              </div>}
           {this.props.data&&this.props.data.recordList.length > 0&&
            this.props.data.recordList.map((item,index)=>{
              return(
                <div className="item" key={index}>
                {this.state.show&&<img src="./images/team-del.png" onClick={()=>{
                  this.del(item.id)
                }} alt=""/>}
                   <div className='title'><p>{item.name}</p></div>
                    <p className='detail'>
                       <span>首席专家：<span className='num'>{!!item.leaderName&&item.leaderName}</span></span>
                       <span>科室数量：<span className='num'>{!!item.deptCount&&item.deptCount}</span></span>
                    </p>
                    <p className='detail'>
                       <span>专家人数：<span className='num'>{!!item.doctorCount&&item.doctorCount}</span></span>
                       <span>已会诊数：<span className='num'>{!!item.mdtCount&&item.mdtCount}</span></span>
                    </p>
                    <p onClick={()=>{
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
