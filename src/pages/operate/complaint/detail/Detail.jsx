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
      type: 'operateComplaintDtl/getDetail',
      payload: { id }
    });
  }

  render() {
    const { modelData = {} } = this.props;
    const { detailData = {} } = modelData;
    const imgArr = (detailData.complaintsCert || '').split(',');
    return (
      <div className="p-opt-cpt-dtl">
        <div className="m-info">
          <div className="info-hd">患者信息</div>
          <div className="info-bd">
            <div className="item">
              <div className="item-key">患者姓名：</div>
              <div className="item-value">{detailData.patientName}</div>
            </div>
            <div className="item">
              <div className="item-key">联系电话：</div>
              <div className="item-value">{detailData.phone}</div>
            </div>
            <div className="item">
              <div className="item-key">投诉时间：</div>
              <div className="item-value">{detailData.createDate}</div>
            </div>
          </div>
        </div>
        <div className="m-msg">
          <div className="msg-hd">投诉详情：</div>
          <div className="msg-bd">
            <div className="bd-txt">{detailData.complaintsContent}</div>
            <div className="bd-extra">
              {
                (imgArr || []).map((item, index) => {
                  return (
                    <a href={item} target="_blank">
                      <img src={item} alt="" />
                    </a>
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
  const { operateComplaintDtl = {} } = state;
  return {
    modelData: operateComplaintDtl,
  };
})(Widget);
