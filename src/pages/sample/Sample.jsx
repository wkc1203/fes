import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert, Icon, Popover, Modal, Upload, message, Input } from 'antd';
import { formatDate } from '../../utils/utils';
import './style.less';

const confirm = Modal.confirm;
const content = (
  <div>数字越大越靠前</div>
);

class Sample extends React.Component {
  state = {
    ids: [],
    name: '',
    cardShow:false,
    text:'',
    update:false,
    id:'',
    recordList:[{time:'2014-01-12',content:'k轱辘器轻轻松松k轱辘器轻轻松松'},{time:'2014-01-12',content:'k轱辘器轻轻松松k轱辘器轻轻松松'}]
  }
  componentDidMount(){
   
    this.query(1);
   

  }
  query = (pageNumber) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sample/list',
      payload: {
        pageNum:pageNumber,
        hisId:sessionStorage.getItem('hisId'),
      },
    });
  }
  add = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sample/add',
      payload: {
        hisId:sessionStorage.getItem('hisId'),
        templateContent:this.state.text
      },
    });
    this.setState({
      text:'',
    })
  }
  update = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sample/update',
     
      payload: {
        id:this.state.id,
        hisId:sessionStorage.getItem('hisId'),
        templateContent:this.state.text
      },
    });
    this.setState({
      text:'',
      update:false,
    })
  }
  action = (id, operType,templateContent) => {
    const { dispatch } = this.props;
    console.log(templateContent)
    if (operType == 'del') {
      confirm({
        content: '删除操作不可撤销，是否确定删除？',
        onOk() {
          dispatch({ type: 'sample/delete', payload: {id} });
        },
      });
    } else {
       this.setState({
         cardShow:true,
         update:true,
         text:templateContent,
         id:id
       })
       console.log(this.state.templateContent)
    }
  }
  actions = (operType) => {
    if (this.state.ids.length > 0) {
      this.action(this.state.ids.join(','), operType);
    } else {
      message.warning('请选择批量操作的医生！', 2);
    }
  }
  submit = () => {
    const form =  document.getElementById('export');// eslint-disable-line
    form.submit();
  }
  beforeUpload = (file) => {
    if (/^[\s\S]+\.xls|[\s\S]+\.xlsx|[\s\S]+\.csv$/.test(file.name)) {
      return true;
    } else {
      message.warning('请选择正确的Excel文件上传', 2);
      return false;
    }
  }
  fileChange = (info) => {
    if (/^[\s\S]+\.xls|[\s\S]+\.xlsx|[\s\S]+\.csv$/.test(info.file.name)) {
      this.setState({fileList: [info.file]});
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === 0) {
        message.success(info.file.response.msg, 2, () => {
          this.query(1);
          this.setState({showModal1: false, fileList: []});
        });
      } else if (info.file.response.code === 999) {
        message.error(info.file.response.msg, 3, () => hashHistory.push({pathname: '/login'}));
      } else {
        message.error(info.file.response.msg);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  }
  reset = (doctorId) => {
    const { dispatch } = this.props;
    confirm({
      content: '重置密码操作不可撤销，是否确定重置密码？',
      onOk() {
        dispatch({ type: 'sample/reset', payload: {account: doctorId} });
      },
    });
  }
  qrCode = (doctorId, deptId,ticket) => {
    const form =  document.getElementById('exportCode');// eslint-disable-line
    const scene =  document.getElementById('scene');// eslint-disable-line
    scene.value = `doctorId=${doctorId}&deptId=${deptId}&ticket=${ticket}`;
    form.submit();
  }
  render() {
    var operateList='';
    var templateAdd=false;
    var templateEdit=false;
    var templateDel=false;

    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='TEMPLATE_ADD')
          {
            templateAdd=true;
          }
          if(operateList[i]=='TEMPLATE_EDIT')
          {
            templateEdit=true;
          }
          if(operateList[i]=='TEMPLATE_DEL')
          {
           templateDel=true;
          }
          
          
  }
    }
   

    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    const columns = [{
      title: '时间',
      dataIndex: 'createTime',
      render: (item) => {
        return (
          
              <div className="unit-text1" style={{width:'150px'}}>{item}</div>
         
        );
      }
    }, {
      title: '内容',
      dataIndex: 'templateContent',
      render: (item) => {
        return (
          
              <div className="unit-text1" style={{width:'auto'}}>{item}</div>
         
        );
      }
    
    },{
      title: '操作',
      dataIndex: 'action',
      render: (action) => {
        return (
          <span style={{width:'150px',display:'block'}}>
            {
            <a onClick={() => this.action(action.id, 'enable',action.templateContent)}>查看</a>}
            {templateDel&&<span className="divider-v" />}
           
          
            {templateDel&&<a  onClick={() => this.action(action.id, 'del',action.templateContent)}>删除</a>}
          </span>
        );
      },
    }];
    console.log("tt",this.props.data)
    const text1=this.state.text;
    console.log(this.state,text1)
    const data =this.props.data&& this.props.data.recordList.length > 0 ?
    this.props.data.recordList.map((item) => {
      return {
        createTime:new Date(item.createTime).getFullYear() + '-' + ( new Date(item.createTime).getMonth() + 1) + '-' +  new Date(item.createTime).getDate() + ' ' +  new Date(item.createTime).getHours() + ':' +(new Date(item.createTime).getMinutes()<10?'0':'')+  new Date(item.createTime).getMinutes()+ ':' +(new Date(item.createTime).getSeconds()<10?'0':'')+  new Date(item.createTime).getSeconds(),
        templateContent: item.templateContent,
       
        action: {id: item.id,templateContent:item.templateContent},
      };
    }) : [];
    return (
      <div className="page-sample-mng">
      {this.state.cardShow&&<div className='modal'
           onClick={(e)=>{
            this.setState({
            cardShow:false,
           
            })
            }}>
                <div className='modal-body-register'
                onClick={(e)=>{
                e.stopPropagation()
                }}
                >
                    <div className='modal-title'>
                      <p className='title'>输入常用语</p>
                    </div>
                    <div className='area'>
                       <textarea name="" value={this.state.text}
                        onChange={(e)=>{
                          this.setState({
                            text:e.target.value
                          })
                        }}
                       placeholder="请输入常用语内容，方便您更快捷与患者沟通" id="" cols="30" rows="10" maxLength='200'></textarea>
                       <span>{this.state.text.length}/200</span>
                    </div>
                    <div className='btn'>
                      <p className='btn1' onClick={()=>{
                        this.setState({
                          cardShow:false,
                          text:'',
                        })
                      }}>取消</p>
                      {!this.state.update&&templateAdd&&<p className='btn2'
                      onClick={()=>{
                        
                        //添加常用语
                        if(this.state.text!=''){
                          this.setState({
                            cardShow:false
                          })
                          this.add()
                        }
                        
                      }}
                      
                      >添加常用语</p>}
                      {this.state.update&&templateEdit&&<p className='btn2'
                      onClick={()=>{
                        
                        //添加常用语
                        if(this.state.text!=''){
                          this.setState({
                            cardShow:false
                          })
                          this.update()
                        }
                        
                      }}
                      
                      >修改常用语</p>}
                    </div>
                
            
                
                </div>
         </div>}
        <div className="query-box">
         
          <div className="rt">
            {templateAdd&&<Button
              size="large" type="primary" icon="plus"
              onClick={() => this.setState({
                cardShow:true,
                update:false,
              })}
            >添加</Button>}
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
       
      />
       

      
      </div>
    );
  }
}
export default connect((state) => {
  const { sample } = state;
  return {
    ...sample,
  };
})(Sample);
