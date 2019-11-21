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
    const { orderId = '' } = location.query || {};
    dispatch({
      type: 'operateEvaluate/getDetail',
      payload: { orderId:orderId, }
    });
  }

  render() {
    const { modelData: { detailData = {} } = {} } = this.props;
  //  console.log(this.state);
    const { inquiry = {}, items = [],appraisal=[] } = detailData;
    console.log(appraisal)
    return (
      <div className="p-opt-cs-dtl">
        <div style={{padding:30,backgroundColor:'#fff',marginBottom:30}}>
        <div className='m-msg'>

          <div className="msg-hd pInfo">评价详情：</div>

          <div className="m-info">

            <div className="info-bd">

              <div className="item">
                <div className="item-key lh">评价时间：</div>
                <div className="item-value lh">{appraisal.createDate || ''}</div>
              </div>

              <div className="item">
                <div className="item-key lh">评价订单：</div>
                <div className="item-value lh">{inquiry.orderIdStr}</div>
              </div>

              <div className="item">
                <div className="item-key lh">星级评价：</div>
                <div className="item-value">
                  <Rate disabled value={appraisal.score || 0} />
                </div>
              </div>

            </div>

            <div className="info-bd">
            <div className="item">
                <div className="item-key lh">评价标签：</div>
                <div className="item-value lh">{appraisal.appraisalLabel?appraisal.appraisalLabel:'无'}</div>
              </div>
            </div>
            
          </div>


          <div className="item">
            <div className="item-key lh pingContent" style={{paddingLeft:'20px',paddingTop:'20px'}}>评价内容：</div>
          </div>

          <div className="msg-bd">

            <div className="item">
              <div className="item-content">
                {appraisal.appraisal}
              </div>
            </div>

          </div>

        </div>
        </div>

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
    );
  }
}
export default connect((state) => {
  const { operateEvaluate = {} } = state;
  return {
    modelData: operateEvaluate,
  };
})(Widget);
