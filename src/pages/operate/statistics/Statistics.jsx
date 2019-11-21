import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import Chart from './comm/Chart';
import List from './comm/List';
import Dept from "./comm/Dept";

import './style.less';

class Widget extends React.Component {
  state = {}
  render() {
    return (
      <div className="p-operate-sts">
        <div className="m-tabs">
          <Tabs defaultActiveKey="1" className={`tab-hd`}>
            <TabPane tab="数据概况" key="1">
              <Chart></Chart>
            </TabPane>
            <TabPane tab="接诊统计" key="2">
              <List></List>
            </TabPane>
            <TabPane tab="科室统计" key="3">
              <Dept></Dept>
            </TabPane>
          </Tabs>
        </div>

      </div>
    );
  }
}
export default connect((state) => {
  const { operateStatistics = {} } = state;
  return {
    modelData: operateStatistics,
  };
})(Widget);
