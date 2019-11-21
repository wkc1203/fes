import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import Register from './comm/Register';
import TieCard from './comm/TieCard';

import './style.less';

class Widget extends React.Component {
  state = {}
  render() {
    return (
      <div className="home">
        <div className="h-tabs">
          <Tabs defaultActiveKey="1" className={`tab-hd`}>
            <TabPane tab="注册用户" key="1">
              <Register></Register>
            </TabPane>
            <TabPane tab="绑卡用户" key="2">
              <TieCard></TieCard>
            </TabPane>
          </Tabs>
        </div>

      </div>
    );
  }
}
export default connect((state) => {
  const { userList = {} } = state;
  return {
    modelData: userList,
  };
})(Widget);
