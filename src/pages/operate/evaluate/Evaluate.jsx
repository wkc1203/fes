import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button, Tooltip, Rate,Drawer } from 'antd';
import './style.less';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const typeMap = {
  undefined: '',
  '1': '图文咨询',
  '2': '视频咨询',
  '3': '电话咨询',
}
class Widget extends React.Component {
  state = {
    startDate: '',
    endDate: '',
    word: '',
    score: '',
    visible:false,
    evaluateContent: '',
    evaluateId: '',
    evaluateTime: '',
    evaluateScore: '',
    txt1:'',
    txt2:'',
    doctorName:'',

  };
  
  componentDidMount() {
    this.getList();
  }
  getList = (page = 1, pageSize = 10) => {
    const { word = '', startDate = '', endDate = '', score = '',doctorName='' } = this.state;
    const payload = {
      hisId:sessionStorage.getItem('hisId'),
      userName: word,
      startDate:startDate?startDate+' 00:00:00':'',
      endDate:endDate?endDate+' 23:59:59':'',
      pageNum: page,
      doctorName:doctorName,
      numPerPage: pageSize,
    };
    if (score) {
      payload.score = score;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'operateEvaluate/getList',
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
  getDetail = (orderId) => {
    const { dispatch, location = {} } = this.props;
    dispatch({
      type: 'operateEvaluate/getDetail',
      payload: { orderId:orderId, }
    });
  }
  onPageChange = (page, pageSize) => {
    this.getList(page, pageSize);
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
        title: '评价时间',
        dataIndex: 'createTimeStr',
      },
      {
        title: '评价订单',
        dataIndex: 'orderIdStr',
      },
      {
        title: '科室名称',
        dataIndex: 'deptName',
      },
      {
        title: '医生姓名',
        dataIndex: 'doctorName',
      },
      // {
      //   title: '医生工号',
      //   dataIndex: 'doctorId',
      // },
      {
        title: '用户姓名',
        dataIndex: 'name',
      },
      // {
      //   title: '用户联系方式',
      //   dataIndex: 'mobile',
      // },
      {
        title: '医生星级',
        render: (item) => {
          return (
              <Rate disabled value={item.score || 0} />
          );
        }
      },
      {
        title: '医生评价详情',
        render: (item) => {
          var str=item.appraisalLabel||'';
          var itemList='';//评价标签个数
          if(str.length>0){
            var s=[];
            s= str.split("-");//后台将评价标签保存为一条字符串，需要分隔
          
            for(var i=0;i<s.length;i++)
            {//按显示格式分隔
                   itemList=itemList+'#'+s[i]+'# ';
            }
           }
         
          return (
            <Tooltip placement="topRight" title={itemList+(!!item.appraisal?item.appraisal:'') || '暂无'}>
              <div className="unit-text" style={{maxWidth: '200px'}}>{itemList+(!!item.appraisal?item.appraisal:'') || '暂无'}</div>
            </Tooltip>
          );
        }
      },
      {
        title: '医院星级',
        render: (item) => {
          return (
              <Rate disabled value={item.hisScore || 0} />
          );
        }
      },
      {
        title: '医院评价详情',
        render: (item) => {
          var str=item.hisAppraisalLabel||'';
         var itemList='';//评价标签个数
         if(str.length>0){
          var s=[];
          s= str.split("-");//后台将评价标签保存为一条字符串，需要分隔
        
          for(var i=0;i<s.length;i++)
          {//按显示格式分隔
                 itemList=itemList+'#'+s[i]+'# ';
          }
         }
         
          return (
            <Tooltip placement="topRight" title={itemList+(!!item.hisAppraisal?item.hisAppraisal:'') || '暂无'}>
              <div className="unit-text" style={{maxWidth: '200px'}}>{itemList+(!!item.hisAppraisal?item.hisAppraisal:'') || '暂无'}</div>
            </Tooltip>
          );
        }
      },
      {
        title: '操作',
        key: 'id',
        render: (item) => {
          return (

              <span>
                <a target="_blank" onClick={() => {
                  /* var str1=item.hisAppraisalLabel||'';
                  var itemList1='';//评价标签个数
                  if(str1.length>0){
                   var s1=[];
                   s1= str1.split("-");//后台将评价标签保存为一条字符串，需要分隔
                 
                   for(var i=0;i<s1.length;i++)
                   {//按显示格式分隔
                          itemList1=itemList1+'#'+s1[i]+'# ';
                   }
                  }
                  this.setState({
                   txt2:itemList1+(!!item.hisAppraisal?item.hisAppraisal:'') || ''
                 })
                     
              var str=item.appraisalLabel||'';
              var itemList='';//评价标签个数
              if(str.length>0){
                var s=[];
                s= str.split("-");//后台将评价标签保存为一条字符串，需要分隔
              
                for(var i=0;i<s.length;i++)
                {//按显示格式分隔
                      itemList=itemList+'#'+s[i]+'# ';
                }
              }
              this.setState({
                txt1:itemList+(!!item.appraisal?item.appraisal:'') || ''
              }) */
                  this.getDetail(item.orderIdStr);
                  this.showDrawer();
                //const w=window.open('about:blank');
               // w.location.href='http://'+window.location.host+'/#/operate/evaluate/detail?'+'orderId='+item.orderIdStr
                
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
    const { recordList = [], currentPage = 1, numPerPage = 10, totalCount = 0 } = listData;
    const { modelData: { detailData = {} } = {} } = this.props;
   
    const { inquiry = {}, items = [],appraisal=[], } = detailData;
    var  item1=modelData.item1;
    var  item2=modelData.item2;
   console.log(modelData,modelData.item1)
    return (
        <div className="page-order-list">
        <Drawer
        title="评价详情"
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
      <div style={{padding:'0 30px',backgroundColor:'#fff'}}>
      <div className='m-msg'>

        <div className="msg-hd pInfo">评价详情：</div>

        <div className="m-info">

          <div className="info-bd">
            <div className="item" style={{flex:'1'}}>
              <div className="item-key lh">评价时间：</div>
              <div className="item-value lh">{appraisal.createDate || ''}</div>
            </div>

            <div className="item" style={{flex:'1'}}>
              <div className="item-key lh">评价订单：</div>
              <div className="item-value lh">{inquiry.orderIdStr}</div>
            </div>
           
          </div>
         
          <div className="info-bd">
            <div className="item" style={{flex:'1'}}>
              <div className="item-key lh">医生评价：</div>
              <div className="item-value lh">
                <Rate disabled value={appraisal.score || 0} />
              </div>
            </div>
            <div className="item" style={{flex:'1'}}>
              <div className="item-key lh">医生评价详情：</div>
              <div className="item-value lh">
              {!!item1&&item1!=''||!!appraisal.appraisal?item1+appraisal.appraisal:'暂无'}
              </div>
            </div>
          </div>
          <div className="info-bd" >
          <div className="item" style={{flex:'1'}}>
            <div className="item-key lh">医院评价：</div>
            <div className="item-value lh">
              <Rate disabled value={appraisal.hisScore || 0} />
            </div>
          </div>
          {
            <div className="item" style={{flex:'1'}}>
            <div className="item-key lh">医院评价详情：</div>
            <div className="item-value lh">
            {!!item2&&item2!==''||!!appraisal.hisAppraisal?item2+appraisal.hisAppraisal:'暂无'}
            </div>
          </div>}
        </div>
        </div>
        

      </div>
      </div>

      <div style={{padding:'0 30px',backgroundColor:'#fff'}}>

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
          <div className="item">
            <div className="item-key">联系方式：</div>
            <div className="item-value">{appraisal.mobile||''}</div>
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
          <div className="item">
            <div className="item-key">所属科室：</div>
            <div className="item-value">{appraisal.deptName}</div>
          </div>
        </div>
      </div>
     </div>

     <div style={{padding:'0 30px',backgroundColor:'#fff',marginTop:30}}>
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
                      item.url&&item.voiceTime==0&&item.action!='add'&&<a href={item.url} target="_blank"><img src={item.url} alt="" style={{width:'100px',height:'100px'}}/></a>
                    }
                    {
                      item.url&&item.voiceTime==0&&item.action=='add' &&<a href={item.url} target="_blank"><img src={item.url} alt="" style={{width:'232px',height:'82px'}}/></a>

                    }

                    {
                      !item.url&&item.voiceTime==0&&<span>{item.content}</span>
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

    </div>
      </Drawer>
          <div className="m-query">
            <span>用户名：</span>
            <Input onChange={e=>this.setState({word:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" size="large" placeholder="请输入用户名" />
            <span>医生姓名：</span>
            <Input onChange={e=>this.setState({doctorName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" size="large" placeholder="请输入医生姓名" />
          
            <span>时间：</span>
            <RangePicker size="large"   onChange={this.onDateChange} locale={locale.DatePicker} />
            <span>星级：</span>
            <Select
                size="large"
                style={{width: '160px', marginRight: '30px'}}
                placeholder="请选择评价星级"
                onChange={value => this.setState({score: value})}
                >
              <Option value="">全部星级</Option>
              <Option value="1">一星评价</Option>
              <Option value="2">二星评价</Option>
              <Option value="3">三星评价</Option>
              <Option value="4">四星评价</Option>
              <Option value="5">五星评价</Option>
            </Select>
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
  const { operateEvaluate = {} } = state;
  return {
    modelData: operateEvaluate,
  };
})(Widget);
