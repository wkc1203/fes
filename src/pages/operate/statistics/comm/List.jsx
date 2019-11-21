import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button } from 'antd';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class Widget extends React.Component {
  state = {
    word: '',
    dateRange: '30',
  }

  componentDidMount() {
    this.getList();
  }

  getList = (page = 1, pageSize = 10) => {
    const { word = '', dateRange = '' } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'operateStatistics/getList',
      payload: {
        param: word,
        flag: dateRange,
        pageNum: page,
        numPerPage: pageSize,
      }
    });
  }

  onIptChange = (e) => {
    this.setState({
      word: e.target.value || [],
    });
  }

  onSubmit = () => {
    this.getList();
  }

  onPageChange = (page, pageSize) => {
    this.getList(page, pageSize);
  }

  onDateChange = (value) => {
    this.setState({
      dateRange: value,
    });
  }

  getColumns = () => {
    return [
      {
        title: '接诊排名 (No.)',
        render: (data, item, index) => {
          return (
            <span>{index + 1}</span>
          );
        },
      },
      {
        title: '医生姓名',
        dataIndex: 'doctorName',
      },
      {
        title: '医生工号',
        dataIndex: 'doctorId',
      },
      {
        title: '咨询总量',
        dataIndex: 'totalSum',
      },
      {
        title: '平均回复时长',
        dataIndex: 'answerTime',
      },
      {
        title: '累计在线时长',
        dataIndex: 'onlineTime',
      },
      {
        title: '患者满意度',
        dataIndex: 'appraisal',
      },
      {
        title: '已接诊量',
        dataIndex: 'repliedSum',
      },
      {
        title: '未接诊量',
        dataIndex: 'noReplySum',
      },
      {
        title: '加号数量',
        dataIndex: 'subscribeNum',
      },
      {
        title: '累计接诊金额(元)',
        render: (data) => {
          return (
            <span>{((data.totalAmt || 0) / 100).toFixed(2)}</span>
          );
        },
      },
    ];
  }

  render() {
    const { modelData = {} } = this.props;
    const { listData = {} } = modelData;
    const { recordList = [], currentPage = 1, numPerPage = 10, totalCount = 0 } = listData;

    return (
      <div className="g-list">
        <div className="m-query">

          <Select
            defaultValue="30"
            size="large"
            style={{ width: '160px', marginRight: '20px' }}
            placeholder="请选择"
            onChange={value => this.onDateChange(value)}
          >
            <Option value="30">近30天</Option>
            <Option value="90">近3个月</Option>
            <Option value="180">近3个月</Option>
            <Option value="365">近1年</Option>
          </Select>
          <Input onChange={this.onIptChange} type="text" size="large" placeholder="请输入医生姓名和工号" />
          <Button size="large" type="primary" onClick={this.onSubmit}>确 定</Button>
        </div>
        <div>
          <Table
            columns={this.getColumns()}
            dataSource={recordList}
            pagination={{
              current: currentPage,
              pageSize: numPerPage,
              total: totalCount,
              onChange: (page, pageSize) => {
                this.onPageChange(page, pageSize);
              }
            }}
          />
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
