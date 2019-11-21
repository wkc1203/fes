import React from 'react';
import { connect } from 'dva';
import {  Rate } from 'antd';

import './style.less';

class OrdDet extends React.Component {
  state = {}
  componentDidMount() {
    const { dispatch ,location} = this.props;
    // console.log(this.props)
    // payload.hisId=sessionStorage.getItem('hisId')
    dispatch({
      type: 'ordDet/clear',
      payload:{orderId:location.query.orderId,hisId: sessionStorage.getItem('hisId'),}
    });
  }
  render() {
    const { data = {} } = this.props;
    return (
      <div className="page-order-det">
        <div>
          <p className="title">订单信息</p>
          <div>
            <p>订单号：<span>{data.orderIdStr}</span></p>
            <p>订单金额：<span>￥{(data.totalFee / 100).toFixed(2)}</span></p>
            <p>下单时间：<span>{data.createDate}</span></p>
            {/* <p>过期时间：<span>2018/06/20 17:35:20</span></p> */}
            <p>订单状态：<span>{data.statusName}</span></p>

            {data.orderStatus ==='R' ?
              <p>退款操作账号：<span>{data.operatorName|| '无'}</span></p> : ''}

            {data.orderStatus ==='R' ?
              <p>退款时间：<span>{data.refundTime|| '无'}</span></p> : ''}

            {data.orderStatus ==='R' ?
              <p>退款原因：<span>{data.refundDesc || '无'}</span></p> : ''}

          </div>
        </div>
        <div>
          <p className="title">用户信息</p>
          <div>
            <p>用户姓名：<span>{data.userName|| '无'}</span></p>
            <p>就诊人：<span>{data.patientName|| '无'}</span></p>
            <p>性别：<span>{data.sex|| '未知'}</span></p>
            <p>用户编号：<span>{data.patientId|| '无'}</span></p>
          </div>
        </div>
        <div>
          <p className="title">业务类型</p>
          <div>
            {data.businessType=='1'&&<p>业务类型：<span>咨询类</span> </p>}
            {data.businessType=='2'&&<p>业务类型：<span>诊疗类</span> </p>}
            {data.businessType=='1'&&data.type==='1'?<p>订单类型：<span>图文咨询</span></p>:''}
            {data.businessType=='1'&&data.type==='2'?<p><span>电话咨询</span></p>:''}
            {data.businessType=='1'&&data.type==='3'?<p><span>视频咨询</span></p>:''}
            {data.businessType=='2'&&data.type==='1'?<p><span>检验检查单</span></p>:''}
            {data.businessType=='2'&&data.type==='2'?<p><span>门诊加号</span></p>:''}
            
          </div>
        </div>
        <div>
          <p className="title">订单评价</p>
          {
            data.appraisalTime ? 
            <div>
            <p>评价时间：<span>{data.appraisalTime || '无'}</span></p>
            <div className='Ratelikep'>评价分数：<span>{data.score?<Rate disabled value={data.score} />:'无'}</span></div>
            {/* <p>评价时间：<span>{data.appraisalTime || '无'}</span></p> */}
            <p className="all-line">评价内容：<span>{data.appraisal || '无'}</span></p>
          </div>
          : <div>无
          </div>
          }
        </div>

        {
          data.orderStatus ==='R' ?
          <div>
            <p className="title">退款状态</p>
            <div>
              <p className="all-line">退款状态：<span>{data.statusName}</span></p>
              <p className="all-line">退款原因：<span className="drtextBox">{data.refundDesc||'无'}</span></p>
            </div>
            
          </div>
          :''  
          
        }

      </div>
    );
  }
}
export default connect((state) => {
  const { ordDet } = state;
  return {
    ...ordDet,
  };
})(OrdDet);
