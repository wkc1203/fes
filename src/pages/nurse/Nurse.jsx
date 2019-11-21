import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert, Modal, Input, Select, message, Icon, Upload} from 'antd';
import { formatDate } from '../../utils/utils';
import './style.less';

const Option = Select.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;

class Nurse extends React.Component {
  state = {
    ids: [],
    fileList: [],
    id:'',
    name: '',
    doctorId:'',
    showModal:false,
    operateType:'person',
    operateList:'',
    status:'',
  }
  componentDidMount(){
    console.log("12121121")
    this.query(1);
    

  }
  getDet = (no) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'nurse/detail',
      payload: {no},
    });
    dispatch({
      type: 'nurse/save',
      payload: {showModal: true},
    });
  }
  openEdit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'nurse/save',
      payload: {showModal: true, detail: {}},
    });
  }
  changeDet = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'nurse/changeDet',
      payload,
    });
  }
  cancelModal1 = () => {
    this.setState({showModal:false})
  }
  cancelModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'nurse/save',
      payload: {showModal: false, detail: {}},
    });
  }
  okModal = () => {
      console.log("yyy",this.state.operateList)
      const { dispatch } = this.props;
      const payload = {id:this.state.id,hisId: sessionStorage.getItem('hisId'), doctorId:this.state.doctorId, extFields:JSON.stringify(this.state.operateList)};
     
        dispatch({
          type: 'nurse/update',
          payload,
        });
        this.setState({
          showModal:false
        })
      
  }
  query = (pageNum) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'nurse/list',
      payload: {
        name: this.state.name,
        pageNum,
        status:this.state.status,
        type:'2', 
        hisId: sessionStorage.getItem('hisId'),
      },
    });
  }
  action = (ids, operType) => {
    const { dispatch } = this.props;
    if (operType == 'del') {
      confirm({
        content: '删除操作不可撤销，是否确定删除？',
        onOk() {
          dispatch({ type: 'nurse/action', payload: {ids, operType} });
        },
      });
    } else {
      dispatch({ type: 'nurse/action', payload: {ids, operType} });
    }
  }
  actions = (operType) => {
    if (this.state.ids.length > 0) {
      this.action(this.state.ids.join(','), operType);
    } else {
      message.warning('请选择批量操作的护士！', 2);
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
  qrCode = (deptId) => {
    const form =  document.getElementById('exportCode');// eslint-disable-line
    const id =  document.getElementById('id');// eslint-disable-line
    id.value = deptId;
    form.submit();
  }
  render() {
    console.log("hh",this.state.showMore);
    console.log("his1p",this.props.location.query.operate);
    var operateList='';
    var nurseAdd=false;
    var nurseEdit=false; 
    var nurseDel=false;
    var nurseManage=false;
    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='NURSE_ADD')
          {
            nurseAdd=true;
          }
          if(operateList[i]=='NURSE_EDIT')
          {
            nurseEdit=true;
          }
          if(operateList[i]=='NURSE_DEL')
          {
            nurseDel=true;
          }
          if(operateList[i]=='PERVIEW_MAN')
          {
           nurseManage=true;
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
        title: '性别',
        dataIndex: 'sex',
      }, {
        title: '工号',
        dataIndex: 'doctorId',
      }, {
        title: '科室',
        dataIndex: 'deptName',
      }, {
        title: '职称',
        dataIndex: 'level',
      }, {
        title: '手机号码',
        dataIndex: 'mobile',
      }, {
        title: '操作',
        dataIndex: 'action',
        render: (action) => {
          return (
            <span>
            {nurseManage&&<a onClick={() =>{
              console.log(JSON.parse(action.operate))
              this.setState(
                {
                  operateList:JSON.parse(action.operate),
                  showModal:true,
                  id:action.id,
                  doctorId:action.doctorId,


                }
              )
            }}>权限管理</a>}
              {nurseEdit&&nurseManage&&<span className="divider-v" />}
              {nurseEdit&&<a onClick={() => hashHistory.push({pathname: '/nurse/detail', query: {doctorId: action.doctorId, id: action.id}})}>编辑</a>}
              
              {nurseEdit&&nurseDel&&<span className="divider-v" />}
              {nurseDel&&<a className="delete" onClick={() => this.action(action.id, 'del')}>删除</a>}
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
        sex: item.sex=='M'?'男':'女',
        doctorId: item.doctorId ,
        deptName: item.deptName,
        level:item.level,
        mobile:item.mobile,
        action: {id: item.id, no: item.no, status: item.status,operate:item.extFields,doctorId:item.doctorId},
      };
    }) : [];
    return (
      <div className="page-dept">
        <div className="query-box">
          
          <Input
            type="text" size="large" placeholder="请输入关键字搜索"
            value={this.state.name} onChange={e => this.setState({name: e.target.value})}
          />
          
          <Button size="large" type="primary" onClick={() => this.query(1)}>确 定</Button>
          <div className="rt">
             {nurseDel&&<Button size="large" type="primary" onClick={() => this.actions('del')}>批量删除</Button>}
                    {nurseAdd&&<Button
                    size="large" type="primary" icon="plus"
                    onClick={() => hashHistory.push({pathname: '/nurse/detail'})}
                  >添加护士</Button>}
                  {/* nurseAdd&&<Button size="large" type="primary" onClick={() => this.query(1)}>导入</Button> */}
           </div>
        </div>
       <Alert
          type="info" showIcon
          message={<p>已选择 <span style={{color: '#EB6CA4'}}>{this.state.ids.length}</span> 项</p>}
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
            selectedRowKeys: this.state.ids,
            onChange: (selectedRowKeys) => {
              this.setState({ids: selectedRowKeys});
            },
          }}
        />
        <Modal
        	centered='true'
          title="用户权限管理"
         closable='false'
          style={{ top: 100}}
          visible={this.state.showModal}
          maskClosable={true}
          onCancel={this.cancelModal1}
          onOk={this.okModal}
        >
          <div className="add-pat-modal">
               <div className="item">
                  <div className="left" style={{flex:'0.5'}}>查看</div>
                  <div className="right" style={{flex:'2',paddingLeft:'30px'}}>
                     <span className="right_item" style={{paddingRight:'30px'}} onClick={()=>{
                       var list=this.state.operateList;
                       list.view='person';
                       this.setState({
                        operateList:list
                       })

                     }}>
                       {this.state.operateList&&this.state.operateList.view!='person'&&<img src='images/fxwxz.png' alt="" /> }
                       {this.state.operateList&&this.state.operateList.view=='person'&&<img src='images/fxxz.png' alt="" /> 
                    }
                       
                       名下患者
                     </span>
                     <span className="right_item" style={{paddingRight:'30px'}} onClick={()=>{
                      var list=this.state.operateList;
                      list.view='dept';
                      this.setState({
                       
                       operateList:list
                      })

                    }}>
                    {this.state.operateList&&this.state.operateList.view!='dept'&&<img src='images/fxwxz.png' alt="" /> }
                    {this.state.operateList&&this.state.operateList.view=='dept'&&<img src='images/fxxz.png' alt="" /> 
                 }本科室患者
                     </span>
                     <span className="right_item" style={{paddingRight:'30px'}} onClick={()=>{
                      var list=this.state.operateList;
                      list.view='hospital';
                      this.setState({
                       
                       operateList:list
                      })  

                    }}>
                    {this.state.operateList&&this.state.operateList.view!='hospital'&&<img src='images/fxwxz.png' alt="" /> }
                    {this.state.operateList&&this.state.operateList.view=='hospital'&&<img src='images/fxxz.png' alt="" /> 
                 }本院患者
                     </span>
                  </div>
                </div>
                <div className="item">
                  <div className="left" style={{flex:'0.5'}}>操作</div>
                  <div className="right" style={{flex:'2',paddingLeft:'30px'}}>
                  <span className="right_item" style={{paddingRight:'30px'}} onClick={()=>{
                    var list=this.state.operateList;
                    list.operate='person';
                    this.setState({
                     
                     operateList:list
                    })

                  }}>
                    {this.state.operateList&&this.state.operateList.operate!='person'&&<img src='images/fxwxz.png' alt="" /> }
                    {this.state.operateList&&this.state.operateList.operate=='person'&&<img src='images/fxxz.png' alt="" /> 
                 }名下患者
                  </span>
                  <span className="right_item" style={{paddingRight:'30px'}} onClick={()=>{
                   var list=this.state.operateList;
                   list.operate='dept';
                   this.setState({
                    
                    operateList:list
                   })

                 }}>
                 {this.state.operateList&&this.state.operateList.operate!='dept'&&<img src='images/fxwxz.png' alt="" /> }
                 {this.state.operateList&&this.state.operateList.operate=='dept'&&<img src='images/fxxz.png' alt="" /> 
              }本科室患者
                  </span>
                  <span className="right_item" style={{paddingRight:'30px'}} onClick={()=>{
                   var list=this.state.operateList;
                   list.operate='hospital';
                   this.setState({
                    
                    operateList:list
                   })  

                 }}>
                 {this.state.operateList&&this.state.operateList.operate!='hospital'&&<img src='images/fxwxz.png' alt="" /> }
                 {this.state.operateList&&this.state.operateList.operate=='hospital'&&<img src='images/fxxz.png' alt="" /> 
              }本院患者
                  </span>
                  </div>
                </div>
               
                
                
          </div>
        </Modal>
        <Modal
          title="批量导入科室"
          visible={this.state.showModal1}
          maskClosable={false}
          footer={null}
          onCancel={() => this.setState({showModal1: false, fileList: []})}
        >
          <div className="files-modal">
            <Button onClick={this.submit}><Icon type="download" />下载导入模板</Button>
            <Upload
              name="file"
              action={'/api/mch/file/api/importFileDept?hisId='+sessionStorage.getItem('hisId')+'&hisName=重庆医科大学附属儿童医院'}
              beforeUpload={this.beforeUpload}
              onChange={this.fileChange}
              onRemove={() => false}
              fileList={this.state.fileList}
            >
              <Button><Icon type="upload" />上传导入文件</Button>
            </Upload>
          </div>
        </Modal>
        <form
          id="export" method="post" target="_blank"
          action="/api/mch/file/api/downTemplate?name=deptTemplate"
        />
        <form
          id="exportCode" method="post" target="_blank"
          action="/api/mch/health/api/nurse/qrcode"
        >
          <input type="hidden" name="hisId" value={sessionStorage.getItem('hisId')}/>
          <input type="hidden" name="page" value="pages/consult/deptlist/deptlist" />
          <input type="hidden" name="id" value="" id="id" />
        </form>
      </div>
    );
  }
}
export default connect((state) => {
  const { nurse } = state;
  return {
    ...nurse,
  };
})(Nurse);
