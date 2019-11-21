import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import Overview from './comm/Overview';
import Norm from './comm/Norm';
import Warning from "./comm/Warning";

import './style.less';

class Widget extends React.Component {
  state = {}
  render() {
    var operateList='';
    var index_Index=false;
    var indexNum=false;
    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      console.log("ll",operateList)
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='INDEX_INDICATOR')
          {
            index_Index=true;
          }
          if(operateList[i]=='INDEX_WARNING')
          {
            indexNum=true;
          }
          }
    }
    return (
      <div className="home">
        {this.props.location.query.has=='1'&&<div className="h-tabs">
          <Tabs defaultActiveKey="1" className={`tab-hd`}>
            <TabPane tab="平台概况" key="1">
              <Overview></Overview>
            </TabPane>
            {index_Index&&<TabPane tab="关键指标" key="2">
              <Norm></Norm>
            </TabPane>}
            {indexNum&&<TabPane tab="智能预警" key="3">
              <Warning></Warning>
            </TabPane>}
          </Tabs>
        </div>}

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
