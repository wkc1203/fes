import React from 'react';
import { connect } from 'dva';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { hashHistory } from 'dva/router';
import { Table, Button, Alert, Modal, Input, Select, message, Icon, Upload, Checkbox } from 'antd';
import './style.less';
const Option = Select.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;
import { formatDate } from '../../../utils/utils';



class FunctionalDepartment extends React.Component {
    state = {
        ids: [],
        visible: false,          
        visible1:false,
        name:'',
        deptName:'',
        departmentName:'',
        currentDept:'',//当前科室信息
        hospitalName:'',
        hospitalId:'',//当前医院id
        status: ''
    }
    onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }

    showModal = () => {
        this.setState({
            deptName:'',
            hospitalId:'',
            visible: true,
        });

        this.getHospitalList();
      
    };
    componentDidMount(){
        this.query(1)
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            visible1: false,
        });
    }
    //查询
    query = (pageNum) => {
        const { dispatch } = this.props;
          /*   var data=JSON.parse(sessionStorage.getItem('loginInfo'));
            this.setState({
                loginInfo:data
            })
            
            const { dispatch } = this.props;
            if(!!data[2].referral){
                this.setState({
                    isRefer:true
                })
            }else{
                this.setState({}
                    isRefer:false
                })
            } */
            dispatch({
                type: 'functional1/deptlist',
                payload: {
                    hisId:'2214',
                    name: this.state.departmentName.replace(/(^\s*)|(\s*$)/g, ""),
                    hospitalName:this.state.hospitalName.replace(/(^\s*)|(\s*$)/g, ""),
                    pageNum,
                    operType:'s',
                    status: this.state.status,
                },
            });
        console.log('12121', this.props.data, this.props)
    }

    //添加科室
    handleOk = (e) => {
        const { dispatch } = this.props;
        if(this.state.deptName==''){
            message.warning('请输入部门名称！', 2);
            return false;
        }
        if(this.state.hospitalId==''){
            message.warning('请部门医院！', 2);
            return false;
        }
        var his={};
        for(var i=0;i<this.props.hisdata.length;i++){
            if(this.state.hospitalId==this.props.hisdata[i].name){
              his=this.props.hisdata[i]
            }
        }
        dispatch({
            type: 'functional1/addDepartment',
            payload: {
                hisId:'2214',
                name:this.state.deptName,
                hospitalId:his.id,
                hospitalName:his.name,
            },
        });
        console.log('ssss')
        this.setState({
            visible: false,
        });
    };
    //编辑科室
    handleOk1 = (e) => {
        const { dispatch } = this.props;
        if(this.state.deptName==''){
            message.warning('请输入部门名称！', 2);
            return false;

        }
        if(this.state.hospitalId==''){
            message.warning('请选择医院！', 2);
            return false;
        }
        var his={};
        for(var i=0;i<this.props.hisdata.length;i++){
            if(this.state.hospitalId==this.props.hisdata[i].name){
              his=this.props.hisdata[i]
            }
        }
        dispatch({
            type: 'functional1/updateDepartment',
            payload: {
                hisId:'2214',
                id:this.state.currentDept.id,
                name:this.state.deptName,
                hospitalId:his.id,
                hospitalName:his.name,
            },
        });
        console.log('ssss')
        this.setState({
            visible1: false,
        });
    };
      //修改科室状态
      action = (ids, hisId, operType) => {
        console.log('scscsc', ids,hisId, operType)
        const { dispatch } = this.props;
        if (operType == 'del') {
            confirm({
                content: '删除操作不可撤销，是否确定删除？',
                onOk() {
                    dispatch({ type: 'functional1/action', payload: { ids, hisId,operType } });
                },
            });
        } else {
            dispatch({ type: 'functional1/action', payload: { ids, hisId, operType } });
        }
    }
    //查询医院
    getHospitalList = () => {
        const { dispatch } = this.props;
            dispatch({
                type: 'functional1/getHospital',
                payload: {
                    
                },
            });
      
        console.log('12121', this.props, this.props)
    }
    //批量修改
    actions = (operType) => {
        console.log(this.state.ids)
        if (this.state.ids.length > 0) {
            this.action(this.state.ids.join(','), '2214', operType);
        } else {
            message.warning('请选择批量操作的部门！', 2);
        }
    }
    /* 编辑 */
    edit=(content)=>{
        this.getHospitalList();
        var list=JSON.parse(content);
        this.setState({
            currentDept:list,
            deptName:list.name,
            visible1:true,
            hospitalId:list.hospitalName
        })

    }
    render() {
        const data = this.props.data && this.props.data.recordList.length > 0 ?
            this.props.data.recordList.map((item) => {
                return {
                    key:item.id,
                    name: item.name,
                    hospitalName: item.hospitalName,
                    status: item.status == 1 ? '启用' : '停用',
                    createTime: formatDate(new Date(item.createTime)),
                    action: { hisId: item.hisId, id: item.id, deptName: item.name,content:JSON.stringify(item), status: item.status },
                };
            }) : [];
        const totalCount = this.props.data ? this.props.data.totalCount : 0;
        const currentPage = this.props.data ? this.props.data.currentPage : 0;
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                align: 'center',
            }, {
                title: '所属医院',
                dataIndex: 'hospitalName',
                align: 'center',
            }, {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
            }, {
                title: '添加时间',
                dataIndex: 'createTime',
                align: 'center'
            }, {
                title: '操作',
                dataIndex: 'action',
                render: (action) => {
                    return (
                        <span>
                            {action.status == 1 ? <a className='doing' onClick={() => this.action(action.id, action.hisId, 'invalid')}>停用</a> :
                            <a className='doing' onClick={() => this.action(action.id, action.hisId, 'valid')}>启用</a>}
                            <a className='doing' onClick={() => this.edit(action.content)}>编辑</a>
                            <a className='doing' onClick={() => this.action(action.id, action.hisId, 'del')}>删除</a>
                        </span>
                    );
                },
            },
        ];
        
        return (
            <div>
                <div className="query-box-func">
                    <span>医院名称：</span>
                    <Input type="text" size="large" placeholder="请输入"
                        value={this.state.hospitalName} onChange={e => this.setState({ hospitalName: e.target.value })}
                    />
                    <span>部门名称：</span>
                    <Input
                        type="text" size="large" placeholder="请输入"
                        value={this.state.departmentName} onChange={e => this.setState({ departmentName: e.target.value })}
                    />
                    <span>部门状态：</span>
                    <Select
                        size="large"
                        style={{ width: '120px', marginRight: '30px' }}
                        placeholder="请选择"
                        value={this.state.status}
                        onChange={value => this.setState({ status: value })}
                    >
                        <Option value="">全部</Option>
                        <Option value="1">正常</Option>
                        <Option value="2">停用</Option>
                    </Select>
                    <Button type="primary" onClick={() => this.query(1)}>确 定</Button>
               
                        <Button type="primary" icon="plus" onClick={this.showModal}>添加</Button>
                        <Button size='default' onClick={() => this.actions('invalid')}>批量停用</Button>
                        <Button size='default' onClick={() => this.actions('valid')}>批量启用</Button>
                        <Button size='default' onClick={() => this.actions('del')}>批量删除</Button>
                 
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        showQuickJumper: true,
                        current: currentPage,
                        total: totalCount,
                        showTotal: total => `共 ${total} 条`,
                        onChange: pageNumber => this.query(pageNumber),
                    }}
                    rowSelection={{
                        selectedRowKeys: this.state.ids,
                        onChange: (selectedRowKeys) => {
                            this.setState({ ids: selectedRowKeys });
                        },
                    }}
                />

                <Modal
                    title="添加部门"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className='hospitalName'>
                        <span>部门名称</span>
                        <Input placeholder="请输入部门名称" 
                        value={this.state.deptName}
                        onChange={e => this.setState({ deptName: e.target.value })}
                        />
                    </div>
                    <div className='hospitalSize'>
                        <span>所属医院</span>
                        <Select
                            showSearch
                            defaultValue=''
                            value={this.state.hospitalId}
                            style={{ width: 350, height: 40 }}
                            placeholder="请选择所属医院名称"
                            onChange={(value)=>{this.setState({hospitalId:value}),console.log(value)}}                          
                        >
                          {!!this.props.hisdata&&this.props.hisdata.length>0&&this.props.hisdata.map((item,index)=>{
                              return(
                                <Option  key={index} value={item.name}>{item.name}</Option>
                              )
                          })}
                        </Select></div>
                </Modal>
                <Modal
                    title="编辑部门"
                    visible={this.state.visible1}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel}
                >
                    <div className='hospitalName'><span>部门名称</span>
                    <Input placeholder="请填写医院名称"  value={this.state.deptName} onChange={e => this.setState({ deptName: e.target.value })}/></div>
                    <div className='hospitalSize'>
                        <span>所属医院</span>
                        <Select
                            showSearch
                            defaultValue=''
                            style={{ width: 350, height: 40 }}
                            value={this.state.hospitalId}
                            placeholder="请选择所属医院名称"
                            optionFilterProp="children"
                            onChange={(value)=>{this.setState({hospitalId:value})}}                          
                        >
                          {!!this.props.hisdata&&this.props.hisdata.length>0&&this.props.hisdata.map((item,index)=>{
                              return(
                                <Option  key={index} value={item.name}>{item.name}</Option>
                              )
                          })}
                        </Select></div>
                </Modal>
            </div>
        )
    }
}


export default connect((state) => {
    const { functional1 } = state
    return {
        ...functional1 
    }
})(FunctionalDepartment)
