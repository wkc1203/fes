import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import {Drawer } from 'antd'
import { Table, Input, Select, DatePicker, Button, Tooltip, Rate } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../utils/utils';
import moment from 'moment';
import './style.less';
const Option = Select.Option;
const { RangePicker } = DatePicker;
class deptanalysis extends React.Component {
  state = {
    type:'',
    word:'',
    typepx:'inquirySum',
    startDate: '',
    endDate: '',
    dates: [
      // moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
  };

  componentDidMount() {
    if(window.localStorage.refDept!='2'){
      this.getList(2);
      window.localStorage.refDept=='1';
    }
    
  }

  getList = (btntype, page = 1, pageSize = 10) => {
    const { startDate = '', endDate = '',typepx='',type='',word='',} = this.state;
    if(btntype==1){
      let payload = {
        hisId: sessionStorage.getItem('hisId'),
        name: word,
        pageNum: page,
        numPerPage: pageSize,
        orderBy:typepx,
        sort:'DESC'
      };
      
    const { dispatch } = this.props;
    dispatch({
      type: 'deptanalysis/getdeptanalysisstatistics',
      payload,
    });
    }else if(btntype==2){

      let payload = {
        hisId: sessionStorage.getItem('hisId'),
        startDate:startDate?startDate+' 00:00:00':'',
        endDate:endDate?endDate+' 23:59:59':'',
        type,
        name: word,
        pageNum: page,
        numPerPage: pageSize,
        orderBy:typepx,
        sort:'DESC'
      };
      
      const { dispatch } = this.props;
      dispatch({
        type: 'deptanalysis/getdeptanalysisstatistics',
        payload,
      });
    }


  }

  onIptChange = (e) => {
    this.setState({
      word: e.target.value || '',
    });
  }

  onKeydown(e){
    if(e.keyCode===13){
      this.getList(2);
    }
  }

  finddept_no =()=>{
    this.getList(1);

  }

  onSubmit = () => {
    this.getList(2);
  }

  onPageChange = (page, pageSize) => {
    this.getList(2,page, pageSize);
  }

  changeDate = (dates, dateStrings) => {
    this.setState({
      dates,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
  }

  disabledDate =(current)=> {
    // console.log(Date.now())
    return current && current.valueOf() > Date.now();
  }

  getColumns() {
    return [
      {
        title: '排名',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '科室',
        dataIndex: 'dept_name',
        key:'dept_name'
      },
      {
        title: '咨询总量',
        dataIndex: 'inquirySum',
        key:'inquirySum'
      },
      {
        title: '平均响应时间',
        dataIndex: 'replyTime',
        key:'replyTime'
      },
      {
        title: '扫码人数(科室)',
        dataIndex: 'totalViewPerson',
        key:'totalViewPerson'
      },
      {
        title: '扫码次数(科室)',
        dataIndex: 'totalViews',
        key:'totalViews'
      },
      {
        title: '点击人数(科室)',
        dataIndex: 'totalClickPerson',
        key:'totalClickPerson'
      },
      {
        title: '点击次数(科室)',
        dataIndex: 'totalClicks',
        key:'totalClicks'
      },
      {
        title: '满意度',
        dataIndex: 'score_avg',
        key:'score_avg',
        render: (item) => {
          return (
              <Rate disabled value={item.score_avg || 0} />
          );
        }
      },
      {
        title: '收入',
        dataIndex: 'total_fee',
        key:'total_fee'
      },
      {
        title: '操作',
        dataIndex:'dept_no',
        key: 'dept_no',
        render: (item) => {
          return (
              <span>
                <a  onClick={() => {
                
                window.localStorage.refDept='2';
                window.location.href='http://'+window.location.host+'/#/dataanalysis/deptanalysis/detail?'+'no='+item.dept_no
              {/* <a onClick={() => {
                hashHistory.push({
                  pathname: '/dataanalysis/deptanalysis/detail',
                  query: {no:item.dept_no} */}
                // })
              }}>查看详情</a>
            </span>
          );
        },
      },
    ];
  }

  render() {
    const { modelData = {} } = this.props;
    const { listData = {} } = modelData;
    const { recordList = [], currentPage = 1, numPerPage = 10, totalCount = 0 } = listData;
    const recordLists =  recordList.length>0 ? recordList.map((item,key)=>{
      return {
        key:key+1,
        id: (currentPage-1)*10+(key+1),
        dept_name:item.dept_name,
        inquirySum:item.inquirySum,
        replyTime:item.replyTime,
        totalViewPerson:item.totalViewPerson,
        totalViews:item.totalViews,
        totalClickPerson:item.totalClickPerson,
        totalClicks:item.totalClicks,
        score_avg:{score_avg: parseFloat(item.score_avg) },
        total_fee:(item.total_fee / 100).toFixed(2),
        dept_no:{dept_no:item.dept_no}
      }
    }):[]

    // console.log(recordLists)

    return (
        <div className="pa24 bcfff">

          <div className="mb16">
            <Input className="mr25" onChange={this.onIptChange} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:'120px'}} size="large" placeholder="搜索科室" />

            {/* <Button className="ml25" size="large" type="primary" onClick={this.finddept_no}>搜 索</Button> */}

            {/* <i className="line"></i> */}

            <Select
              size="large"
              defaultValue=""
              style={{width:120}}
              onChange={value=>this.setState({type:value})}
            >
              <Option value="">全部咨询</Option>
              <Option value="1">图文咨询</Option>
              <Option value="2">电话咨询</Option>
              <Option value="3">视频咨询</Option>
            </Select>

            <Select
              className="mlr25"
              size="large"
              defaultValue={this.state.typepx}
              style={{width:120}}
              onChange={value=>this.setState({typepx:value})}
            >
              <Option value="inquirySum">咨询总量</Option>
              <Option value="scoreAvg">满意度</Option>
              <Option value="replyTime">平均响应时长</Option>
              <Option value="totalFee">收入</Option>
            </Select>

            <RangePicker size="large" 
              disabledDate={this.disabledDate}
              value={this.state.dates}
               
              onChange={this.changeDate} locale={locale.DatePicker} />

            <Button className="ml25" size="large" type="primary" onClick={this.onSubmit}>确 定</Button>

          </div>

          <div>
            <Table
                columns={this.getColumns()}
                dataSource={recordLists}
                pagination={{
              current: currentPage,
              pageSize: numPerPage,
              showQuickJumper: true,
              total: totalCount,
              showTotal: total => `共 ${total} 条`,
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
  const { deptanalysis = {} } = state;
  return {
    modelData: deptanalysis,
  };
})(deptanalysis);
