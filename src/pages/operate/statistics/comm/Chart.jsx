import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { DataSet } from '@antv/data-set';


class Widget extends React.Component {
  state = {}

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'operateStatistics/getUserData' });
    dispatch({ type: 'operateStatistics/getInquiryData' });
    dispatch({ type: 'operateStatistics/getApprData' });
    dispatch({ type: 'operateStatistics/getProfitData' });
    dispatch({ type: 'operateStatistics/getInquiryPurposeData' });
  }

  getChart1 = () => {
    const { modelData = {} } = this.props;
    const { userData: data = [] } = modelData;

    const cols = {
      'totalSum': { min: 0 },
      'mt': {}
    };

    return { data, cols };
  }

  getChart2 = () => {
    const { modelData = {} } = this.props;
    const { inquiryData = [] } = modelData;

    const tmpArr = [
      {name: '回复数'},
      {name: '未回复数'},
    ];
    const dateArr = [];

    for(let i in inquiryData){
      const tempData = inquiryData[i] || {};
      tmpArr[0][tempData.mt || ''] = tempData.repliedSum || 0;
      tmpArr[1][tempData.mt || ''] = tempData.noReplySum || 0;
      dateArr.push(tempData.mt);
    }
    const ds = new DataSet();
    const dv = ds.createView().source(tmpArr);
    dv.transform({
      type: 'fold',
      fields: dateArr, // 展开字段集
      key: '日期', // key字段
      value: '数量', // value字段
    });
    return { dv };
  }

  getChart3 = () => {
    const { modelData = {} } = this.props;
    const { apprData: data = [] } = modelData;

    const cols = {
    };

    return { data, cols };
  }

  getChart4 = () => {
    const { modelData = {} } = this.props;
    const { profitData: data = [] } = modelData;

    const cols = {
      'totalAmt': {
        range: [0, 1],
        formatter: (val = 0) => {
          return (val/100).toFixed(2);
        }
      }
    };

    return { data, cols };
  }
  getChart5 = () => {
    const { modelData = {} } = this.props;
    const { inquiryPurposeData: data = [] } = modelData;

    const cols = {
      'totalAmt': { min: 0,range: [0, 1] },
      'purpose': {}
    };

    return { data, cols };
  }

  render() {
    const chart1 = this.getChart1();
    const chart2 = this.getChart2();
    const chart3 = this.getChart3();
    const chart4 = this.getChart4();
    const chart5 = this.getChart5();
    return (
      <div className="m-chart">
        <div className="chart-item">
          <div className="chart">
            <div className="chart-title">新增用户统计</div>
            <div className="chart-wrap">
              <Chart padding="auto" height={310} data={chart1.data} scale={chart1.cols} forceFit>
                <Axis name="mt" />
                <Axis name="totalSum" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom
                  tooltip={['mt*totalSum', (mt, totalSum) => {
                    return {
                      name: '总用户数',
                      value: totalSum
                    };
                  }]}
                  color="#4FAFCD" type="line" position="mt*totalSum" size={2} />
                <Geom color="#4FAFCD" type='point'
                      position="mt*totalSum"
                      size={4}
                      shape={'circle'}
                      style={{ 1: '#fff', lineWidth: 1 }} />
              </Chart>
            </div>
          </div>
        </div>
        <div className="chart-item">
          <div className="chart">
            <div className="chart-title">咨询问题总数</div>
            <div className="chart-wrap">
              <Chart padding="auto" height={310} data={chart2.dv} forceFit>
                <Axis name="日期" />
                <Axis name="数量" />
                <Legend position="top" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom type='interval'
                      position="日期*数量"
                      color={['name', ['#EB6CA4', '#4FAFCD']]}
                      adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
              </Chart>
            </div>
          </div>
        </div>
        <div className="chart-item">
          <div className="chart">
            <div className="chart-title">用户满意度统计</div>
            <div className="chart-wrap">
              <Chart padding="auto" height={310} data={chart3.data} scale={chart3.cols} forceFit>
                <Axis name="level" />
                <Axis name="totalSum" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom
                  color="#4FAFCD"
                  type="interval"
                  position="level*totalSum"
                  tooltip={['level*totalSum', (level, totalSum) => {
                    return {
                      name: '总用户数',
                      value: totalSum
                    };
                  }]}
                />
              </Chart>
            </div>
          </div>
        </div>
        <div className="chart-item">
          <div className="chart">
            <div className="chart-title">每日收益统计</div>
            <div className="chart-wrap">
              <Chart padding="auto" height={310} data={chart4.data} scale={chart4.cols} forceFit>
                <Axis name="dt" />
                <Axis name="totalAmt" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom
                  color="#4FAFCD"
                  type="interval"
                  position="dt*totalAmt"
                  tooltip={['dt*totalAmt', (dt, totalAmt) => {
                    return {
                      name: '收益(元)',
                      value: ((totalAmt || 0)/100).toFixed(2)
                    };
                  }]}
                />
              </Chart>
            </div>
          </div>
        </div>
        <div className="chart-item">
          <div className="chart">
            <div className="chart-title">咨询目的统计</div>
            <div className="chart-wrap">
              <Chart padding="auto" height={310} data={chart5.data} scale={chart5.cols} forceFit>
                <Axis name="purpose" />
                <Axis name="totalAmt" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom
                  color="#4FAFCD"
                  type="interval"
                  position="purpose*totalAmt"
                  tooltip={['purpose*totalAmt', (purpose, totalAmt) => {
                    return {
                      name: '总用户数',
                      value: totalAmt
                    };
                  }]}
                />
              </Chart>
            </div>
          </div>
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
