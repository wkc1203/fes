import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Rate } from 'antd';

import './style.less';

const typeMap = {
  undefined: '',
  '1': '图文咨询',
  '2': '视频咨询',
  '3': '电话咨询',   
}
class Widget extends React.Component {
  state = {}

  componentDidMount() {
    this.getDetail();
  }
  state = {
    evaluateContent: '',
    evaluateId: '',
    evaluateTime: '',
    evaluateScore: '',
  };
  getDetail = () => {
    const { dispatch, location = {} } = this.props;
    const { id = '',evaluateContent='',evaluateId='',evaluateTime='',evaluateScore='' } = location.query || {};
    this.setState({
      evaluateContent: location.query.evaluateContent || '',
      evaluateId: location.query.evaluateId || '',
      evaluateTime: location.query.evaluateTime || '',
      evaluateScore: location.query.evaluateScore || '',
    });
    dispatch({
      type: 'add/getDetail',
      payload: { id:id, }
    });
  }

  render() {
    console.log("this.state",this.props);
    const detailData = this.props.modelData.detailData?this.props.modelData.detailData:''; 
    const {evaluateContent,evaluateId,evaluateTime,evaluateScore} = this.state;
   
    const inquiry= detailData.hospitalTradeno?detailData:'';
    console.log(inquiry,detailData.hospitalTradeno)
    return (
      <div className="p-opt-cs-dtl">
        <div style={{padding:30,backgroundColor:'#fff'}}>
       <div className="m-info">
          <div className="info-hd">订单信息</div>
          <div className="info-bd">
          
              <div className="item">
                <div className="item-key">订单号：</div>
                <div className="item-value">{inquiry!=''&&inquiry.hospitalTradeno||''}</div>
              </div>
              <div className="item">
                <div className="item-key">医院订单号：</div>
                <div className="item-value">{inquiry!=''&&inquiry.orderStr||''}</div>
              </div>
             
          </div>
          <div className="info-bd">
              <div className="item">
              <div className="item-key">就诊时间：</div>
              <div className="item-value">{inquiry!=''&&inquiry.orderDate.substring(0,10)+" "+(inquiry.times=='上午'?'11:00-11:30':inquiry.times=='礼嘉分院'?'15:30-16:00':'17:00-17:30')||''}</div>
            </div>
            <div className="item">
              <div className="item-key">订单金额：</div>
              <div className="item-value">￥{inquiry!=''&&(inquiry.fees / 100).toFixed(2)}</div>
            </div>
           
          
          </div>
          <div className="info-bd">
          <div className="item">
          <div className="item-key">订单状态：</div>
          <div className="item-value">{inquiry!=''&&inquiry.statusName}</div>
        </div>
          <div className="item">
            <div className="item-key">号别：</div>
            <div className="item-value">{inquiry!=''&&inquiry.registLevel||''}</div>
          </div>

        </div>
        </div>

        <div className="m-info">
          <div className="info-hd">用户信息</div>
          <div className="info-bd">
 
            <div className="item">
              <div className="item-key">用户名：</div>
              <div className="item-value">{inquiry!=''&&inquiry.userName||'暂无'}</div>
            </div>
            <div className="item">
              <div className="item-key">就诊人：</div>
              <div className="item-value">{inquiry!=''&&inquiry.patientName}</div>
            </div>
            <div className="item">
              <div className="item-key">用户编号：</div>
              <div className="item-value">{inquiry!=''&&inquiry.userId||''}</div>
            </div>
          </div>
        </div>

        <div className="m-info">
          <div className="info-hd">业务类型</div>
          <div className="info-bd">
            <div className="item">
              <div className="item-key">业务类型：</div>
              <div className="item-value">诊疗类</div>
            </div>
            <div className="item">
              <div className="item-key">订单类型：</div>
              <div className="item-value">加号</div>
            </div>
          </div>
        </div>

        <div className="m-info">
          <div className="info-hd">医生信息</div>
          <div className="info-bd">
            <div className="item">
              <div className="item-key">咨询医生</div>
              <div className="item-value">{inquiry!=''&&inquiry.doctorName||''}</div>
            </div>
           
          </div>
        </div>
        <div className="m-msg">
       <div className="msg-go" onClick={()=>{
         window.location.href='http://'+window.location.host+'/#/operate/consult/detail?'+'inquiryId='+inquiry.inquiryId
       }}>进入咨询详情</div>
      
     </div>
       </div>
       

      </div>
    );
  }
}
export default connect((state) => {
  const { add = {} } = state;
  return {
    modelData: add,
  };
})(Widget);
