import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button, Tooltip, Rate } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { formatDate } from '../../../utils/utils';
import moment from 'moment';
import './style.less';
const Option = Select.Option;
const { RangePicker } = DatePicker;
class docanalysis extends React.Component {
  state = {
    type:'',
    word:'',
    word2:'',
    typepx:'inquirySum',
    startDate: '',
    endDate: '',
    dates: [
      // moment(formatDate(new Date(new Date() - (1 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
      // moment(formatDate(new Date()), 'YYYY-MM-DD'),
    ],
  };

  componentDidMount() {
    if(window.localStorage.refDoctor!='2'){
      this.getList(2);
      window.localStorage.refDoctor=='1';
    }else{
      this.getList(1);
    }

  }

  getList = (btntype, page = 1, pageSize = 10) => {
    const { startDate = '', endDate = '',typepx='',type='',word='',word2=''} = this.state;
    if(btntype==1){
      let payload = {
        hisId:sessionStorage.getItem('hisId'),
        name: word2,
        deptName:word,
        pageNum: page,
        numPerPage: pageSize,
        orderBy:typepx,
        sort:'DESC'
      };
      
    const { dispatch } = this.props;
    dispatch({
      type: 'docanalysis/getdoctoranalysisstatistics',
      payload,
    });
    }else if(btntype==2){

      let payload = {
        hisId:sessionStorage.getItem('hisId'),
        startDate:startDate?startDate+' 00:00:00':'',
        endDate:endDate?endDate+' 23:59:59':'',
        type,
        name: word2,
        deptName:word,
        pageNum: page,
        numPerPage: pageSize,
        orderBy:typepx,
        sort:'DESC'
      };
      
      const { dispatch } = this.props;
      dispatch({
        type: 'docanalysis/getdoctoranalysisstatistics',
        payload,
      });
    }


  }

  onIptChange = (e) => {
    this.setState({
      word: e.target.value || '',
    });
  }

  onIptChange2 = (e) => {
    this.setState({
      word2: e.target.value || '',
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
        dataIndex: 'deptName',
        key:'deptName'
      },
      {
        title: '医生姓名',
        dataIndex: 'doctorName',
        key:'doctorName'
      },
      {
        title: '咨询总数',
        dataIndex: 'inquirySum',
        key:'inquirySum'
      },
      {
        title: '扫码人数(医生)',
        dataIndex: 'totalViewPerson',
        key:'totalViewPerson'
      },
      {
        title: '扫码次数(医生)',
        dataIndex: 'totalViews',
        key:'totalViews'
      },
      {
        title: '点击人数(医生)',
        dataIndex: 'totalClickPerson',
        key:'totalClickPerson'
      },
      {
        title: '点击次数(医生)',
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
        dataIndex:'doctorId',
        key: 'doctorId',
        render: (item) => {
          return (
              <span>
                <a target="_top" onClick={() => {
               // const w=window.open('about:blank');
               window.localStorage.refDoctor='2';
                window.location.href='http://'+window.location.host+'/#/dataanalysis/docanalysis/detail?'+'doctorId='+item.doctorId
              {/* <a onClick={() => {
                hashHistory.push({
                  pathname: '/dataanalysis/docanalysis/detail',
                  query: {doctorId:item.doctorId}
                }) */}
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
        deptName:item.deptName,
        inquirySum:item.inquirySum,
        doctorName:item.doctorName,
        totalViewPerson:item.totalViewPerson,
        totalViews:item.totalViews,
        totalClickPerson:item.totalClickPerson,
        totalClicks:item.totalClicks,
        score_avg:{score_avg: parseFloat(item.score_avg) },
        total_fee:(item.total_fee / 100).toFixed(2),
        doctorId:{doctorId:item.doctorId}
      }
    }):[]

    // console.log(recordLists)

    return (
        <div className="pa24 bcfff">

          <div className="mb16">
            <Input onChange={this.onIptChange} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:'120px'}} size="large" placeholder="搜索科室" />
            <Input className="mlr25" onChange={this.onIptChange2} onKeyDown={(e)=> this.onKeydown(e)} type="text" style={{width:'120px'}} size="large" placeholder="搜索医生" />

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
              total: totalCount,
              showQuickJumper: true,
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
  const { docanalysis = {} } = state;
  return {
    modelData: docanalysis,
  };
})(docanalysis);
