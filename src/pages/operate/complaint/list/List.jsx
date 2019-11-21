import React from 'react';
import { connect } from 'dva';
// import { hashHistory } from 'dva/router';
import { Table, Input, Select, DatePicker, Button ,Tooltip,Modal,message} from 'antd';
import './style.less';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


class Widget extends React.Component {
  state = {
    userName: '',
    type:'',
    startDate:'',
    endDate:'',
     tipsProcess:false,
     tipsIgnore:false,
    showModal: false,
    extField:'',
    status:'',
    id:'',

    pnum:1,

    imgsrc:'',
    showimg:false,
  }

  componentDidMount() {
    this.getList();
    var operateList='';
  
    if(!!this.props.location.query.operate){
      operateList=JSON.parse(this.props.location.query.operate);
      for(var i=0;i<operateList.length;i++){
        if(operateList[i]=='TIPS_PROCESS')
          {
            this.setState({
              tipsProcess:true
            })
          }
          if(operateList[i]=='TIPS_IGNORE')
          {
            this.setState({
              tipsIgnore:true
            })
          }
          
     }
    }
  }

  getList = (page = 1, pageSize = 10) => {
    const { userName = '', type='',startDate='',endDate=''} = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'operateComplaintLst/getList',
      payload: {
        hisId:sessionStorage.getItem('hisId'),
        platformId:sessionStorage.getItem('hisId'),
        userName,
        status:type,
        pageNum: page,
        numPerPage: pageSize,
        startDate:startDate?startDate+' 00:00:00':'',
        endDate:endDate?endDate+' 23:59:59':''
      }
    });
  }

  onSubmit = () => {
    this.getList();
  }

  onDateChange = (date, dateStr) => {
    this.setState({
      startDate: dateStr[0] || '',
      endDate: dateStr[1] || '',
    });
  }

  onKeydown(e){
    if(e.keyCode===13){
      this.getList();
    }
  }

  disabledDate =(current)=> {
    return current && current.valueOf() > Date.now();
  }

  onPageChange = (page, pageSize) => {
    this.getList(page, pageSize);
  }


  HandlingComplaints=()=>{
    const { dispatch } = this.props;
    // console.log(this.state)
    // _this.getList();
    var _this = this;

    if (this.state.extField) {
      dispatch({
        type: 'operateComplaintLst/Handling',
        payload: {hisId:sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),id: this.state.id, extfield: this.state.extField,status:this.state.status},
        callback:(data)=>{
          // console.log(data)
          _this.getList(_this.state.pnum);
          _this.setState({id: '', showModal: false, extField: '',status:''});

        }
      });
    } else {
      message.warning('请输入处理结果', 2);
    }
  }

  ignoreComplaints=(id,pnum)=>{
    // console.log(id,pnum)
    var _this = this;
    this.setState({
      id:id,
      extField:'',
      status:'0',
      pnum
    },()=>{
      const { dispatch } = this.props;
      const payload= {hisId:sessionStorage.getItem('hisId'),platformId:sessionStorage.getItem('hisId'),id: this.state.id, extfield: this.state.extField,status:this.state.status}
      // console.log(payload)
      Modal.confirm({
        content: '忽略投诉不可撤销，是否确定忽略？',
        onCancel(){
          _this.setState({id: '',status:'', showModal: false,extField:''})
        },
        onOk() {
          dispatch({
            type: 'operateComplaintLst/Handling',
            payload,
            callback:(data)=>{
              // console.log(data)
              _this.getList(_this.state.pnum);
              
            }
          });
              // this.getList();

          // dispatch({ type: 'docMng/action', payload: {ids, operType} });
        },
      });
    })


  }


  infoExtField=(val,type)=> {
    const typetext = type==2?'备注信息':'投诉内容'
    Modal.info({
      title: (<span className="model2">{typetext}</span>),
      iconType:'',
      footer:null,
      maskClosable:true,
      okText:'',
      cancelText:'',
      content: (
        <div style={{ width: '100%' }} className="prl40">
          <p className="p-wrap">{val}</p>
          {/* <p>{id}</p> */}
        </div>
      ),
      onOk() {},
    });
  }

  showimg=(src)=>{
    console.log(src)
    Modal.info({
      // title: (<span className="model2">备注信息</span>),
      iconType:'',
      footer:null,
      maskClosable:true,
      okText:'',
      cancelText:'',
      content: (
        <img className="prl40" alt="example" style={{ width: '100%' }} src={src} />
      ),
      // onOk() {},
    });
  }


  getColumns(){
    return [
      {
        title: '投诉时间',
        dataIndex: 'createDate',
        key: 'createDate',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '用户联系方式',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '医生姓名',
        dataIndex: 'doctorName',
        key: 'doctorName',
      },
      {
        title: '投诉原因',
        dataIndex: 'complaintsReason',
        key: 'complaintsReason',
        className:'content',
        render: (item) => {
          return (
              <Tooltip placement="topRight" title={item||''}>
                <div className="unit-text">{item || ''}</div>
              </Tooltip>
          );
        }
      },
      {
        title: '投诉内容',
        // dataIndex: 'complaintsReason',
        key: 'complaintsContent',
        // width:{},
        render: (e) => {
          // console.log(e)
          return (
              <span>
                <a className='span-nowrap' onClick={()=>this.infoExtField(e.complaintsContent)}> {e.complaintsContent|| ''}</a>
                  {
                    e.complaintsCert?e.complaintsCert.split(',').map((item,key)=>{
                        return <span key={key} style={{marginRight:5,marginLeft:5}}>
                          <img style={{width:30}} onClick={()=>this.showimg(item)} src={item} alt=""/>
                        </span>
                    }):[]
                  }
              </span>
          );
        },
      },
      {
        title: '操作',
        // dataIndex: 'complaintsReason',
        key: 'id',
        render: (e) => {
          // console.log(e)
          return (
              <span>
              {this.state.tipsProcess&&e.status === '1'&&<span><a onClick={() => this.setState({id: e.id, showModal: true,status:'2',pnum:this.props.modelData.listData.currentPage})}>处理</a>
              <span className="divider-v" /></span> }
              {this.state.tipsIgnore&&<span> <a onClick={() => this.ignoreComplaints(e.id,this.props.modelData.listData.currentPage)}>忽略</a></span>}
              <span className="divider-v" />
              {e.status === '2' ? '已处理' : ''}
              {e.status === '0' ? '已忽略' : ''}
              </span>
          );
        },
      },
      {
        title:'备注信息',
        dataIndex: 'extfield',
        key:'extfield',
        width:'20%',
        render: (item) => {
          return (
              <div className="unit-text"><a className='span-nowrap' onClick={()=>this.infoExtField(item,2)}> {item|| ''}</a></div>
          );
        }
      }
    ];
  }

  render() {
    
     
    const { modelData = {} } = this.props;
    const { listData = {} } = modelData;
    const { recordList = [], currentPage = 1, numPerPage = 10, totalCount = 0 } = listData;

    return (
      <div className="p-opt-cpt-lst">
        <div className="m-query">
          <span>用户：</span>
          <Input onChange={e=>this.setState({userName:e.target.value})} onKeyDown={(e)=> this.onKeydown(e)} type="text" size="large" placeholder="请输入用户名" />
          <span>处理状态：</span>
          <Select
            size="large"
            style={{width: '120px', marginRight: '30px'}}
            placeholder="请选择"
            value={this.state.type}
            onChange={value => this.setState({type: value})}
          >
            <Option value="">全部</Option>
            <Option value="1">未处理</Option>
            <Option value="2">已处理</Option>
            <Option value="0">已忽略</Option>
          </Select>
          <span>时间：</span>
          <RangePicker size="large"   onChange={this.onDateChange} disabledDate={this.disabledDate} locale={locale.DatePicker}/>

          <Button size="large" type="primary" onClick={this.onSubmit}>确 定</Button>
        </div>
        <div>
          <Table
            rowKey="id"
            columns={this.getColumns()}
            dataSource={recordList}
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
          
        <Modal
          title="处理投诉"
          closable={false}
          visible={this.state.showModal}
          maskClosable={false}
          onCancel={() => this.setState({id: '',status:'', showModal: false,extField:''})}
          onOk={() =>this.HandlingComplaints()}
        >

            <TextArea placeholder="请输入处理结果" value={this.state.extField} onInput={e => this.setState({extField: e.target.value})} />
        </Modal>

      </div>
    );
  }
}
export default connect((state) => {
  const { operateComplaintLst = {} } = state;
  return {
    modelData: operateComplaintLst,
  };
})(Widget);
