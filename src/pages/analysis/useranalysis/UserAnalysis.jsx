import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import Registered from './comm/Registered';
import BindingCard from './comm/BindingCard';
import UserAttribute from "./comm/UserAttribute";
import PatientAttributes from "./comm/PatientAttributes";

import './style.less';

class Widget extends React.Component {
  state = {}
  render() {
    return (
      <div className="home">
        <div className="h-tabs">
          <Tabs defaultActiveKey="1" className={`tab-hd`}>
            <TabPane tab="注册用户" key="1">
              <Registered></Registered>
            </TabPane>
            <TabPane tab="绑卡用户" key="2">
              <BindingCard></BindingCard>
            </TabPane>
            <TabPane tab="用户属性" key="3">
              <UserAttribute></UserAttribute>
            </TabPane>
            <TabPane tab="就诊人属性" key="4">
              <PatientAttributes></PatientAttributes>
            </TabPane>
          </Tabs>
        </div>

      </div>
    );
  }
}
export default connect((state) => {
  const { userAnalysis = {} } = state;
  return {
    modelData: userAnalysis,
  };
})(Widget);
