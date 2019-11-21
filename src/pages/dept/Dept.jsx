import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert,Switch, InputNumber,Modal, Input, Select, Tooltip,message, Icon, Upload} from 'antd';
import { formatDate } from '../../utils/utils';
import * as utils from '../../utils/utils';

import './style.less';
import * as QrCode from 'qrcode.react'
const Option = Select.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;
var imgList = '';
var imgLists = [];
var uuList = [];
class Dept extends React.Component {
  state = {
    ids: [],
    fileList: [],
    showImg:false,
    deptId:'',
    qrUrl:'',
    deptName:'',
    name: '',
    status:'',
  }
  componentDidMount() {
   // const { dispatch } = this.props;
  // console.log("yy",!this.props.showModal)
    
  };
  

  /*文件目录*/
  randomName() {
    var myDate = new Date();
    var ossPath = 'PIC/'; 
    var fileRandName = Date.now();
    var year = myDate.getFullYear();
    var month;
    var day;
    if (myDate.getMonth() + 1 < 10) {
      var m = myDate.getMonth() + 1;
      month = '0' + m;
    } else {
      month = myDate.getMonth() + 1;
    }
    if (myDate.getDate() < 10) {
      var d = myDate.getDate() + 1;
      day = '0' + d;
    } else {
      day = myDate.getDate();
    }
    var date = new Date().getTime();
    var m = ossPath + year + '/' + month + '/' + day + "/";
    uuList[0] = m;
    return m;
  }

  base64ToBlob(urlData) {
    var arr = urlData.split(',');
    var ua = navigator.userAgent.toLowerCase();//获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);//判断是否是苹果手机，是则是true
    var mime = '';
    var bytes;

    mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
    bytes = window.atob(arr[1]);

    // 去掉url的头，并转化为byte
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {
      type: mime
    });
  }
  isHasImg(url) {
    var xmlHttp;
    if (window.ActiveXObject) {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    }
    xmlHttp.open("Get", url, false);
    xmlHttp.send();
    if (xmlHttp.status == 404)
      return false;
    else
      return true;
  }
  
  defaultInput1=()=>{
    utils.request('/api/ehis/health/api/file/sign', {
      method: 'POST',
      body: utils.jsonToQueryString({bucket: 'ihoss',dir: "PIC"}),
    }).then((res)=>{
      console.log(res,'sdasda')
      let sign = JSON.stringify(res.data.data)
      sessionStorage.setItem('sign',sign)       
  })
  //const signs = JSON.parse(sessionStorage.getItem('sign'))
  console.log("re11",this.refs)
  const elemMenu = this.refs.editorElemMenu;
  const elemBody = this.refs.editorElemBody;
  const editor = new E(elemMenu, elemBody)
  
  this.setState({
    editor:editor,
  })
  // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
  editor.customConfig.onchange = html => {
    //console.log(editor.txt.html(), editor.txt.text())
  
    this.setState({
      editorContent: editor.txt.html()
    })
    console.log("ee",this.state.editor)
    this.changeDet({honorImages:this.state.editorContent})
    //this.changeDet({editorContent: this.state.editorContent})
  }
  editor.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'foreColor',  // 文字颜色
    'list',  // 列表
    'justify',  // 对齐方式
    'image',  // 插入图片
    'undo',  // 撤销
    'redo'  // 重复
  ]
  editor.customConfig.showLinkImg = false
  //editor.customConfig.uploadImgShowBase64 = true
  editor.customConfig.uploadImgTimeout = 50000;
  //editor.customConfig.uploadImgServer = 'https://ihoss.oss-cn-beijing.aliyuncs.com/'
