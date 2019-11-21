import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';

// import {  } from 'antd';

class Widget extends React.Component {
  state = {
    notouttime_tw:0,
    notouttime_dh:0,
    notouttime_sp:0,
    overtime_tw:0,
    overtime_dh:0,
    overtime_sp:0,
  }

  componentDidMount() {
    const { dispatch } = this.props;
      console.log(this.props)
    dispatch({ type: 'home/getQr' ,payload:{hisId: sessionStorage.getItem('hisId'),account: sessionStorage.getItem('account'),accountType:1}});
    dispatch({ type: 'home/getintelliwarnstatistics' ,payload:{hisId: sessionStorage.getItem('hisId'),platformId: sessionStorage.getItem('hisId'),},

    callback:(data)=>{
      // console.log(data)
      data.map((item)=>{
        if(item.type==='1'){
          this.setState({
            notouttime_tw:item.noReplySum||0,
            overtime_tw:item.overtimeNum||0
          })
        }else if(item.type==='2'){
          this.setState({
            notouttime_dh:item.noReplySum||0,
            overtime_dh:item.overtimeNum||0
          })
        }else if(item.type==='3'){
          this.setState({
            notouttime_sp:item.noReplySum||0,
            overtime_sp:item.overtimeNum||0
          })
        }
      })
      
    }
    });
  }


  render() {
      console.log("prps1",this.props.modelData.qrcode.qrTicket)
    return (
      <div className="">
          { <div className="pa20 mb16 bcfff WarningCode">
              {!!this.props.modelData.qrcode.qrTicket&&<img src={'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+this.props.modelData.qrcode.qrTicket} alt=""/>}
              <h3>扫码订阅</h3>
              <p>微信扫描二维码，订阅异常预警。助您随时掌握平台动态</p>
          </div> }

          <div>
              <div className="homelist bcfff mb16">
                  <h3>今日即将超时咨询累计条数</h3>
                  <div>
                    <p><span>图文咨询</span><span>电话咨询</span><span>视频咨询</span></p>
                    <p>
                      <span>
                      <a onClick={() => hashHistory.push({pathname: '/order/comingOvertimeList', query: {ordertype: 'comingOvertime',showsearch:'hide',type:1}})}>{this.state.notouttime_tw}</a>
                      </span>
                      <span>
                        <a onClick={() => hashHistory.push({pathname: '/order/comingOvertimeList', query: {ordertype: 'comingOvertime',showsearch:'hide',type:2}})}>{this.state.notouttime_dh}</a>
                      </span>
                      <span>
                       <a onClick={() => hashHistory.push({pathname: '/order/comingOvertimeList', query: {ordertype: 'comingOvertime',showsearch:'hide',type:3}})}>{this.state.notouttime_sp}</a>
                      </span>
                      </p>
                  </div>
              </div>
              <div className="homelist bcfff mb16">
                  <h3>今日已超时咨询累计条数</h3>
                  <div>
                    <p><span>图文咨询</span><span>电话咨询</span><span>视频咨询</span></p>
                    <p><span>{this.state.overtime_tw}</span><span>{this.state.overtime_dh}</span><span>{this.state.overtime_sp}</span></p>
                  </div>
              </div>
            
          </div>
      </div>
    );
  }
}
export default connect((state) => {
  const { home = {} } = state;
  return {
    modelData: home,
  };
})(Widget);
