import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button ,Drawer,Modal} from 'antd';
import './style.less';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const Option = Select.Option;
const { RangePicker } = DatePicker;
class Widget extends React.Component {
  state = {
    startDate: '',
    endDate: '',
    word: '',
    score: '',
    word1:'',
    showModal: false,
    extField:'',
    visible:false,
    allContent:{},
    time:'',

    showimg:false,
  };
  componentDidMount() {   
   console.log("h") ;
    this.getList();
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
  getList = (page = 1, pageSize = 10) => {
    const { word = '', word1='',startDate = '', endDate = '', score = '' } = this.state;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      startDate:startDate?startDate+' 00:00:00':'',
      endDate:endDate?endDate+' 23:59:59':'',
      pageNum: page,

      numPerPage: pageSize,

    };
    if(word){
      payload.type = word;
    }
    if(word1){
      payload.account = word1;
    }
    if (score) {
      payload.recordType = score;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'operateLog/getList',
      payload,
    });
  }

  onKeydown(e){
    if(e.keyCode===13){
      this.getList();
    }
  }

  onSubmit = () => {
    this.getList();
  }
  onPageChange = (page, pageSize) => {
    this.getList(page, pageSize);
  }
  infoExtField=(val,type)=> {
    console.log(val,type)
    var typetext='';
    if(type==2){
      typetext='设备名称';
    }
    if(type==1){
      typetext='备注';
    }
    if(type==3){
      typetext='请求地址';
    }
    Modal.info({
      title: (<span className="model2">{typetext}</span>),
      iconType:'',
      footer:null,
      maskClosable:true,
      okText:'',
      cancelText:'',
      content: (
        <div style={{ width: '100%' }} className="prl40">
          <p className="p-wrap">{val}</p>
          {/* <p>{id}</p> */}
        </div>
      ),
      onOk() {},
    });
  }
  showimg=(src)=>{
    console.log(src)
    Modal.info({
      // title: (<span className="model2">备注信息</span>),
      iconType:'',
      footer:null,
      maskClosable:true,
      okText:'',
      cancelText:'',
      content: (
        <img className="prl40" alt="example" style={{ width: '100%' }} src={src} />
      ),
      // onOk() {},
    });
  }
  onDateChange = (date, dateStr) => {
    this.setState({
      startDate: dateStr[0] || '',
      endDate: dateStr[1] || '',
    });
  }
  getColumns() {
    return [
      {
        title: '用户',
        dataIndex: 'operationName',
      },
      {
        title: '业务类型',
        dataIndex: 'typeName',
      },
      {
        title: '请求地址',
        dataIndex: 'requestUrl',
        render: (item) => {
          return (
            
            <span>
            <a className='span-nowrap' style={{color:'rgba(0,0,0,.65)',width:'200px'}} onClick={()=>this.infoExtField(item,3)}> {item|| ''}</a>
            
          </span>
           
          );
        }
      },
      {
        title: '操作类型',
        dataIndex: 'recordTypeName',
      },
      
      {
        title: '操作时间',
        dataIndex: 'createTime',
        render: (item) => {
          return (
            
                <div className="unit-text1" >{new Date(item).getFullYear() + '-' + ( new Date(item).getMonth() + 1) + '-' +  new Date(item).getDate() + ' ' +  new Date(item).getHours() + ':' +(new Date(item).getMinutes()<10?'0':'')+  new Date(item).getMinutes()+ ':' +(new Date(item).getSeconds()<10?'0':'')+  new Date(item).getSeconds()}</div>
           
          );
        }
        
      },
      {
        title: '备注',
        dataIndex: 'remark',
        render: (item) => {   
          return (
            
            <span>
            <a className='span-nowrap' style={{color:'rgba(0,0,0,.65)',width:'160px'}} onClick={()=>this.infoExtField(item,1)}> {item|| ''}</a>
              
          </span>
           
          );
        }
      },
      {
        title: '客户端IP',
        dataIndex: 'ipAddress',
      },
      {
        title: '设备名称',
        dataIndex: 'requestDevice',
        render: (item) => {
          return (
            
            <span>
            <a className='span-nowrap' style={{color:'rgba(0,0,0,.65)',width:'100px'}} onClick={()=>this.infoExtField(item,2)}> {item|| ''}</a>
            
          </span>
           
          );
        }
      },
      {
        title: '浏览器',
        dataIndex: 'browser',
      },
      {
        title: '响应时间',
        dataIndex: 'executionTime',
        render: (item) => {
          return (
            
                <div className="unit-text1" >{item}ms</div>
           
          );
        }
        
      },
      
      
      {
        title: '操作',
        key: 'id',
        render: (item) => {
          var allContent=item;
          var time=new Date(item.createTime).getFullYear() + '-' + ( new Date(item.createTime).getMonth() + 1) + '-' +  new Date(item.createTime).getDate() + ' ' +  new Date(item.createTime).getHours() + ':' +(new Date(item.createTime).getMinutes()<10?'0':'')+  new Date(item.createTime).getMinutes()+ ':' +(new Date(item.createTime).getSeconds()<10?'0':'')+  new Date(item.createTime).getSeconds();
          return (

              <span>
                <a target="_blank" onClick={() => {
                  this.setState({
                    allContent:allContent,
                    time:time,
                  })
                    this.showDrawer();

               // const w=window.open('about:blank');
               // w.location.href='http://'+window.location.host+'/#/operate/operateLog/detail?'+'allContent='+allContent+'&time='+time
                
              {/* <a onClick={() => {
                hashHistory.push({
                  pathname: '/operate/evaluate/detail',
                  query: { orderId: item.orderIdStr}
                }) */}
              }}>详情</a>
            </span>
          );
        },
      },
    ];
  }

  render() {
    const { modelData = {} } = this.props;
    const { listData = {} } = modelData;
    const {allContent,time}=this.state;

    const { recordList = [], currentPage = 1, numPerPage = 10, totalCount = 0 } = listData;
    return (
        <div className="page-order-list">
        <Drawer
          title="操作详情"
          placement="right"
          bodyStyle={{
            width: '1000px',
          
          }}
          width='1200'
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
            <div className="p-opt-cs-dtl">
             <div style={{padding:30,backgroundColor:'#fff',marginBottom:30}}>
                 <div className='m-msg'>
                 
                    <div className="msg-hd pInfo">操作详情：</div>
                    <div className="m-info">
                      <div className="info-bd">
                              <div className="item">
                                <div className="item-key lh">操作用户：</div>
                                <div className="item-value lh">{allContent.operationName || ''}</div>
                              </div>

                              <div className="item">
                                <div className="item-key lh">业务类型：</div>
                                <div className="item-value lh">{allContent.typeName}</div>
                              </div>
                              <div className="item">
                                <div className="item-key lh">响应时间：</div>
                                <div className="item-value lh">{allContent.executionTime}ms</div>
                              </div>
                      </div>
                      <div className="info-bd">
                          <div className="item">
                              <div className="item-key lh">操作类型：</div>
                              <div className="item-value lh">{allContent.recordTypeName}</div>
                          </div>
                          <div className="item">
                            <div className="item-key lh">操作时间：</div>
                            <div className="item-value lh">{time}</div>
                          </div>
                          <div className="item">
                            <div className="item-key lh">客户端IP：</div>
                            <div className="item-value lh">{allContent.ipAddress}</div>
                        </div>
               
                          </div>
                          <div className="info-bd" >
                          <div className="item">
                            <div className="item-key lh">浏览器：</div>
                            <div className="item-value lh">{allContent.browser}</div>
                          </div>
                          <div className="item">
                              <div className="item-key lh">设备名称：</div>
                              <div className="item-value lh">{allContent.requestDevice}</div>
                            </div>
                            <div className="item">
                            <div className="item-key lh">请求地址：</div>
                            <div className="item-value lh">{allContent.requestUrl}</div>
                      </div>
                          
                        </div>
                    
                          <div className="info-bd" style={{display:'block'}}>
                            <div className="item">
                              <div className="item-key lh">备注：</div>
                              <div className="item-value lh">{allContent.remark}</div>
                            </div>
                          </div>
                    
                    
                        {this.state.showdata&&<div className="info-bd" style={{display:'block'}}>
                          <div className="item">
                            <div className="item-key lh">提交的数据：</div>
                            <div className="item-value lh">{allContent.inputParam}</div>
                          </div>
                        </div>}
                        {this.state.showdata&&<div className="info-bd" style={{display:'block'}}>
                          <div className="item">
                            <div className="item-key lh">修改前：</div>
                            <div className="item-value lh">{allContent.beforeJson}</div>
                          </div>
                        </div>}
                        {this.state.showdata&&<div className="info-bd" style={{display:'block'}}>
                          <div className="item">
                            <div className="item-key lh">修改后：</div>
                            <div className="item-value lh">{allContent.afterJson}</div>
                            </div>
                        </div>}
                        {!this.state.showdata&&<div onClick={()=>{
                          this.setState({
                          showdata:true
                          })
                        }} style={{color:'#108ee9',cursor:'pointer'}}>查看更多</div>}
                        {this.state.showdata&&<div onClick={()=>{
                          this.setState({
                            showdata:false
                          })
                        }} style={{color:'#108ee9',cursor:'pointer'}}>收起更多</div>}
                        
                      </div>


            
            </div>
          </div>

        </div>
        </Drawer>
        <div className="m-query">
        <span>操作账号：</span>
        <Input onChange={e=>this.setState({word1:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" size="large" placeholder="请输入操作账号" />
       
        <span>业务类型：</span>

        <Select
            size="large"
            style={{width: '160px', marginRight: '30px'}}
            placeholder="请选择业务类型"
            onChange={value => this.setState({word: value})}
            >
          <Option value="">全部</Option>
          <Option value="ORDER_REFUND">订单退费</Option>
          <Option value="DEPT_ADD">科室添加</Option>
          <Option value="DEPT_START">科室启用</Option>
          <Option value="DEPT_STOP">科室停用</Option>
          <Option value="DEPT_EDIT">科室编辑</Option>
          <Option value="DEPT_DEL">科室删除</Option>
          <Option value="DOCTOR_ADD">医生添加</Option>
          <Option value="DOCTOR_START">医生启用</Option>
          <Option value="DOCTOR_STOP">医生停用</Option>
          <Option value="DOCTOR_EDIT">医生编辑</Option>
          <Option value="DOCTOR_DEL">医生删除</Option>
          <Option value="DOCTOR_RESET">医生密码重置</Option>
          <Option value="TIPS_PROCESS">投诉处理</Option>
          <Option value="TEMPLATE_ADD">常用语添加</Option>
          <Option value="TEMPLATE_EDIT">常用语修改</Option>
          <Option value="TEMPLATE_DEL">常用语删除</Option>
          <Option value="LOGIN_IN">用户登录</Option>
        </Select>       
        <span>操作类型：</span>
        <Select
            size="large"
            style={{width: '160px', marginRight: '30px'}}
            placeholder="请选择操作类型"
            onChange={value => this.setState({score: value})}
            >
          <Option value="">全部</Option>
          <Option value="1">添加</Option>
          <Option value="2">修改</Option>
          <Option value="3">查询</Option>
          <Option value="4">删除</Option>
          <Option value="5">登录</Option>
          <Option value="6">登出</Option>
        </Select>
        <span>时间：</span>
        <RangePicker size="large"  onChange={this.onDateChange}   locale={locale.DatePicker}/>
        <Button size="large" type="primary" onClick={this.onSubmit}>确 定</Button>
      </div>
          <div>
            <Table
               rowKey="id"
                columns={this.getColumns()}
                dataSource={recordList}
                pagination={{
              current: currentPage,
              pageSize: numPerPage,
              total: totalCount,
              showQuickJumper: true,
              showTotal: total => `共 ${total} 条`,
              onChange: (page, pageSize) => {
                this.onPageChange(page, pageSize);
              }
            }}
                />
          </div>
        </div>
    );
  }
}
export default connect((state) => {
  const { operateLog = {} } = state;
  return {
    modelData: operateLog,
  };
})(Widget);
