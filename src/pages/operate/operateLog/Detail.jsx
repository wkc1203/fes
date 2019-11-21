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
   this.setState({
     allContent:JSON.parse(this.props.location.query.allContent)
   })
  }
  state = {
    allContent: '',
    evaluateId: '',
    evaluateTime: '',
    evaluateScore: '',
    showdata:false,
    showbefore:false,
    showafter:false,
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
    const allContent =JSON.parse(this.props.location.query.allContent);
    const time=this.props.location.query.time;
    console.log("a",allContent,allContent.createTime)
 
    return (
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
    );
  }
}
export default connect((state) => {
  const { operateEvaluate = {} } = state;
  return {
    modelData: operateEvaluate,
  };
})(Widget);
