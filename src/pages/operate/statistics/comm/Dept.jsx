import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button } from 'antd';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class Widget extends React.Component {
  state = {
    word: '',
    dateRange: 'today',
  }

  componentDidMount() {
    this.getDeptsList();
  }

  getDeptsList = () => {
    const { word = '', dateRange = '' } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'operateStatistics/getDeptsList',
      payload: {
        param: word,
        dayNum: dateRange,
        hisId:sessionStorage.getItem('hisId')

      }
    });
  }

  onIptChange = (e) => {
    this.setState({
      word: e.target.value || [],
    });
  }

  onSubmit = () => {
    this.getDeptsList();
  }

  // onPageChange = (page, pageSize) => {
  //   this.getList(page, pageSize);
  // }

  onDateChange = (value) => {
    this.setState({
      dateRange: value,
    });
  }

  getColumns = () => {
    return [
      {
        title: '科室名',
        dataIndex: 'dept_name',
      },
      {
        title: '科室编号',
        dataIndex: 'dept_no',
      },
      {
        title: '医生数量',
        dataIndex: 'doctorNum',
      },
      {
        title: '咨询数量',
        dataIndex: 'inquirySum',
      },
      {
        title: '回复数量',
        dataIndex: 'replyNum',
      },
      {
        title: '未回复数',
        dataIndex: 'noReplyNum',
      },
      {
        title: '加号数量',
        dataIndex: 'subscribeNum',
      },
      {
        title: '回复率',
        render: (data) => {
          return (
            <span>{(data.replyProportion==""?"无":(parseFloat(data.replyProportion)*100)+"%")}</span>
          );
        }
      },
      {
        title: '回复时长(分)',
        // dataIndex:'replyTime',
        render: (data) => {
          return (
            <span>{(data.replyTime==''?"无":data.replyTime)}</span>
          );
        }
      },

      {
        title: '满意度',
        // dataIndex:'score_avg',
        render: (data) => {
          return (
            <span>{(data.score_avg==''?"无":parseFloat(data.score_avg).toFixed(2))}</span>
          );
        }
      },
      {
        title: '总收入(元)',
        // dataIndex:'total_fee',
        render: (data) => {
          return (
            <span>{(data.total_fee=="0"?"0":((parseInt(data.total_fee) || 0) / 100).toFixed(2))}</span>
          );
        }
      },
    ];
  }

  render() {
    const { modelData = {} } = this.props;
    const { listDeptsData = [] } = modelData;
    const recordList = listDeptsData;
    console.log(recordList)
    return (
      <div className="g-list">
        <div className="m-query">

          <Select
            defaultValue="today"
            size="large"
            style={{ width: '160px', marginRight: '20px' }}
            placeholder="请选择"
            onChange={value => this.onDateChange(value)}
          >
            <Option value="today">今天</Option>
            <Option value="week">近7天</Option>
            <Option value="month">近1个月</Option>
            <Option value="season">近3个月</Option>
            <Option value="year">近1年</Option>
          </Select>

          <Button size="large" type="primary" onClick={this.onSubmit}>确 定</Button>
        </div>
        <div>
          <Table
            columns={this.getColumns()}
            dataSource={recordList}
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
