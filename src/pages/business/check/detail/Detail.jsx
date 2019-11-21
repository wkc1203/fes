import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import './style.less';

class Widget extends React.Component {
  state = {}

  componentDidMount() {
    this.getDetail();
  }

  getDetail = () => {
    const { dispatch, location = {} } = this.props;
    const { id = '' } = location.query || {};
    dispatch({
      type: 'check/getDetail',
      payload: { id }
    });
  }

  render() {
    console.log("props",this.props);
    const modelData= this.props.modelData;
    const detailData= !!modelData.detailData.data?modelData.detailData.data:'';
  
    console.log("hh",detailData)
    const imgArr ='';
    return (
      <div className="p-opt-cpt-dtl">
        <div className="m-info">
          <div className="info-hd">订单信息</div>
          <div className="info-bd">
            <div className="item">  
              <div className="item-key">订单号：
              </div>
              <div className="item-value">{!!detailData.orderIdStr?detailData.orderIdStr:''}</div>
            </div>
            <div className="item">
              <div className="item-key">申请时间：
               </div>
              <div className="item-value">{!!detailData.createTime?new Date(detailData.createTime).getFullYear() + '-' + ( new Date(detailData.createTime).getMonth() + 1) + '-' +  new Date(detailData.createTime).getDate() + ' ' +  new Date(detailData.createTime).getHours() + ':' +  new Date(detailData.createTime).getMinutes() + ':' +  new Date(detailData.createTime).getSeconds():''}</div>
            </div>
            </div>
            <div className="info-bd">
            <div className="item">
              <div className="item-key">订单状态：</div>
              <div className="item-value">{!!detailData.status&&detailData.status=='0'?'待确认':detailData.status=='1'?'待付款':detailData.status=='2'?'已付款':detailData.status=='3'?'已付款':detailData.status=='4'?'已付款':''}</div>
            </div>
            <div className="item">
            <div className="item-key">订单金额：</div>
            <div className="item-value">{!!detailData.totalFee?(detailData.totalFee / 100).toFixed(2):''}</div>
          </div>
          </div>
        </div>
        <div className="m-info">
          <div className="info-hd">用户信息</div>
          <div className="info-bd">
            <div className="item">  
              <div className="item-key">用户名：
              </div>
              <div className="item-value">{!!detailData.userName?detailData.userName:''}</div>
            </div>
            <div className="item">
              <div className="item-key">就诊人：
               </div>
              <div className="item-value">{!!detailData.patientName?detailData.patientName:''}</div>
            </div>
            </div>
            <div className="info-bd">
            <div className="item">
              <div className="item-key">性别：</div>
              <div className="item-value">{!!detailData.patientSex&&detailData.patientSex=='F'?'女':'男'}</div>
            </div>
            <div className="item">
            <div className="item-key">用户编号：</div>
            <div className="item-value">{!!detailData.patientId?detailData.patientId:''}</div>
          </div>
          </div>
        </div>
        <div className="m-info">
          <div className="info-hd">业务类型</div>
          <div className="info-bd">
            <div className="item">  
              <div className="item-key">业务类型：
              </div>
              <div className="item-value">{!!detailData.checkItem&&JSON.parse(detailData.checkItem)[0].type=='check'?'检查类':'检验类'}</div>
            </div>
            <div className="item">
              <div className="item-key">订单类型：
               </div>
              <div className="item-value">检验检查单</div>
            </div>
          
          </div>
        </div>

        <div className="m-msg">
          <div className="msg-hd">医生信息</div>
          <div className="msg-bd">
            <div className="bd-txt">咨询医生：{!!detailData.doctorName?detailData.doctorName:''}</div>
            {
              !!detailData.checkItem&&(JSON.parse(!!detailData.checkItem?detailData.checkItem:[]) || []).map((item, index) => {
                return (
                  <div key={index} className="msg-bd">
                    <span>{item.project_name?item.project_name:''}&nbsp; &nbsp;&nbsp;&nbsp;</span>
                    <span>执行医生:张大力</span>
                  </div>
                );
              })
            }
          </div>
        </div>

        <div className="m-msg">
          <div className="msg-go" onClick={()=>{
            window.location.href='http://'+window.location.host+'/#/operate/consult/detail?'+'inquiryId='+detailData.inquiryId
          }}>进入咨询详情</div>
         
        </div>
      </div>
    );
  }
}
export default connect((state) => {
  const { check = {} } = state;
  return {
    modelData: check,
  };
})(Widget);
