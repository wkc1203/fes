import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button,Drawer } from 'antd';
import './style.less';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const Option = Select.Option;
const { RangePicker } = DatePicker;

const typeMap = {
  undefined: '',
  '1': '图文咨询',
  '2': '电话咨询',
  '3': '视频咨询',
}

const statesMap = {
  '0':'待回复',
  '1':'咨询中',
  '2':'已完成',
  '3':'已结束',
  '4':'申请中',
  '5':'已拒绝',
  '40':'已超时',
  '50':'已退款',
}

const purposeType={
  '0':'全部',
  '1':'咨询',
  '2':'复诊',
  '3':'报告解读',
  '4':'加号',
  '8':'其他',
  '9':'免费报告解读',

}

class Widget extends React.Component {

  state = {
    startDate: '',
    endDate: '',
    type:'',
    status:'',
    doctorName:'',
    deptName:'',
    orderId:'',
    patientName:'',
    visible:false,
    userName:'',
    purposeType:'',
  };

  componentDidMount() {
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
    const {purposeType='', doctorName = '',deptName='',patientName='',userName='',orderId='', startDate = '', endDate = '',type='', status=''} = this.state;
    const { dispatch } = this.props;
    const payload = {
      platformId:sessionStorage.getItem('hisId'),
      doctorName,
      deptName,
      patientName,
      userName,
      orderId,
      status,
      type,
      purposeType,
      startDate:startDate?startDate+' 00:00:00':'',
      endDate:endDate?endDate+' 23:59:59':'',
      pageNum: page,
      numPerPage: pageSize,
      orderBy:'createTime',
      sort:'DESC'
    }

    dispatch({
      type: 'operateConsultLst/getList',
      payload
    });
  }

  // onIptChange = (e) => {
  //   this.setState({
  //     word: e.target.value || [],
  //   });
  // }

  onSubmit = () => {
    this.getList();
  }

  onPageChange = (page, pageSize) => {
    this.getList(page, pageSize);
  }
  getDetail = (orderId1) => {
    const { dispatch, location = {} } = this.props;
    const { orderId = '',evaluateContent='',evaluateId='',evaluateTime='',evaluateScore='' } = location.query || {};
    var orderIdStr='';
    if(orderId==''){
      orderIdStr=orderId1
    }else{
      orderIdStr=orderId
    }
    console.log(orderIdStr)
    this.setState({
      evaluateContent: location.query.evaluateContent || '',
      evaluateId: location.query.evaluateId || '',
      evaluateTime: location.query.evaluateTime || '',
      evaluateScore: location.query.evaluateScore || '',
    });
    console.log(!!orderId1)
    if(!orderId1){
      dispatch({
        type: 'operateConsultLst/getDetailById',
        payload: { id:this.props.location.query.inquiryId, }
      });
    }else{
      dispatch({
        type: 'operateConsultLst/getDetail',
        payload: { orderId:orderIdStr, }
      });
    }
    
  }

  onDateChange = (date, dateStr) => {
    this.setState({
      startDate: dateStr[0] || [],
      endDate: dateStr[1] || '',
    });
  }

  getColumns() {
    return [
      {
        title: '咨询时间',
        dataIndex: 'createDate',
        key: 'createDate',
      },
      {
        title: '咨询订单',
        dataIndex: 'orderIdStr',
        key: 'orderIdStr',
      },
      {
        title: '咨询类型',
        dataIndex: 'type',
        key: 'type',
        render: (item) => {
          return (
            <span>{typeMap[item] || ''}</span>
          );
        }
      },
      {
        title: '咨询状态',
        dataIndex: 'status',
        key: 'status',
        render: (item) => {
          return (
            <span>{statesMap[item] || ''}</span>
          );
        }
      },
      {
        title: '咨询目的',
        dataIndex: 'purpose',
        key: 'purpose',
      },
      {
        title: '咨询科室',
        dataIndex: 'deptName',
        key: 'deptName',
      },
      {
        title: '咨询医生',
        dataIndex: 'doctorName',
        key: 'doctorName',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '就诊人姓名',
        dataIndex: 'patientName',
        key: 'patientName',
      },
      {
        title: '联系方式',
        dataIndex: 'patientTel',
        key: 'patientTel',
      },
      {
        title: '操作',
        key: 'id',
        render: (item) => {
          return (
            <span>
              <a target="_blank" onClick={() => {
                this.getDetail(item.orderIdStr);
                this.showDrawer();
                //const w=window.open('about:blank');
              //  w.location.href='http://'+window.location.host+'/#/operate/consult/detail?'+'orderId='+item.orderIdStr
                
                // hashHistory.push({
                //   pathname: '/operate/consult/detail',
                //   query: { orderId: item.orderIdStr }
                // })
              }}>详情</a>
            </span>
          );
        },
      },
    ];
  }

