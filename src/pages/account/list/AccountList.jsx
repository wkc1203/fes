import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert, Modal,DatePicker , Input, Select, message,Drawer,Checkbox, Icon, Upload} from 'antd';
import { formatDate } from '../../../utils/utils';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import './style.less';

const Option = Select.Option;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const confirm = Modal.confirm;

class Account extends React.Component {
  state = {
    searchList:{},
    id: [],
    addId:'',
    addHisId:'',
    detail:'',
    editId:'',
    editType:'',
    editAccount:'',
    editPhone:'',
    editHisName:'',
    docEdit:false,
    editDept:'',
    editName:'',
    editPassword:'',
    editNewPassword:'',
    fileList: [],
    phone: '',
    name:'',
    status:'',
    startDate:'',
    endDate:'',
    updateVisible:false,
    addVisible:false,
    account:'',
    visible:false,
    dates: [
      // moment(formatDate(new Date(new Date() - (365 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
  }
  changeDate = (dates, dateStrings) => {
    this.setState({
      dates,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
  }
  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }
  getDet = (no) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/detail',
      payload: {no},
    });
    dispatch({
      type: 'account/save',
      payload: {showModal: true},
    });
  }
  openEdit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/save',
      payload: {showModal: true, detail: {}},
    });
  }
  changeDet = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/changeDet',
      payload,
    });
  }
  cancelModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/save',
      payload: {showModal: false, detail: {}},
    });
  }
  
  componentDidMount(){
    this.query(1);
    if(sessionStorage.getItem('hisId')=='-2'){
      this.setState({
        hasAll:'1',
        addHisId:sessionStorage.getItem('hisId'),
      })
    }else{
      this.setState({
        addHisId:sessionStorage.getItem('hisId'),
      })
    }

  }
  query = (pageNum) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/list',
      payload: {
        name: this.state.name,
        pageNum,
        account:this.state.account,
        phone:this.state.phone,
        startDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
        endDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
        numPerPage:'10',
        status:this.state.status,
        hisId: sessionStorage.getItem('hisId'),
      },
    });
  }
  action = (id,account ,hisId,userType,operType) => {
    const { dispatch } = this.props;
    if (operType == 'del') {
      confirm({
        content: '删除操作不可撤销，是否确定删除？',
        onOk() {
          dispatch({ type: 'account/action', payload: {id,account,hisId,userType, operType} });
        },
      });
    } else {
      dispatch({ type: 'account/action', payload: {id,account,hisId, userType,operType} });
    }
  }
  showUpdateDrawer= () => {
    this.setState({
      updateVisible: true,
    });
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
      addVisible:false,
      updateVisible: false,
      docEdit:false,
    });
  }
  reset = (id,account,userType ) => {
    const { dispatch } = this.props;
   
      confirm({
        content: '重置操作不可撤销，是否确定重置密码？',
        onOk() {
          dispatch({ type: 'account/reset', payload: {id,account,hisId,userType} });
        },
      });
    
  }
  searchList=(hisId)=>{
    const { dispatch, } = this.props;
    dispatch({
      type: 'account/getAllMenuOperate',
      payload: { 
        hisId:hisId,
      }, 
      callback:(res)=>{
         if(res.code==0){
           
            var list=res.data;
            for(var i=0;i<list.length;i++){
                list[i].checked=false;
                if(!!list[i].childMenu&&list[i].childMenu.length>0){
                  for(var j=0;j<list[i].childMenu.length;j++){
                    list[i].childMenu[j].checked=false;
                     if(!!list[i].childMenu[j].operatePurview&&list[i].childMenu[j].operatePurview.length>0){
                         for(var z=0;z<list[i].childMenu[j].operatePurview.length;z++){
                          list[i].childMenu[j].operatePurview[z].checked=false;
                         }
                     }
                  }
                }
                if(!!list[i].operatePurview&&list[i].operatePurview.length>0){
                  for(var c=0;c<list[i].operatePurview.length;c++){
                   list[i].operatePurview[c].checked=false;
                  }
              }

            }
            console.log("list",list)
            this.setState({
              searchList:list
            })
        
         }
      }
    })
  }
  onChanges(type,id1,id2,id3) {
      var list=this.state.searchList;
      if(type==1){
         if(list[id1].checked){
          list[id1].checked=false;
           if(!!list[id1].childMenu&&list[id1].childMenu.length>0){
                 for(var i=0;i<list[id1].childMenu.length;i++){
                  list[id1].childMenu[i].checked=false;
                   if(!!list[id1].childMenu[i].operatePurview&&list[id1].childMenu[i].operatePurview.length>0){
                    for(var j=0;j<list[id1].childMenu[i].operatePurview.length;j++){
                      list[id1].childMenu[i].operatePurview[j].checked=false;
                    }
                   }
                 
                 }
           }
           if(!!list[id1].operatePurview&&list[id1].operatePurview.length>0){
            for(var i=0;i<list[id1].operatePurview.length;i++){
             list[id1].operatePurview[i].checked=false;
            }
          }

         }else{
          list[id1].checked=true;
         }
       
      }
      if(type==2){
        if(list[id1].childMenu[id2].checked){
          if(!!list[id1].childMenu[id2].operatePurview&&list[id1].childMenu[id2].operatePurview.length>0){
            for(var i=0;i<list[id1].childMenu[id2].operatePurview.length;i++){
             list[id1].childMenu[id2].operatePurview[i].checked=false;
            }
          }
          list[id1].childMenu[id2].checked=false; 
        }else{
          list[id1].checked=true;
          list[id1].childMenu[id2].checked=true; 
        }
        
    
      }
      if(type==3){
        if(list[id1].childMenu[id2].operatePurview[id3].checked){
          list[id1].childMenu[id2].operatePurview[id3].checked=false;

        }else{
          list[id1].checked=true;
          list[id1].childMenu[id2].checked=true; 
          list[id1].childMenu[id2].operatePurview[id3].checked=true;

        }
    
      }
      if(type==5){
        if(list[id1].operatePurview[id2].checked){
          list[id1].operatePurview[id2].checked=false;
        }else{
          list[id1].checked=true;
          list[id1].operatePurview[id2].checked=true;

        }
        
      }
      this.setState({
        searchList:list
      })
      
    /* for(var i=0;i<list.length;i++){
          if(type==1&&id==list[i].id){
            list[i].checked=true;
             console.log("Ss",list[i]);
          }
          if(type==2){
            for(var j=0;j<list[i].childMenu.length;j++){
                  if(id==list[i].childMenu[j].id){
                    list[i].childMenu[j].checked=false;
                  }
            }
          }
          if(type==3){
            for(var j=0;j<list[i].childMenu.length;j++){
                for(var z=0;z<list[i].childMenu[j].operatePurview.length;z++){
                  if(id==list[i].childMenu[j].operatePurview[z].id){
                    list[i].childMenu[j].operatePurview[z].checked=false;
                  }
                  
                }
            }
          }
          if(type==5){
            for(var c=0;c<list[i].operatePurview.length;c++){
              if(id==list[i].operatePurview[c].id){
                list[i].operatePurview[c].checked=true;
              }
            
            }
          }
    }
   
     */
    
  }
  add=()=>{
    const { dispatch, } = this.props;

     const {editId,editType,editAccount,editPhone,editHisName,editDept,editName,editPassword,editNewPassword} =this.state;
     
     console.log(editPhone,editPhone==null)
     if(editType==''||editType==null){
      message.warning('请选择账号类型！', 2);
      return false;
     }
      var reg1 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
       if(editName==''||editName==null||editName=='null'||!reg1.test(editName)){
        message.warning('请输入真实姓名！', 2);
        return false;
  
       }
     var count=/^\w+$/;
     if(editAccount==''||editAccount==null||editAccount=='null'||!count.test(editAccount)||editAccount.length<3||editAccount.length>16){
      message.warning('请输入3-16位含字母、数字的账号名！', 2);
      return false;

     }
     var re=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

     if(editPhone==''||editPhone==null||editPhone=='null'||editPhone.length<11||!re.test(editPhone)){
      message.warning('请输入正确的11位手机号码！', 2);
      return false;

     }
     if(this.state.editType!=='oam_normal'){
      if(editHisName==''||editHisName==null||editHisName=='null'){
        message.warning('请选择所属医院！', 2);
        return false;
  
       }
     }
     
     if(editDept==''||editDept==null||editDept=='null'){
      message.warning('请输入所属部门！', 2);
      return false;

     }
     
     if(editPassword!=''&&editPassword.length<6||!count.test(editPassword)){
      message.warning('请输入不小于6位含字母、数字的密码！', 2);
      return false;
     }
     if(editPassword!=''&&editNewPassword!=''&&editPassword!=null&&editNewPassword!=null){

           if(editPassword!=editNewPassword){
            message.warning('密码不一致，请重新输入。', 2);
           }else{
            console.log("add1 s");
            if(this.state.editType!=='oam_normal'){
              dispatch({
                type: 'account/add',
                payload: { 
                  userType:editType,
                  account:editAccount,
                  phone:editPhone,
                  hisId:editHisName,
                  dept:editDept,
                  name:editName,
                  password:editPassword,
                }, 
                callback:(res)=>{
                  console.log("add1 ",res);
                   if(res.code==0){
                   // this.onClose();
                    this.setState({
                     // addVisible:false,
                      addId:res.data.id,
                      addHisId:!!res.data.hisId?res.data.hisId:'',
                    })
                    
                     this.addRole();
                   // message.success('操作成功！', 2);
                    //console.log("addVisible ",this.state.addVisible);
                     // this.query(1);
                   }else{
                    message.error('创建失败', 2);
                   }
                }
              })
            }else{
              dispatch({
                type: 'account/add',
                payload: { 
                  userType:editType,
                  account:editAccount,
                  phone:editPhone,
                  hisId:-2,
                  dept:editDept,
                  name:editName,
                  password:editPassword,
                }, 
                callback:(res)=>{
                  console.log("add1 ",res);
                   if(res.code==0){
                   // this.onClose();
                    this.setState({
                     // addVisible:false,
                      addId:res.data.id,
                      addHisId:!!res.data.hisId?res.data.hisId:'',
                    })
                    
                     this.addRole();
                   // message.success('操作成功！', 2);
                    //console.log("addVisible ",this.state.addVisible);
                     // this.query(1);
                   }else{
                    message.error('创建失败', 2);
                   }
                }
              })
            }
           }
     }else{
          if(editPassword==''&&editNewPassword!=''){
            message.warning('密码不一致，请重新输入。', 2);
            return false;

          }
          else{
            if(editPassword!==''&&editNewPassword==''){
              message.warning('密码不一致，请重新输入。', 2);
              return false;

            }else{
              message.warning('请输入密码并确认密码', 2);
              return false;
            }
          }

          
     }
}
 unique(arr){
  return Array.from(new Set(arr));
}
addRole=()=>{
  if(!this.state.docEdit){
    if(this.state.addId==''){
      message.error('请填写完整的基本信息！', 2);
      return false;
    }
    console.log("hisId:",this.state.addHisId)
    if(this.state.editType!=='oam_normal'&&this.state.addHisId=='')
  {
    message.error('请填写完整的基本信息！', 2);
      return false;
  
  }
  }
 
  const { dispatch, location = {} } = this.props;
  var roleList=[];
    var list=this.state.searchList;
    for(var i=0;i<list.length;i++){
      if(list[i].checked&&!list[i].userId){
        roleList.push({"id":list[i].id})
      }
      
      if(!!list[i].childMenu&&list[i].childMenu.length>0){
        for(var j=0;j<list[i].childMenu.length;j++){
          if(list[i].childMenu[j].checked&&!list[i].childMenu[j].userId){
            roleList.push({"id":list[i].childMenu[j].id})
          }
           if(!!list[i].childMenu[j].operatePurview&&list[i].childMenu[j].operatePurview.length>0){
               for(var z=0;z<list[i].childMenu[j].operatePurview.length;z++){
                if(list[i].childMenu[j].operatePurview[z].checked&&!list[i].childMenu[j].operatePurview[z].userId){
                  roleList.push({"id":list[i].childMenu[j].operatePurview[z].id})
                }
               }
           }
        }
      }
      if(!!list[i].operatePurview&&list[i].operatePurview.length>0){
        for(var c=0;c<list[i].operatePurview.length;c++){
         if(list[i].operatePurview[c].checked&&!list[i].operatePurview[c].userId){
          roleList.push({"id":list[i].operatePurview[c].id})
        }
        }
    }

  }

        for(var i=0;i<list.length;i++){
             if(list[i].checked&&!!list[i].userId&&list[i].userId!=''){
              roleList.push({"id":list[i].id})
             }
            
            if(!!list[i].childMenu&&list[i].childMenu.length>0){
              for(var j=0;j<list[i].childMenu.length;j++){
                if(list[i].childMenu[j].checked&&!!list[i].childMenu[j].userId&&list[i].childMenu[j].userId!=''){
                  roleList.push({"id":list[i].childMenu[j].id})
                 }
                

                 if(!!list[i].childMenu[j].operatePurview&&list[i].childMenu[j].operatePurview.length>0){
                     for(var z=0;z<list[i].childMenu[j].operatePurview.length;z++){
                      if(list[i].childMenu[j].operatePurview[z].checked&&!!list[i].childMenu[j].operatePurview[z].userId&&list[i].childMenu[j].operatePurview[z].userId!=''){
                        list[i].childMenu[j].operatePurview[z].checked=true;
                        roleList.push({"id":list[i].childMenu[j].operatePurview[z].id})
                       }
                     }
                 }
              }
            }
            if(!!list[i].operatePurview&&list[i].operatePurview.length>0){
              for(var c=0;c<list[i].operatePurview.length;c++){
               if(list[i].operatePurview[c].checked&&!!list[i].operatePurview[c].userId&&list[i].operatePurview[c].userId!=''){
                list[i].operatePurview[c].checked=true;
                roleList.push({"id":list[i].operatePurview[c].id})
               }
              }
          }

        }
   
  console.log(this.state.addHisId,this.state.addId,JSON.stringify(this.unique(roleList)))
      dispatch({
        type: 'account/addRole',
        payload: { 
          hisId:this.state.addHisId.toString(),
          userId:this.state.addId.toString(),
          purviewList:JSON.stringify(this.unique(roleList))
        }, 
        callback:(res)=>{
          console.log("add1 ",res);
          if(res.code==0){
           this.onClose();
            this.setState({
             addVisible:false,
            })
            
           message.success('操作成功！', 2);
            console.log("addVisible ",this.state.addVisible);
             this.query(1);
          }else{
            message.error('操作失败！', 2);
          }
        }
      }) 
     
    
}
  update=()=>{
      const { dispatch, location = {} } = this.props;
       const {editId,editType,editAccount,editPhone,editHisName,editDept,editName,editPassword,editNewPassword} =this.state;
       console.log(editPhone,editPhone==null)
      if(this.state.docEdit){
        
              this.addRole();
         
          
      }else{
        if(editType==''||editType==null){
          message.warning('请选择账号类型！', 2);
          return false;
         }
         var reg1 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
         if(editName==''||editName==null||editName=='null'||!reg1.test(editName)){
          message.warning('请输入真实姓名！', 2);
          return false;
    
         }
         var count=/^\w+$/;
         console.log(editAccount,editAccount.length)
       if(editAccount==''||editAccount==null||editAccount=='null'||editAccount.length<3||editAccount.length>16){
        message.warning('请输入3-16位含字母、数字的账号名！', 2);
        return false;
  
       }
         if(editPhone==''||editPhone==null||editPhone=='null'||editPhone.length<11){
          message.warning('请输入11位手机号码！', 2);
          return false;
  
         }
         if(this.state.editType!=='oam_normal'){
          if(editHisName==''||editHisName==null||editHisName=='null'){
            message.warning('请选择所属医院！', 2);
            return false;
      
           }
         }
         if(editDept==''||editDept==null||editDept=='null'){
          message.warning('请输入所属部门！', 2);
          return false;
  
         }
      
         if(editPassword!=''&&editPassword.length<6){
          message.warning('请输入不小于6位数的密码！', 2);
          return false;
         }
         if(editPassword!=''&&editNewPassword!=''&&editPassword!=null&&editNewPassword!=null){
  
               if(editPassword!=editNewPassword){
                message.warning('密码不一致，请重新输入。', 2);
               }else{
                if(this.state.editType!=='oam_normal'){
                    dispatch({
                      type: 'account/update',
                      payload: { 
                        id:editId,
                        userType:editType,
                        account:editAccount,
                        phone:editPhone,
                        hisId:editHisName,
                        dept:editDept,
                        name:editName,
                        password:editPassword,
                      },
                      callback:(res)=>{
                        if(res.code==0){
                           
                          //message.success('操作成功！', 2);
                            //this.onClose();
                            //this.query(1);
                            this.setState({
                              // addVisible:false,
                               addId:res.data.id,
                               addHisId:!!res.data.hisId?res.data.hisId:'',
                             })
                             this.addRole();
                          }else{
                            message.error('操作失败！', 2);
                          }
                      }
                    })
                 }else{
                  dispatch({
                    type: 'account/update',
                    payload: { 
                      id:editId,
                      userType:editType,
                      account:editAccount,
                      phone:editPhone,
                      dept:editDept,
                      name:editName,
                      hisId:-2,
                      password:editPassword,
                    },
                    callback:(res)=>{
                       if(res.code==0){
                
                        //message.success('操作成功！', 2);
                          //this.onClose();
                          //this.query(1);
                          this.setState({
                            // addVisible:false,
                             addId:res.data.id,
                             addHisId:!!res.data.hisId?res.data.hisId:'',
                           })
                           this.addRole();
                        }else{
                          message.error('操作失败！', 2);
                         }
                    }
                  })
                 }
                 
               }
         }else{
              if(editPassword==''&&editNewPassword!=''){
                message.warning('密码不一致，请重新输入。', 2);
                return false;
  
              }
              else{
                if(editPassword!==''&&editNewPassword==''){
                  message.warning('密码不一致，请重新输入。', 2);
                  return false;
  
                }else{
  
                  if(this.state.editType!=='oam_normal'){
                    dispatch({
                      type: 'account/update',
                      payload: { 
                        id:editId,
                        userType:editType,
                        account:editAccount,
                        phone:editPhone,
                        hisId:editHisName,
                        dept:editDept,
                        name:editName,
                      },
                      callback:(res)=>{
                         if(res.code==0){
                          
                         // message.success('操作成功！', 2);
                          // this.onClose();
                           //this.query(1);
                           this.setState({
                            // addVisible:false,
                             addId:res.data.id,
                             addHisId:!!res.data.hisId?res.data.hisId:'',
                           })
                           this.addRole();
                         }else{
                          message.error('操作失败！', 2);
                         }
                      }
                    })
                  }else{
                    dispatch({
                      type: 'account/update',
                      payload: { 
                        id:editId,
                        userType:editType,
                        account:editAccount,
                        phone:editPhone,
                        dept:editDept,
                        hisId:-2,
                        name:editName,
                      },
                      callback:(res)=>{
                         if(res.code==0){
                          this.addRole();
                         // message.success('操作成功！', 2);
                          // this.onClose();
                           //this.query(1);
                           this.setState({
                            // addVisible:false,
                             addId:res.data.id,
                             addHisId:!!res.data.hisId?res.data.hisId:'',
                           })
                         }else{
                          message.error('操作失败！', 2);
                         }
                      }
                    })
  
                  }
                  
                }
              }
  
              
         }
      }
       
  }
  getDetail = (id,hisId) => {
    const { dispatch, location = {} } = this.props;
    console.log("iii",id,hisId)
    dispatch({
      type: 'account/getDetail',
      payload: { id:id,hisId:hisId },
      callback:(res)=>{
         this.setState({
           detail:res.data,
         })
        if(this.state.updateVisible){
          console.log("user",this.state.detail);
          this.setState({
           editId:!!res.data.id?res.data.id:'',
           editType:!!res.data.userType?res.data.userType:'',
           editAccount:!!res.data.account?res.data.account:'',
           editPhone:!!res.data.phone?res.data.phone:'',
           editHisName:!!res.data.hisId?res.data.hisId:'',
           editDept:!!res.data.dept?res.data.dept:'',
           editName:!!res.data.name?res.data.name:'',
           addId:!!res.data.id?res.data.id:'',
           addHisId:!!res.data.hisId?res.data.hisId:''
          })
       }
      }
    });
  }
  getRole = (id,hisId) => {
    const { dispatch, location = {} } = this.props;
    console.log("iii",id)
    dispatch({
      type: 'account/getRole',
      payload: { id:id,hisId:hisId },
      callback:(res)=>{
        var list=res.data;
        for(var i=0;i<list.length;i++){
             if(!!list[i].userId&&list[i].userId!=''){
              list[i].checked=true;
             }else{
              list[i].checked=false;
             }
            
            if(!!list[i].childMenu&&list[i].childMenu.length>0){
              for(var j=0;j<list[i].childMenu.length;j++){
                if(!!list[i].childMenu[j].userId&&list[i].childMenu[j].userId!=''){
                  list[i].childMenu[j].checked=true;
                 }else{
                  list[i].childMenu[j].checked=false;
                 }
                

                 if(!!list[i].childMenu[j].operatePurview&&list[i].childMenu[j].operatePurview.length>0){
                     for(var z=0;z<list[i].childMenu[j].operatePurview.length;z++){
                      if(!!list[i].childMenu[j].operatePurview[z].userId&&list[i].childMenu[j].operatePurview[z].userId!=''){
                        list[i].childMenu[j].operatePurview[z].checked=true;
                       }else{
                        list[i].childMenu[j].operatePurview[z].checked=false;
                       }
                      
                     }
                 }
              }
            }
            if(!!list[i].operatePurview&&list[i].operatePurview.length>0){
              for(var c=0;c<list[i].operatePurview.length;c++){
               
               if(!!list[i].operatePurview[c].userId&&list[i].operatePurview[c].userId!=''){
                list[i].operatePurview[c].checked=true;
               }else{
                list[i].operatePurview[c].checked=false;
               }
              }
          }

        }
        console.log("list",list)
        this.setState({
          searchList:list
        })
        
        
       
      }
    });
    
  }
  
 
  
  render() {
    console.log("hisp",this.props.location.query.operate);
    var operateList='';
    var accountAdd=false;
    var accountStart=false;
    var accountStop=false;
    var accountEdit=false;
    var accountDel=false;
    var accountReset=false;

    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='ACCOUNT_ADD')
          {
            accountAdd=true;
          }
          if(operateList[i]=='ACCOUNT_EDIT')
          {
            
            accountEdit=true;
          }
          if(operateList[i]=='ACCOUNT_STOP')
          {
            accountStop=true;
          }
          if(operateList[i]=='ACCOUNT_START')
          {
            accountStart=true;
            
          }
          if(operateList[i]=='ACCOUNT_DEL')
          {
            accountDel=true;
            
          }
          if(operateList[i]=='ACCOUNT_RESET')
          {
           accountReset=true;
            
          }
       }
     

     }
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      }, {
        title: '部门',
        dataIndex: 'dept',
      }, {
        title: '账号',
        dataIndex: 'account',
      }, {
        title: '手机',
        dataIndex: 'phone',
      }, {
        title: '医院',
        dataIndex: 'hospital',
      }, {
        title: '状态',
        dataIndex: 'status',
      },{
        title: '创建时间',
        dataIndex: 'createDate',
      },  {
        title: '操作',
        dataIndex: 'action',
        render: (action) => {
          return (
            <span>
            <a onClick={() =>{
               
              this.getDetail(action.id,action.hisId);
              this.getRole(action.id,action.hisId)
              this.showDrawer();
            }}>查看</a>
            {accountEdit&&action.falg !== '4'&&<span className="divider-v" />}
            {accountEdit&&action.falg !== '4'?<a onClick={() => {
              this.getDetail(action.id,action.hisId);
             
              this.getRole(action.id,action.hisId);
               if(action.userType=='doc_platform'){
                this.setState({
                  docEdit:true,
                  addId:action.id
                });
               }else{
                this.showUpdateDrawer();
               }
              
            }}>修改</a>:''}
            {accountStop&&action.falg !== '4'?<span className="divider-v" />:''}
              {accountStop&&action.falg !== '4'&&action.status!='0'  ? <a onClick={() => this.action(action.id,action.account,action.hisId,action.userType, 'invalid')}>禁用</a> :
              accountStart&&action.falg !== '4'&&action.status!='1'?<a onClick={() => this.action(action.id,action.account,action.hisId,action.userType, 'enable')}>启用</a>:''}
              {accountDel&&<span className="divider-v" />}
              {accountDel&&action.falg !== '4'?<a className="delete" onClick={() => this.action(action.id,action.account,action.hisId, action.userType,'del')}>删除</a>:''}
              {accountReset&&action.falg !== '4' ?<span className="divider-v" />:''}
              {accountReset&&action.falg !== '4' &&<a onClick={() => this.reset(action.id,action.account,action.hisId,action.userType)}>重置密码</a>}
            </span>
          );
        },
      },
    ];
    const data = this.props.data && this.props.data.recordList.length > 0 ?
    this.props.data.recordList.map((item) => {
      return {
        key: item.id,
        name: item.name,
        account: item.account,
        dept: item.dept,
        phone: item.phone,
        status: item.status=='0'?'禁用':'启用',
        hospital:!!item.hisId?item.hisId=='2214'?'儿童医院':item.hisId=='2215'?'凯桥医疗科技':'凯桥互联网医院':'凯桥互联网医院',
        createDate: item.createDate,
        action: {id: item.id, account: item.account,status:item.status,flag:item.userFlag=='4',hisId:!!item.hisId?item.hisId:'',userType:item.userType},
      };
    }) : [];
    return (
      <div className="page-account">
          <Drawer
          title="账户信息"
          placement="right"
          bodyStyle={{
            width: '1000px',
          
          }}
          width='1200'
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
                {this.state.detail!=''&&<div className="p-opt-cs-dtl">
                <div style={{padding:30,backgroundColor:'#fff'}}>
              <div className="m-info">
                  <div className="info-hd">账户信息</div>
                  <div className="info-bd">
                  
                      <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">账号类型：</div>
                        <div className="item-value">
                        {this.state.detail!=''&&this.state.detail.userType=='doc_platform'?'医生商户账号':''}
                        {this.state.detail!=''&&this.state.detail.userType=='platform'?'商户账号':''}
                        {this.state.detail!=''&&this.state.detail.userType=='oam_normal'?'运营账号':''}
                        {this.state.detail!=''&&this.state.detail.userType=='referral'?'双转账号':''}

                        </div>
                      </div>
                      <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">账号名：</div>
                        <div className="item-value">{this.state.detail!=''&&this.state.detail.account||''}</div>
                      </div>
                    
                  </div>
                  <div className="info-bd">
                     
                    <div className="item" style={{'flex':'50%'}}>
                      <div className="item-key">手机号码：</div>
                      <div className="item-value">{this.state.detail!=''&&this.state.detail.phone||''}</div>
                    </div>
                    {this.state.detail.userType!=='oam_normal'&&<div className="item" style={{'flex':'50%'}}>
                      <div className="item-key">所属医院：</div>
                      <div className="item-value">{this.state.detail!=''&&this.state.detail.hisId=='2214'?'儿童医院':this.state.detail.hisId=='2215'?'凯桥医疗科技':this.state.detail.hisId=='-2'?'凯桥互联网医院':''}</div>
                    </div>}
                  
                  
                  </div>
                  <div className="info-bd">
                      <div className="item" style={{'flex':'50%'}}>
                      <div className="item-key">所属部门：</div>
                      <div className="item-value">{this.state.detail!=''&&this.state.detail.dept}</div>
                    </div>
                    <div className="item" style={{'flex':'50%'}}>
                      <div className="item-key">真实姓名：</div>
                      <div className="item-value">{this.state.detail!=''&&this.state.detail.name||''}</div>
                    </div>
        
                </div>
                  <div className="info-bd">
                    <div className="item" style={{'flex':'50%'}}>
                    <div className="item-key">状态：</div>
                    <div className="item-value">{this.state.detail!=''&&this.state.detail.status=='0'?'禁用':'启用'}</div>
                  </div>
                  <div className="item" style={{'flex':'50%'}}>
                    <div className="item-key">创建时间：</div>
                    <div className="item-value">{this.state.detail!=''&&this.state.detail.createDate||''}</div>
                  </div>
    
            </div>
                </div>
              </div>
              </div>}
              {
                this.state.searchList.length>0&&<div className='role-title'>权限分配</div>}
                {
                  this.state.searchList.length>0&&<div className='role'>
                     
                     {
                       this.state.searchList.length>0&&this.state.searchList.map((item,index)=>{
                         return(
                           <div className='role-item'>
                               <div className={`one ${item.childMenu.length>0||item.operatePurview.length>0?'textCenter':''}`}>
                                <Checkbox checked={item.checked}
                                
                                >
                              {item.name}
                              </Checkbox>
                               </div>
                               {!!item.operatePurview&&item.operatePurview.length>0&&<div className='one'>
                                         <div className='role-sub-item'>
                                          <div className='two'>
                                          {!!item.operatePurview&&item.operatePurview.length>0&&item.operatePurview.map((item1,index1)=>{
                                            return(
                                              <div className='role-operate'>
                                              <Checkbox checked={item1.checked} 
                                             
                                              >{item1.name}</Checkbox>
                                              </div>
                                              )
                                              })
                                              }
                                        </div>
                                        </div>
                                 </div>}
                               {!!item.childMenu&&item.childMenu.length>0&&<div className='one'>
                               {!!item.childMenu&&item.childMenu.length>0&&item.childMenu.map((item1,index1)=>{
                                       return(
                                         <div className='role-sub-item'>
                                           <div className='two'>
                                              <Checkbox checked={item1.checked} 
                                              
                                            >{item1.name}</Checkbox>
                                           </div>
                                        
                                           {!!item1.operatePurview&&item1.operatePurview.length>0&&<div className='two'>
                                          {!!item1.operatePurview&&item1.operatePurview.length>0&&item1.operatePurview.map((item2,index2)=>{
                                            return(
                                              <div className='role-operate'>
                                              <Checkbox checked={item2.checked} 
                                              
                                              >{item2.name}</Checkbox>
                                              </div>
                                             
                                            )
                                          })
                                        }
                                        </div>
                                      }
                                        </div>
                                       )
                                 })
                                 }
                                 </div>}
                                 
                           </div>
                         )
                       })
                     }
               
               </div>}
               
        </Drawer>
    
          {<Drawer
          title="修改账号"
          placement="right"
          bodyStyle={{
            width: '1000px',
          
          }}
          width='1200'
          closable={true}
          onClose={this.onClose}
          visible={this.state.docEdit}
        >
                {this.state.detail!=''&&<div className="p-opt-cs-dtl">
                <div style={{padding:30,backgroundColor:'#fff'}}>
              <div className="m-info">
                  <div className="info-hd">账户信息</div>
                  <div className="info-bd">
                  
                      <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">账号类型：</div>
                        <div className="item-value">
                        {this.state.detail!=''&&this.state.detail.userType=='doc_platform'?'医生商户账号':''}
                        {this.state.detail!=''&&this.state.detail.userType=='platform'?'商户账号':''}
                        {this.state.detail!=''&&this.state.detail.userType=='oam_normal'?'运营账号':''}
                        </div>
                      </div>
                      <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">账号名：</div>
                        <div className="item-value">{this.state.detail!=''&&this.state.detail.account||''}</div>
                      </div>
                    
                  </div>
                  <div className="info-bd">
                     
                    <div className="item" style={{'flex':'50%'}}>
                      <div className="item-key">手机号码：</div>
                      <div className="item-value">{this.state.detail!=''&&this.state.detail.phone||''}</div>
                    </div>
                    {this.state.detail.userType!=='oam_normal'&&<div className="item" style={{'flex':'50%'}}>
                      <div className="item-key">所属医院：</div>
                      <div className="item-value">{this.state.detail!=''&&this.state.detail.hisId=='2214'?'儿童医院':this.state.detail.hisId=='2215'?'凯桥医疗科技':this.state.detail.hisId=='-2'?'凯桥互联网医院':''}</div>
                    </div>}
                  
                  
                  </div>
                  <div className="info-bd">
                      <div className="item" style={{'flex':'50%'}}>
                      <div className="item-key">所属部门：</div>
                      <div className="item-value">{this.state.detail!=''&&this.state.detail.dept}</div>
                    </div>
                    <div className="item" style={{'flex':'50%'}}>
                      <div className="item-key">真实姓名：</div>
                      <div className="item-value">{this.state.detail!=''&&this.state.detail.name||''}</div>
                    </div>
        
                </div>
                  <div className="info-bd">
                    <div className="item" style={{'flex':'50%'}}>
                    <div className="item-key">状态：</div>
                    <div className="item-value">{this.state.detail!=''&&this.state.detail.status=='0'?'禁用':'启用'}</div>
                  </div>
                  <div className="item" style={{'flex':'50%'}}>
                    <div className="item-key">创建时间：</div>
                    <div className="item-value">{this.state.detail!=''&&this.state.detail.createDate||''}</div>
                  </div>
    
            </div>
                </div>
              </div>
              </div>}
              {
                this.state.searchList.length>0&&<div className='role-title'>权限分配</div>}
                {
                  this.state.searchList.length>0&&<div className='role'>
                     
                     {
                       this.state.searchList.length>0&&this.state.searchList.map((item,index)=>{
                         return(
                           <div className='role-item'>
                               <div className={`one ${item.childMenu.length>0||item.operatePurview.length>0?'textCenter':''}`}>
                                <Checkbox checked={item.checked}
                                onChange={()=>{
                                    this.onChanges(1,index,'','')
                                }}
                                >
                              {item.name}
                              </Checkbox>
                               </div>
                               {!!item.operatePurview&&item.operatePurview.length>0&&<div className='one'>
                                         <div className='role-sub-item'>
                                          <div className='two'>
                                          {!!item.operatePurview&&item.operatePurview.length>0&&item.operatePurview.map((item1,index1)=>{
                                            return(
                                              <div className='role-operate'>
                                              <Checkbox checked={item1.checked} 
                                              onChange={()=>{
                                                this.onChanges(5,index,index1,'')
                                            }}
                                              >{item1.name}</Checkbox>
                                              </div>
                                              )
                                              })
                                              }
                                        </div>
                                        </div>
                                 </div>}
                               {!!item.childMenu&&item.childMenu.length>0&&<div className='one'>
                               {!!item.childMenu&&item.childMenu.length>0&&item.childMenu.map((item1,index1)=>{
                                       return(
                                         <div className='role-sub-item'>
                                           <div className='two'>
                                              <Checkbox checked={item1.checked} 
                                              onChange={()=>{
                                                this.onChanges(2,index,index1,'')
                                            }}
                                            >{item1.name}</Checkbox>
                                           </div>
                                        
                                           {!!item1.operatePurview&&item1.operatePurview.length>0&&<div className='two'>
                                          {!!item1.operatePurview&&item1.operatePurview.length>0&&item1.operatePurview.map((item2,index2)=>{
                                            return(
                                              <div className='role-operate'>
                                              <Checkbox checked={item2.checked} 
                                              onChange={()=>{
                                                this.onChanges(3,index,index1,index2)
                                            }}
                                              >{item2.name}</Checkbox>
                                              </div>
                                             
                                            )
                                          })
                                        }
                                        </div>
                                      }
                                        </div>
                                       )
                                 })
                                 }
                                 </div>}
                                 
                           </div>
                         )
                       })
                     }
               
               </div>}
               <div className='submit-btn' style={{marginTop:'50px',textAlign:'center'}}>
               <Button size="large" type="primary"  onClick={this.update}>保存</Button>

               </div>
        </Drawer>}
        {<Drawer
          title="修改信息"
          placement="right"
          bodyStyle={{
            width: '1000px',
          
          }}
          width='1200'
          closable={true}
          onClose={this.onClose}
          visible={this.state.updateVisible}
        >
            <div className="p-opt-cs-dtl">
                <div style={{padding:30}}>
              <div className="m-info" style={{borderBottom:'none',padding:'40px 20px',background:'#f7f7f7'}}>
                  <div className="info-hd">基本信息</div>
                  <div className="info-bd">
                    <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">账号类型:</div>
                        {this.state.hasAll=='1'&&<div className="item-value">
                            <Select
                           
                            size="large"
                            style={{width: '120px', marginRight: '30px'}}
                            placeholder="请选择"
                            value={this.state.editType=='platform'?'商户账号':this.state.editType=='oam_normal'?'运营账号':this.state.detail.userType=='referral'?'转诊账号':''}
                            onChange={value => {
                              this.setState({editType: value})
                               if(value=='oam_normal'){
                                 this.searchList(-2);
                               }else{
                                 this.searchList(this.state.editHisName)
                               }
                            }
                          }
                          >
                            <Option value="platform">商户账号</Option>
                            <Option value="oam_normal">运营账号</Option>
                          </Select>
                        </div>}
                        {this.state.hasAll!=='1'&&<div className="item-value">
                        <Select
                        size="large"
                        disabled={this.state.detail.userType=='referral'}
                        style={{width: '120px', marginRight: '30px'}}
                        placeholder="请选择"
                        value={this.state.editType=='platform'?'商户账号':this.state.detail.userType=='referral'?'转诊账号':''}
                        onChange={value => {
                          this.setState({editType: value})
                           if(value=='oam_normal'){
                             this.searchList(-2);
                           }else{
                             this.searchList(this.state.editHisName)
                           }
                        }
                      }
                      >
                        <Option value="platform">商户账号</Option>
                      </Select>
                    </div>}
                    </div>
                    <div className="item" style={{'flex':'50%'}}>
                    <div className="item-key">真实姓名：</div>
                    <div className="item-value">
                        <Input
                        disabled={this.state.detail.userType=='referral'}
                        style={{width:'300px'}}
                        type="text" size="large" placeholder="请输入真实姓名"
                        value={this.state.editName} onChange={e => this.setState({editName: e.target.value})}
                      />
                      </div>
                </div>
             </div>
                  
                  <div className="info-bd">
                      <div className="item" style={{'flex':'50%'}}>
                          <div className="item-key">账号名：</div>
                          <div className="item-value">
                            <Input style={{width:'300px'}} 
                            disabled={this.state.detail.userType=='referral'}
                            type="text" size="large" placeholder="请输入3-16位含字母、数字的账号名"
                            value={this.state.editAccount} onChange={e => this.setState({editAccount: e.target.value})}
                          />
                          </div>
                      </div>
                    <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">手机号码：</div>
                        <div className="item-value">
                            <Input style={{width:'300px'}} maxLength='11'
                            disabled={this.state.detail.userType=='referral'}
                            type="text" size="large" placeholder="请输入正确的11位手机号码"
                            value={this.state.editPhone} onChange={e => this.setState({editPhone: e.target.value})}
                          />
                          </div>
                    </div>
        
                 </div>
                 <div className="info-bd">
                 {this.state.hasAll=='1'&&this.state.editType!=='oam_normal'&&this.state.editType!=='运营账号'&&<div className="item" style={{'flex':'50%'}}>
                          <div className="item-key">所属医院：</div>
                          <div className="item-value">
                          <Select
                          disabled={this.state.detail.userType=='referral'}
                          size="large"
                          style={{width: '120px', marginRight: '30px'}}
                          placeholder="请选择所属医院"
                            value={this.state.editHisName=='2214'?'儿童医院':this.state.editHisName=='2215'?'凯桥医疗科技':''}
                            onChange={value =>{
                              this.setState({editHisName: value})
                              this.searchList(value)
                             }}
                        >
                         
                          <Option value="2214">儿童医院</Option>
                          <Option value="2215">凯桥医疗科技</Option>
                        </Select>
                          </div>
                      </div>}
                      {this.state.hasAll!=='1'&&this.state.editType!=='oam_normal'&&this.state.editType!=='运营账号'&&<div className="item" style={{'flex':'50%'}}>
                          <div className="item-key">所属医院：</div>
                          <div className="item-value">
                          <Select
                          size="large"
                          disabled={this.state.detail.userType=='referral'}
                          style={{width: '120px', marginRight: '30px'}}
                          placeholder="请选择所属医院"
                          value={this.state.editHisName=='2214'?'儿童医院':this.state.editHisName=='2215'?'凯桥医疗科技':''}
                          onChange={value =>{
                            this.setState({editHisName: value})
                            this.searchList(value)
                           }}
                        >
                          {this.state.addHisId=='2214'&&<Option value="2214">儿童医院</Option>}
                          {this.state.addHisId=='2215'&&<Option value="2215">凯桥医疗科技</Option>}
                        </Select>
                          </div>
                      </div>}
                      
                    <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">所属部门：</div>
                        <div className="item-value">
                            <Input style={{width:'300px'}}
                            disabled={this.state.detail.userType=='referral'}
                            type="text" size="large" placeholder="请输入所属部门"
                            value={this.state.editDept} onChange={e => this.setState({editDept: e.target.value})}
                          />
                        </div>
                    </div>
        
                 </div>
                 <div className="info-bd">
                      <div className="item" style={{'flex':'50%'}}>
                          <div className="item-key">设置密码：</div>
                          <div className="item-value">
                            <Input style={{width:'300px'}}
                            type="password" size="large" placeholder="请输入不小于6位数的密码"
                            value={this.state.editPassword} onChange={e => this.setState({editPassword: e.target.value})}
                          />
                          </div>
                      </div>
                    <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">确定密码：</div>
                        <div className="item-value">
                            <Input style={{width:'300px'}}
                            type="password" size="large" placeholder="请确认密码"
                            value={this.state.editNewPassword} onChange={e => this.setState({editNewPassword: e.target.value})}
                          />
                        </div>
                    </div>
        
                 </div>
                  
                </div>
              </div>
              </div>
              {
                this.state.searchList.length>0&&<div className='role-title'>权限分配</div>}
                {
                  this.state.searchList.length>0&&<div className='role'>
                     
                     {
                       this.state.searchList.length>0&&this.state.searchList.map((item,index)=>{
                         return(
                           <div className='role-item'>
                               <div className={`one ${item.childMenu.length>0||item.operatePurview.length>0?'textCenter':''}`}>
                                <Checkbox checked={item.checked}
                                onChange={()=>{
                                    this.onChanges(1,index,'','')
                                }}
                                >
                              {item.name}
                              </Checkbox>
                               </div>
                               {!!item.operatePurview&&item.operatePurview.length>0&&<div className='one'>
                                         <div className='role-sub-item'>
                                          <div className='two'>
                                          {!!item.operatePurview&&item.operatePurview.length>0&&item.operatePurview.map((item1,index1)=>{
                                            return(
                                              <div className='role-operate'>
                                              <Checkbox checked={item1.checked} 
                                              onChange={()=>{
                                                this.onChanges(5,index,index1,'')
                                            }}
                                              >{item1.name}</Checkbox>
                                              </div>
                                              )
                                              })
                                              }
                                        </div>
                                        </div>
                                 </div>}
                               {!!item.childMenu&&item.childMenu.length>0&&<div className='one'>
                               {!!item.childMenu&&item.childMenu.length>0&&item.childMenu.map((item1,index1)=>{
                                       return(
                                         <div className='role-sub-item'>
                                           <div className='two'>
                                              <Checkbox checked={item1.checked} 
                                              onChange={()=>{
                                                this.onChanges(2,index,index1,'')
                                            }}
                                            >{item1.name}</Checkbox>
                                           </div>
                                        
                                           {!!item1.operatePurview&&item1.operatePurview.length>0&&<div className='two'>
                                          {!!item1.operatePurview&&item1.operatePurview.length>0&&item1.operatePurview.map((item2,index2)=>{
                                            return(
                                              <div className='role-operate'>
                                              <Checkbox checked={item2.checked} 
                                              onChange={()=>{
                                                this.onChanges(3,index,index1,index2)
                                            }}
                                              >{item2.name}</Checkbox>
                                              </div>
                                             
                                            )
                                          })
                                        }
                                        </div>
                                      }
                                        </div>
                                       )
                                 })
                                 }
                                 </div>}
                                 
                           </div>
                         )
                       })
                     }
               
               </div>}
               <div className='submit-btn' style={{marginTop:'50px',textAlign:'center'}}>
               <Button size="large" type="primary"  onClick={this.update}>保存</Button>

               </div>
        </Drawer>}
        <Drawer
          title="创建账户"
          placement="right"
          bodyStyle={{
            width: '1000px',
          
          }}
          width='1200'
          closable={true}
          onClose={this.onClose}
          visible={this.state.addVisible}
        >
            <div className="p-opt-cs-dtl">
                <div style={{padding:30}}>
              <div className="m-info" style={{borderBottom:'none',padding:'40px 20px',background:'#f7f7f7'}}>
                  <div className="info-hd">基本信息</div>
                  <div className="info-bd">
                    <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">账号类型:</div>
                        {this.state.hasAll=='1'&&<div className="item-value">
                            <Select
                            size="large"
                            style={{width: '120px', marginRight: '30px'}}
                            placeholder="请选择"
                            value={this.state.editType=='platform'?'商户账号':this.state.editType=='oam_normal'?'运营账号':''}
                            onChange={value => {
                              this.setState({editType: value})
                               if(value=='oam_normal'){
                                 this.searchList(-2);
                               }else{
                                this.searchList(this.state.editHisName=='-2'?'2214':this.state.editHisName)
                               }
                            }
                          }>
                            <Option value="platform">商户账号</Option>
                            <Option value="oam_normal">运营账号</Option>
                          </Select>
                        </div>}
                        {this.state.hasAll!=='1'&&<div className="item-value">
                        <Select
                        size="large"
                        style={{width: '120px', marginRight: '30px'}}
                        placeholder="请选择"
                        value={this.state.editType=='platform'?'商户账号':this.state.editType=='referral'?'双转医院':''}
                        onChange={value => {
                          this.setState({editType: value})
                           if(value=='oam_normal'){
                             this.searchList(-2);
                           }else{
                             this.searchList(this.state.editHisName=='-2'?'2214':this.state.editHisName)
                           }
                        }
                      }
                      >
                        <Option value="platform">商户账号</Option>
                      </Select>
                    </div>}
                    </div>
                    <div className="item" style={{'flex':'50%'}}>
                    <div className="item-key">真实姓名：</div>
                    <div className="item-value">
                        <Input
                        style={{width:'300px'}}
                        type="text" size="large" placeholder="请输入真实姓名"
                        value={this.state.editName} onChange={e => this.setState({editName: e.target.value})}
                      />
                      </div>
                </div>
             </div>
                  
                  <div className="info-bd">
                      <div className="item" style={{'flex':'50%'}}>
                          <div className="item-key">账号名：</div>
                          <div className="item-value">
                            <Input style={{width:'300px'}} 
                            maxLength='16'
                            type="text" size="large" placeholder="请输入3-16位含字母、数字的账号名"
                            value={this.state.editAccount} onChange={e => this.setState({editAccount: e.target.value})}
                          />
                          </div>
                      </div>
                    <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">手机号码：</div>
                        <div className="item-value">
                            <Input style={{width:'300px'}} maxLength='11'
                            type="text" size="large" placeholder="请输入正确的11位手机号码"
                            value={this.state.editPhone} onChange={e => this.setState({editPhone: e.target.value})}
                          />
                          </div>
                    </div>
        
                 </div>
                 <div className="info-bd">
                 {this.state.hasAll=='1'&&this.state.editType!=='oam_normal'&&this.state.editType!=='运营账号'&&<div className="item" style={{'flex':'50%'}}>
                 <div className="item-key">所属医院：</div>
                 <div className="item-value">
                 <Select
                 size="large"
                 style={{width: '120px', marginRight: '30px'}}
                 placeholder="请选择所属医院"
                 value={this.state.editHisName}
                 onChange={value =>{
                  this.setState({editHisName: value})
                  this.searchList(value)
                 }}
              >
                 <Option value="2214">儿童医院</Option>
                 <Option value="2215">凯桥医疗科技</Option>
               </Select>
                 </div>
             </div>}
             {this.state.hasAll!=='1'&&this.state.editType!=='oam_normal'&&this.state.editType!=='运营账号'&&<div className="item" style={{'flex':'50%'}}>
                 <div className="item-key">所属医院：</div>
                 <div className="item-value">
                 <Select
                 size="large"
                 style={{width: '120px', marginRight: '30px'}}
                 placeholder="请选择所属医院"
                 value={this.state.editHisName=='2214'?'儿童医院':this.state.editHisName=='2215'?'凯桥医疗科技':''}
                 onChange={value =>{
                  this.setState({editHisName: value})
                  this.searchList(value)
                 }}
               >
                 {this.state.addHisId=='2214'&&<Option value="2214">儿童医院</Option>}
                 {this.state.addHisId=='2215'&&<Option value="2215">凯桥医疗科技</Option>}
                 
               </Select>
                 </div>
             </div>}
                    <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">所属部门：</div>
                        <div className="item-value">
                            <Input style={{width:'300px'}}
                            type="text" size="large" placeholder="请输入所属部门"
                            value={this.state.editDept} onChange={e => this.setState({editDept: e.target.value})}
                          />
                        </div>
                    </div>
                 </div>
                 <div className="info-bd">
                      <div className="item" style={{'flex':'50%'}}>
                          <div className="item-key">设置密码：</div>
                          <div className="item-value">
                            <Input style={{width:'300px'}}
                            type="password" size="large" placeholder="请输入不小于6位数的密码"
                            value={this.state.editPassword} onChange={e => this.setState({editPassword: e.target.value})}
                          />
                          </div>
                      </div>
                    <div className="item" style={{'flex':'50%'}}>
                        <div className="item-key">确定密码：</div>
                        <div className="item-value">
                            <Input style={{width:'300px'}}
                            type="password" size="large" placeholder="请确认密码"
                            value={this.state.editNewPassword} onChange={e => this.setState({editNewPassword: e.target.value})}
                          />
                        </div>
                    </div>
        
                 </div>
                  
                </div>
              </div>
              </div>
              {
                this.state.searchList.length>0&&<div className='role-title'>权限分配</div>}
                {
                  this.state.searchList.length>0&&<div className='role'>
                     
                     {
                       this.state.searchList.length>0&&this.state.searchList.map((item,index)=>{
                         return(
                           <div className='role-item'>
                               <div className={`one ${item.childMenu.length>0||item.operatePurview.length>0?'textCenter':''}`}>
                                <Checkbox checked={item.checked}
                                onChange={()=>{
                                    this.onChanges(1,index,'','')
                                }}
                                >
                              {item.name}
                              </Checkbox>
                               </div>
                               {!!item.operatePurview&&item.operatePurview.length>0&&<div className='one'>
                                         <div className='role-sub-item'>
                                          <div className='two'>
                                          {!!item.operatePurview&&item.operatePurview.length>0&&item.operatePurview.map((item1,index1)=>{
                                            return(
                                              <div className='role-operate'>
                                              <Checkbox checked={item1.checked} 
                                              onChange={()=>{
                                                this.onChanges(5,index,index1,'')
                                            }}
                                              >{item1.name}</Checkbox>
                                              </div>
                                              )
                                              })
                                              }
                                        </div>
                                        </div>
                                 </div>}
                               {!!item.childMenu&&item.childMenu.length>0&&<div className='one'>
                               {!!item.childMenu&&item.childMenu.length>0&&item.childMenu.map((item1,index1)=>{
                                       return(
                                         <div className='role-sub-item'>
                                           <div className='two'>
                                              <Checkbox checked={item1.checked} 
                                              onChange={()=>{
                                                this.onChanges(2,index,index1,'')
                                            }}
                                            >{item1.name}</Checkbox>
                                           </div>
                                        
                                           {!!item1.operatePurview&&item1.operatePurview.length>0&&<div className='two'>
                                          {!!item1.operatePurview&&item1.operatePurview.length>0&&item1.operatePurview.map((item2,index2)=>{
                                            return(
                                              <div className='role-operate'>
                                              <Checkbox checked={item2.checked} 
                                              onChange={()=>{
                                                this.onChanges(3,index,index1,index2)
                                            }}
                                              >{item2.name}</Checkbox>
                                              </div>
                                             
                                            )
                                          })
                                        }
                                        </div>
                                      }
                                        </div>
                                       )
                                 })
                                 }
                                 </div>}
                                 
                           </div>
                         )
                       })
                     }
               
               </div>}
               <div className='submit-btn' style={{marginTop:'50px',textAlign:'center'}}>
               <Button size="large" type="primary"  onClick={this.add}>添加</Button>

               </div>

        </Drawer>
        <div className="query-box">
        <span>账号：</span>
        <Input
          type="text" size="large" placeholder="请输入账号"
          value={this.state.account} onChange={e => this.setState({account: e.target.value})}
        />
        <span>手机：</span>
        <Input
          type="text" size="large" placeholder="请输入手机号码"  maxLength='11'
          value={this.state.phone} onChange={e => this.setState({phone: e.target.value})}
        />
        <span>姓名：</span>
        <Input
          type="text" size="large" placeholder="请输入姓名"
          value={this.state.name} onChange={e => this.setState({name: e.target.value})}
        />

        <span>状态：</span>
        <Select
          size="large"
          style={{width: '120px', marginRight: '30px'}}
          placeholder="请选择状态"
          value={this.state.status}
          onChange={value => this.setState({status: value})}
        >
          <Option value="">全部</Option>
          <Option value="0">禁用</Option>
          <Option value="1">启用</Option>
        </Select>
        <RangePicker size="large"   value={this.state.dates} onChange={this.changeDate} disabledDate={this.disabledDate} locale={locale.DatePicker} />

        <Button style={{marginLeft:'20px',marginTop:'20px'}} size="large" type="primary" onClick={() => this.query(1)}>确 定</Button>
    
        {accountAdd&&<Button size="large" type="primary" icon="plus" onClick={()=>{
         
          this.setState({
            addVisible:true,
          })
          this.setState({
            editType:'platform',
            editAccount:'',
            editPhone:'',
            editHisName:'2215',
            editDept:'',
            editName:'',
           
           })
           this.searchList('2215');
        }}>创建账号</Button>}
         
     
      </div>
        <Alert
          type="info" showIcon
          message={<p>已选择 <span style={{color: '#EB6CA4'}}>{this.state.id.length}</span> 项</p>}
        />
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
            selectedRowKeys: this.state.id,
            onChange: (selectedRowKeys) => {
              this.setState({id: selectedRowKeys});
            },
          }}
        />
        
        
     
        
      </div>
    );
  }
}
export default connect((state) => {
  const { account } = state;
  return {
    ...account,
  };
})(Account);
