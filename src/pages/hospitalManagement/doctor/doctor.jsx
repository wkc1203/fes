import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert, Icon, Popover, Modal, Upload, message, Input,Select } from 'antd';
import { formatDate } from '../../../utils/utils';
import './style.less';

const confirm = Modal.confirm;
const content = (
  <div>数字越大越靠前</div>
);

class Doctor extends React.Component {
  state = {
    ids: [],
    name: '',
    pageNum:'',
    deptName:'',
    status:'',
  }
  componentDidMount(){
    this.query(1);
  }
  
  query = (pageNum) => {
    const { dispatch } = this.props;
    this.setState({
      pageNum:pageNum,
    })
    console.log("s",this.state.pageNum,this.state.name)

    dispatch({
      type: 'doctor/list',
      payload: {
        name: this.state.name.replace(/(^\s*)|(\s*$)/g, ""),
        pageNum,
        deptName:this.state.deptName.replace(/(^\s*)|(\s*$)/g, ""),
        status:this.state.status,
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
          dispatch({ type: 'doctor/action', payload: {ids, operType} });
        },
      });
    } else {
      dispatch({ type: 'doctor/action', payload: {ids, operType} });
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
  submit1 = () => { 
    this.props.data.recordList
      if(this.props.data.recordList.length>0){
        const form =  document.getElementById('export1');// eslint-disable-line
        console.log(this.state.pageNum,this.state.name)
        form.submit();
      }else{
        message.warning('暂未查询到相关数据!', 2);
      }
    
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
          this.setState({showModal1: false, fileList: [],pageNum:1});
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
  reset = (doctorId,id) => {
    const { dispatch } = this.props;
    confirm({
      content: '重置密码操作不可撤销，是否确定重置密码？',
      onOk() {
        dispatch({ type: 'doctor/reset', payload: {account: doctorId,id:id,hisId:sessionStorage.getItem('hisId') } });
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
     console.log("da",this.props)
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '工号',
      dataIndex: 'no',
    },  {
      title: '职称',
      dataIndex: 'title',
    }, {
      title: '科室',
      dataIndex: 'dept',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '创建时间',
      dataIndex: 'date',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (action) => {
        return (
          <span>
            {action.status == 1 ? <a onClick={() => this.action(action.id, 'invalid')}>停用</a> :
            <a onClick={() => this.action(action.id, 'valid')}>启用</a>}
            {<span className="divider-v" />}
            {<a onClick={() => hashHistory.push({pathname: '/doctor/addDoctor', query: {id: action.id}})}>编辑</a>}
            {<span className="divider-v" />}
            <a href={action.qrUrl}  target="_blank">二维码</a>
            {<span className="divider-v" />}
            {<a className="delete" onClick={() => this.reset(action.doctorId,action.id)}>重置密码</a>}
            {<span className="divider-v" />}
            {<a className="delete" onClick={() => this.action(action.id, 'del')}>删除</a>}
          </span>
        );
      },
    }];
    
    const data = this.props.data && this.props.data.recordList.length > 0 ?
    this.props.data.recordList.map((item) => {
      return {
        key: item.id,
        name: item.name,
        no: item.doctorId,
        title: item.level,
        dept: item.deptName,
        status: item.status == 1 ? '正常' : '停用',
        date: formatDate(new Date(item.createTime)),
        sort: item.sortNo,
        action: {id: item.id, doctorId: item.doctorId, status: item.status, deptId: item.deptId,ticket:item.qrTicket,qrUrl:item.qrUrl},
      };
    }) : [];
    return (
      <div className="page-doc-mng">
        <div className="query-box">
          <span>医生姓名：</span>
          <Input
            type="text" size="large" placeholder="请输入医生姓名"
            value={this.state.name} onChange={e => this.setState({name: e.target.value})}
          />
          <span>科室名称：</span>
          <Input
            type="text" size="large" placeholder="请输入科室名称"
            value={this.state.deptName} onChange={e => this.setState({deptName: e.target.value})}
          />
          <span>医生状态：</span>
          <Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            value={this.state.status}
            onChange={value => this.setState({status: value})}
          >
            <Option value="">全部</Option>
            <Option value="1">正常</Option>
            <Option value="2">停用</Option>
          </Select>
          <Button size="large"   type="primary" onClick={() => this.query(1)}>确 定</Button>
           {/* <Button size="large" style={{marginLeft: '50px'}}  onClick={this.submit1}>
         <Icon type="download" />导出 <i className='xia'/> 
            
          </Button> */}
          
            
            {<Button
              size="large" type="primary" icon="plus"
              onClick={() => hashHistory.push({pathname: '/doctor/addDoctor'})}
            >添加医生</Button>}
            {<Button  size="large" onClick={() => this.actions('invalid')}>批量停用</Button>}
            {<Button size="large" onClick={() => this.actions('valid')}>批量启用</Button>}
            {<Button size="large" onClick={() => this.actions('del')}>批量删除</Button>}
            {<Button size="large" onClick={() => this.setState({showModal1: true})}>批量导入</Button>}
        </div>
        <Alert
          message={<p>已选择 <span style={{color: '#EB6CA4'}}>{this.state.ids.length}</span> 项</p>} type="info" showIcon
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
          title="批量导入医生"
          visible={this.state.showModal1}
          maskClosable={false}
          footer={null}
          onCancel={() => this.setState({showModal1: false, fileList: []})}
        >
          <div className="files-modal">
            <Button onClick={this.submit}><Icon type="download" />下载导入模板</Button>
            <Upload
              name="file"
              action={'/api/mch/file/api/importDoctor?hisId='+sessionStorage.getItem('hisId')+'&hisName=重庆医科大学附属儿童医院'}
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
          action="/api/mch/file/api/downTemplate?name=doctorTemplate"
        />
        <form
          id="export1" method="post" target="_top"
          action={"/api/mch/health/api/doctor/export?hisId="+sessionStorage.getItem('hisId')+"&pageNum="+this.state.pageNum+"&name="+this.state.name+"&status="+this.state.status+"&ids="+this.state.ids+"&deptName="+this.state.deptName}
        />
        <form
          id="exportCode" method="post" target="_blank"
          action="https://mp.weixin.qq.com/cgi-bin/showqrcode"
        >
          <input type="hidden" name="hisId" value={sessionStorage.getItem('hisId')} />
          <input type="hidden" name="page" value="pages/home/home" />
          <input type="hidden" name="scene" value="" id="scene" />
        </form>
      </div>
    );
  }
}
export default connect((state) => {
  const { doctor } = state;
  return {
    ...doctor,
  };
})(Doctor);