  onKeydown(e){
    if(e.keyCode===13){
      this.getList();
    }
  }

  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }

  render() {
    
    const { modelData = {} } = this.props;
    const { listData = {} } = modelData;
    const { recordList = [], currentPage = 1, numPerPage = 10, totalCount = 0 } = listData;
    const { modelData: { detailData = {} } = {} } = this.props;
    const {evaluateContent,evaluateId,evaluateTime,evaluateScore} = this.state;
  //  console.log(this.state);
    const { inquiry = {}, items = [] } = detailData;
    const datalist=recordList.map((item,key)=>{
        return {
          key:key+1,
          createDate:item.createDate,
          orderIdStr:item.orderIdStr,
          type:item.type,
          status:item.status,
          deptName:item.deptName,
          doctorName:item.doctorName,
          patientName:item.patientName,
          userName:item.userName,
          purpose:item.purpose,
          patientTel:item.patientTel||'--',
          id:item.orderIdStr
        }
    })
    return (
      <div className="p-opt-cs-lst">
      <Drawer
      title="咨询详情"
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
    <div style={{padding:30,backgroundColor:'#fff'}}>
      <div className="m-info">
        <div className="info-hd">订单信息</div>
        <div className="info-bd">
          {/* <div className="item">
            <div className="item-key " >订单时间：</div>
            <div className="item-value">{inquiry.createDate}</div>
          </div> */}
          <div className="item">
            <div className="item-key">订单号：</div>
            <div className="item-value">{inquiry.orderIdStr}</div>
          </div>
          <div className="item">
            <div className="item-key">订单金额：</div>
            <div className="item-value">￥{(inquiry.totalFee / 100).toFixed(2)}</div>
          </div>
          <div className="item">
            <div className="item-key">订单状态：</div>
            <div className="item-value">{inquiry.orderStatusName}</div>
          </div>
          {/* <div className="item">
            <div className="item-key">咨询类型：</div>
            <div className="item-value">
              {typeMap[inquiry.type] || ''}
            </div>
          </div> */}
        </div>
      </div>

      <div className="m-info">
        <div className="info-hd">用户信息</div>
        <div className="info-bd">

          <div className="item">
            <div className="item-key">用户名：</div>
            <div className="item-value">{inquiry.userName}</div>
          </div>
          <div className="item">
            <div className="item-key">就诊人：</div>
            <div className="item-value">{inquiry.patientName}</div>
          </div>
          <div className="item">
            <div className="item-key">用户编号：</div>
            <div className="item-value">{inquiry.userId||''}</div>
          </div>
        </div>
      </div>

      <div className="m-info">
        <div className="info-hd">业务类型</div>
        <div className="info-bd">
          <div className="item">
            <div className="item-key">业务类型：</div>
            <div className="item-value">咨询类</div>
          </div>
          <div className="item">
            <div className="item-key">订单类型：</div>
            <div className="item-value">{typeMap[inquiry.type] || ''}</div>
          </div>
        </div>
      </div>

      <div className="m-info">
        <div className="info-hd">医生信息</div>
        <div className="info-bd">
          <div className="item">
            <div className="item-key">医生姓名：</div>
            <div className="item-value">{inquiry.doctorName}</div>
          </div>
          <div className="item">
            <div className="item-key">医生工号：</div>
            <div className="item-value">{inquiry.doctorId}</div>
          </div>
        </div>
      </div>


      {!!detailData.refundReason&&<div className="m-info">
      <div className="info-hd">退款原因</div>
      <div className="info-bd">
        <div className="item" style={{flex:"1"}}>
          <div className="item-key">退款原因：</div>
          <div className="item-value">{detailData.refundReason}</div>
        </div>
      </div>
    </div>}

    </div>





   <div style={{padding:30,backgroundColor:'#fff',marginTop:30}}>
    <div className="m-msg">
      <div className="msg-hd pInfo">问诊详情：</div>
      <div className="msg-bd">
        {
          items.map((item, index) => {
            const name = item.direction == 'TO_USER' ? inquiry.doctorName : inquiry.patientName;
            return (
              <div className="item" key={index}>
                <div className="item-head">{name} {item.createDate}</div>
                <div className="item-content">

                  {
                    item.url&&item.voiceTime==0&&item.action!='add'&&item.action!='reportApply'&&item.action!=='addChecklist' &&<a href={item.url} target="_blank"><img src={item.url} alt="" style={{width:'100px',height:'100px'}}/></a>
                  }
                  {
                    item.url&&item.voiceTime==0&&item.action=='add' &&<a href={item.url} target="_blank"><img src={item.url} alt="" style={{width:'232px',height:'82px'}}/></a>

                  }
                  {
                    item.action=='reportApply' &&
                                                     <div className='textFun applyFun' 
                                                     onClick={()=>{ 
                                                         
                                                     }}
                                                     style={{width:'220px',height:'auto',background:'#f2f2f2'}} >
                                                     <p className='doctort'>{!!JSON.parse(item.content)&&JSON.parse(item.content).title}</p>
                                                         <div className='check-info' style={{paddingRight:'5px'}}>
                                                         <div className='check-img'>
                                                         <img  style={{paddingTop:'8px',minHeight:'87px'}} src={!!JSON.parse(item.content)&&JSON.parse(item.content).img}/>
                                                         </div>
                                                         <div className='info'>
                                                                 <p className='context' style={{lineHeight:'20px',paddingBottom:'0',height:'50px',paddingTop:'7px'}}>
 
                                                                 {!!JSON.parse(item.content)&&!!JSON.parse(item.content).content?JSON.parse(item.content).content:''}</p>
                                                             </div>
                                                         </div>
                                                       
                                                        
                                                         </div>

                  }
                  {item.action == 'addChecklist' && <div className='textFun1' 
                                            style={{width:'400px',height:'auto',background:'#f2f2f2'}} >
                                            <p className='doctort'>{!!JSON.parse(item.content)&&JSON.parse(item.content).title}</p>
                                                    <div className='check-info'>
                                                       <div className='check-img'>
                                                       <img  src="./images/chat-check.png"/>
                                                       </div>
                                                       <div className='info'>
                                                           <p className='fee'>￥{!!JSON.parse(item.content)&&JSON.parse(item.content).price}</p>
                                                           <p className='context'>{!!JSON.parse(item.content)&&JSON.parse(item.content).checkItem}</p>
                                                       </div>
                                                    </div>
                                                   
                                                     </div>}


                    {item.action == 'receiveChronic' && <div className='text' 
                      style={{width:'220px',height:'auto',background:'white'}} >
                      <p className='doctort'>{!!item.content&& JSON.parse(item.content).title}</p>
                      <div className='check-info'>
                          <div className='check-img'>
                          <img  src="./images/chat-check.png"/>
                          </div>
                          <div className='info'>
                              <p className='fee'>￥{!!item.content&& JSON.parse(item.content).totalFee/100}</p>
                              <p className='context'></p>
                          </div>
                      </div>
                    {/* <p className='search'>查看详情</p> */}
                  </div>}

                  
                  {item.action == 'applyChronic' && <div className='text' 
                      style={{width:'250px',padding:'10px 0',height:'auto',background:'white'}} >
                      <p className='apply-title'>{!!item.content&&JSON.parse(item.content).title}</p>
                              <div className='apply-info'>
                                
                                  <div className='info'>
                                      <p className='info-item'>就诊时间：<span>{!!item.content&&!!JSON.parse(item.content).visitDate&&JSON.parse(item.content).visitDate}</span></p>
                                      <p className='info-item'>就诊科室：<span>{!!item.content&&!!JSON.parse(item.content).deptName&&JSON.parse(item.content).deptName}</span></p>
                                      <p className='info-item'>就诊医生：<span>{!!item.content&&!!JSON.parse(item.content).doctorName&&JSON.parse(item.content).doctorName}</span></p>
                                      <p className='info-item'>诊    断：<span>{!!item.content&&!!JSON.parse(item.content).diagnosis&&JSON.parse(item.content).diagnosis}</span></p>

                                  </div>
                              </div>
                              {/* <p className='apply-search'>查看详情</p>   */}
                      </div>}

                  {item.action == 'mdt' && <div className='text' 
                                    style={{width:'220px',height:'auto',background:'white'}} >
                                    <p className='doctort'>{!!item.content&&JSON.parse(item.content).title}</p>
                                            <div className='check-info'>
                                               <div className='check-img'>
                                               <img  src="./images/chat-check.png"/>
                                               </div>
                                               <div className='info'>
                                                   <p className='context'>{!!item.content&&JSON.parse(item.content).dept}</p>
                                               </div>
                                            </div>
                                            {/* <p className='search'>查看详情</p> */}
                                             </div>}

                  

                  {
                    !item.url&&item.voiceTime==0&&item.action!='add'&&item.action!='reportApply'&&item.action!=='mdt'&&item.action!=='addChecklist'&&item.action!='applyChronic'&&item.action!=='receiveChronic' &&<span dangerouslySetInnerHTML={{ __html: item.content}}></span>
                  }
                  
                  {
                    item.url&&item.voiceTime>0&& <audio A src={item.url} controls ></audio>
                  }
                </div>
              </div>
            );
          })
        }
      </div>
      </div>
    </div>

    {/* <div className={`m-msg ${!!evaluateTime? '' : 'disNo'}`}>
      <div className="msg-hd pInfo">评价详情：</div>
      <div className="m-info">
        <div className="info-bd">
          <div className="item">
            <div className="item-key lh">评价时间：</div>
            <div className="item-value lh">{evaluateTime}</div>
          </div>
          <div className="item">
            <div className="item-key lh">评价订单：</div>
            <div className="item-value lh">{evaluateId}</div>
          </div>
          <div className="item">
            <div className="item-key lh">星级评价：</div>
            <div className="item-value">
              <Rate disabled value={evaluateScore || 0} />
            </div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="item-key lh pingContent" style={{paddingLeft:'20px',paddingTop:'20px'}}>评价内容：</div>
      </div>
      <div className="msg-bd">
        <div className="item">
          <div className="item-content">
            {evaluateContent}
          </div>
        </div>
      </div>
    </div> */}

  </div>
    </Drawer>
        <div className="m-query">
          <span>科室：</span>
          <Input className="mb16" onChange={e=>this.setState({deptName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:120}} size="large" placeholder="请输入科室名" />
          <span>医生：</span>
          <Input onChange={e=>this.setState({doctorName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:120}} size="large" placeholder="请输入医生姓名" />
          <span>用户：</span>
          <Input onChange={e=>this.setState({userName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:120}} size="large" placeholder="请输入用户姓名" />
          <span>就诊人：</span>
          <Input onChange={e=>this.setState({patientName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:120}} size="large" placeholder="请输入就诊人姓名" />
          <span>咨询类型：</span>
          <Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            value={this.state.type}
            // disabled={this.state.showordertype}
            onChange={value => this.setState({type: value})}
          >
            <Option value="">全部</Option>
            <Option value="1">图文咨询</Option>
            <Option value="2">电话咨询</Option>
            <Option value="3">视频咨询</Option>
          </Select>
          <span>咨询状态：</span>
          <Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            value={this.state.status}
            onChange={value => this.setState({status: value})}
          >
            <Option value="">全部</Option>
            <Option value="0">待回复</Option>
            <Option value="1">咨询中</Option>
            <Option value="3">已结束</Option>
            <Option value="4">申请中</Option>
            <Option value="5">已拒绝</Option>
            <Option value="50">已退款</Option>
            <Option value="40">已超时</Option>
          </Select>
          <span>咨询目的：</span>
          <Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            value={this.state.purposeType}
            onChange={value => this.setState({purposeType: value})}
          >
            <Option value="">全部</Option>
            <Option value="1">咨询</Option>
            <Option value="2">复诊</Option>
             <Option value="3">报告解读</Option> 
            <Option value="4">加号</Option>
            <Option value="8">其他</Option>
            <Option value="9">免费报告解读</Option>
          </Select>

          <span>咨询订单：</span>
          <Input onChange={e=>this.setState({orderId:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:120}} size="large" placeholder="请输入订单号" />
          <span>时间：</span>
          <RangePicker size="large"    onChange={this.onDateChange} disabledDate={this.disabledDate} locale={locale.DatePicker}/>

          <Button size="large" type="primary" onClick={this.onSubmit}>确 定</Button>

        </div>

        <div>
          <Table
            columns={this.getColumns()}
            dataSource={datalist}
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
  const { operateConsultLst = {} } = state;
  return {
    modelData: operateConsultLst,
  };
})(Widget);