// editor.customConfig.uploadImgMaxLength = 3
  //editor.customConfig.uploadFileName = 'file'

  const thats = this
  editor.customConfig.customUploadImg = function (files, insert) {
    for (var i = 0; i < files.length; i++) {
      console.log(thats.state.imgList, 'a132')
      const formData = new FormData();
      var filename = '';
      var image = [];
      var myDate = new Date();
      var ossPath = 'PIC/';
      var fileRandName = Date.now();
      var year = myDate.getFullYear();
      var month;
      var day;
      if (myDate.getMonth() + 1 < 10) {
        var m = myDate.getMonth() + 1;
        month = '0' + m;
      } else {
        month = myDate.getMonth() + 1;
      }
      if (myDate.getDate() < 10) {
        var d = myDate.getDate() + 1;
        day = '0' + d;
      } else {
        day = myDate.getDate();
      }
      var base64 = '';
      var reader = new FileReader();//创建一个字符流对象
      reader.readAsDataURL(files[i]);//读取本地图片
      reader.onload = function (e) {
        base64 = this.result;
        var date = new Date().getTime();
        var m = ossPath + year + '/' + month + '/' + day + "/";
        var S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        var uuid = S4 + S4 + "-" + S4 + "-" + S4 + "-" + S4 + "-" + S4 + S4 + S4;
        var filename = thats.randomName() + uuid + '.png';
        formData.append('key', filename);
        formData.append("policy",  JSON.parse(sessionStorage.getItem('sign')).policy);
        formData.append("callback",  JSON.parse(sessionStorage.getItem('sign')).callback);
        formData.append("signature",  JSON.parse(sessionStorage.getItem('sign')).sign);//c+ifaILA5Szla7Buicnm94BQ8uw=
        formData.append("OSSAccessKeyId",  JSON.parse(sessionStorage.getItem('sign')).accessId);
        formData.append('file', thats.base64ToBlob(base64));
        $.ajax({
          url: 'https://ihoss.oss-cn-beijing.aliyuncs.com',
          method: 'POST',
          processData: false,
          contentType: false,
          cache: false,
          data: formData,
          success: (e) => {
            imgLists.unshift('https://ihoss.oss-cn-beijing.aliyuncs.com/'+filename);
            if (thats.isHasImg('https://ihoss.oss-cn-beijing.aliyuncs.com/' + filename)) {
              thats.setState({
                  imgArrs:Array.from(new Set(imgLists))
              }, () => { console.log(thats.state.imgArrs, 'a1321'); insert(thats.state.imgArrs[0])});
            } else {
              var intervals = setInterval(() => thats.isHas('https://ihoss.oss-cn-beijing.aliyuncs.com/' + filename, imgList), 500);
              thats.setState({
                intervals: intervals
              })
            }

          },
        });
      };
    }
}

  editor.create()
  
}
  getDet = (no) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/detail',
      payload: {no},
    });
    dispatch({
      type: 'dept/save',
      payload: {showModal: true},
    });
    
      this.defaultInput1();
    
    
  }
 
  openEdit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/save',
      payload: {showModal: true, detail: {}},
    });
  }
  changeDet = (payload) => {
    console.log("pl",payload,this.props.detail.status    )
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/changeDet',
      payload,
    });
  }
  cancelModal = () => {
    console.log("1")
    this.setState({showImg:false})
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/save',
      payload: {showModal: false, detail: {}},
    });
  }
  okModal = () => {
    const {no,name, employeeCount,medicalDepartment,status, summary='', id} = this.props.detail;
     console.log(this.props.detail,no,name,employeeCount,medicalDepartment,status)
    if (no&&name&&employeeCount&&medicalDepartment&&status&&summary ) {
      const { dispatch } = this.props;
      const payload = {
        hisId: sessionStorage.getItem('hisId'), 
        hisName: '重庆医科大学附属儿童医院', 
         name:name,no:no,employeeCount,medicalDepartment,status, summary:'52'};
      if (id) {
        payload.id = id;
        dispatch({
          type: 'dept/update',
          payload,
        });
      } else {
        dispatch({
          type: 'dept/add',
          payload,
        });
      }
    } else {
      message.warning('请将科室信息填写完整！', 2);
    }
  }
  query = (pageNum) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/list',
      payload: {
        name: this.state.name,
        pageNum,
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
          dispatch({ type: 'dept/action', payload: {ids, operType} });
        },
      });
    } else {
      dispatch({ type: 'dept/action', payload: {ids, operType} });
    }
  }
  actions = (operType) => {
    if (this.state.ids.length > 0) {
      this.action(this.state.ids.join(','), operType);
    } else {
      message.warning('请选择批量操作的科室！', 2);
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
  okModal1(){
    this.setState({
      showImg:false,
    })
  }
  qrCode = (deptId) => {
    const form =  document.getElementById('exportCode');// eslint-disable-line
    const id =  document.getElementById('id');// eslint-disable-line
    id.value = deptId;
    form.submit();
  }
  render() {
    console.log("hisp",this.props.location.query.operate);
    var operateList='';
    var deptAdd=false;
    var deptStart=false;
    var deptStop=false;
    var deptEdit=false;
    var deptDel=false;
    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='DEPT_ADD')
          {
           deptAdd=true;
          }
          if(operateList[i]=='DEPT_START')
          {
           deptStart=true;
          }
          if(operateList[i]=='DEPT_STOP')
          {
           deptStop=true;
          }
          if(operateList[i]=='DEPT_EDIT')
          {
           deptEdit=true;
            
          }
          if(operateList[i]=='DEPT_DEL')
          {
           deptDel=true;
            
          }
       }
     

     }
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;
    const columns = [
      {
        title: '科室编码',
        dataIndex: 'no',
      },
      {
        title: '科室名称',
        dataIndex: 'name',
      }, {
        title: '科室介绍',
        dataIndex: 'intr',
      }, {
        title: '职工人数',
        dataIndex: 'employeeCount',
      },, {
        title: '对应诊疗科目',
        render: (item) => {
          return (
            <Tooltip placement="topRight" title={item.medicalDepartment || '暂无'}>
              <div className="unit-text" style={{maxWidth: '200px'}}>{item.medicalDepartment || '暂无'}</div>
            </Tooltip>
          );
        } 
      }, {
        title: '状态',
        dataIndex: 'status',
      }, {
        title: '创建时间',
        dataIndex: 'date',
      }, {
        title: '菜单链接',
        dataIndex: 'url',
      }, {
        title: '操作',
        dataIndex: 'action',
        render: (action) => {
          return (
            <span>
            
              {deptEdit&&<a onClick={() => 
                this.getDet(action.no)}>详情</a>}
              {deptEdit&&<span className="divider-v" />}
              {deptEdit&&<a target='_blank' href={action.qrUrl}>随访二维码</a>}
              <span className="divider-v" />
              <a target='_blank' href={action.followImg}>二维码</a>
            </span>
          );
        },
      },
    ];
    const data = this.props.data && this.props.data.recordList.length > 0 ?
    this.props.data.recordList.map((item) => {
      return {
        key: item.id,
        no:item.no,
        employeeCount:item.employeeCount? item.employeeCount : '无',
        name: item.name,
        intr: item.summary ? '有' : '无',
        medicalDepartment: item.medicalDepartment ? item.medicalDepartment : '无',
        status: item.status == 1 ? '正常' : '停用',
        date: formatDate(new Date(item.createTime)),
        url: `/pages/consult/deptlist/deptlist?scene=${item.no}`,
        action: {id: item.id, no: item.no,deptName:item.name, status: item.status,qrUrl:item.qrUrlFollow,followImg:item.qrUrl},
      };
    }) : [];
    return (
      <div className="page-dept">
        <div className="query-box">
        <div style={{marginBottom:'10px',fontWeight:'bold'}}>  查询条件</div>
          <span>科室名称：</span>
          <Input
            type="text" size="large" placeholder="请输入"
            value={this.state.name} onChange={e => this.setState({name: e.target.value})}
          />
          <span>科室状态：</span>
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
          <Button size="large" type="primary" onClick={() => this.query(1)}>确 定</Button>
        
        </div>
        
        <div style={{marginBottom:'35px',fontWeight:'bold'}}>  科室列表
        <div style={{display:'inline',float:'right'}}>
          {/* deptAdd&&
            <Button size="large" style={{marginRight: '10px'}}  
            onClick={this.submit1}>
            <Icon type="download" />
            导出 <i className='xia'/>
          </Button> */}
          {deptAdd&&<Button size="large" style={{marginRight: '10px'}} type="primary" icon="plus" onClick={this.openEdit}>添加</Button>}
          {/* deptAdd&&<Button size="large" style={{marginRight: '10px'}} onClick={() => this.setState({showModal1: true})}>批量导入</Button> */}
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
          {deptStop&&<Button size="large" style={{marginRight: '10px'}}  onClick={() => this.actions('invalid')}>批量停用</Button>}
          {deptStart&&<Button size="large" style={{marginRight: '10px'}}  onClick={() => this.actions('valid')}>批量启用</Button>}
          {deptDel&&<Button size="large" style={{marginRight: '10px'}} onClick={() => this.actions('del')}>批量删除</Button>}
          <span style={{color: '#108ee9'}}>已选中{this.state.ids.length}条数据</span>
        </div>
        <Modal
          title="随访二维码"
          style={{ top:100 }}
          visible={this.state.showImg}
          maskClosable={true}
          onOk={this.okModal1}
          onCancel={this.cancelModal}
          footer={null}
        >
          <div className="img" style={{margin:'0 auto',textAlign:'center'}}>
           <img src={this.state.qrUrl} alt=""/>
          </div>
        </Modal>
        <Modal
          title="科室信息"
          style={{top: '60'}}
          visible={this.props.showModal}
          maskClosable={true}
          onCancel={this.cancelModal}
          onOk={this.okModal}
        >
          <div className="add-dept-modal">
          <div>
            <p><span>*</span>科室编码：</p>
            <div><Input
              size="large" placeholder="请输入科室编码"
              value={this.props.detail.no}
              onChange={e => this.changeDet({no: e.target.value})}
            /></div>
          </div>
            <div>
              <p><span>*</span>科室名称：</p>
              <div><Input
                size="large" placeholder="请输入科室名称"
                value={this.props.detail.name}
                onChange={e => this.changeDet({name: e.target.value})} 
              /></div>
            </div>
            <div>
              <p><span>*</span>职工人数：</p>
              <div><InputNumber
                size="large"
                style={{width: '100%'}}
                placeholder="请输入职工人数"
                value={this.props.detail.employeeCount}
                onChange={value => this.changeDet({employeeCount: value})}
              >
              }
              </InputNumber></div>
            </div>
            <div>
              <p><span>*</span>对应诊疗科目：</p>
              <div><TextArea
                value={this.props.detail.medicalDepartment}
                onChange={e => this.changeDet({medicalDepartment: e.target.value})}
              /></div>
            </div>
            <div>
              <p><span>*</span>科室状态：</p>
              <div>
               <Switch 
              checked={!!this.props.detail.status&&this.props.detail.status=='1'}
               checkedChildren="ON" unCheckedChildren="OFF"
               onChange={e => this.changeDet({status:!!this.props.detail.status&&this.props.detail.status=='1'?'2':'1'})}

                />
              </div>
            </div>
            <div>
              <p><span>*</span>科室介绍：</p>
              <div><TextArea
                value={this.props.detail.summary}
                onChange={e => this.changeDet({summary: e.target.value})}
              /></div>
           
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
          action="/api/mch/health/api/dept/qrcode"
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
  const { dept } = state;
  return {
    ...dept,
  };
})(Dept);
