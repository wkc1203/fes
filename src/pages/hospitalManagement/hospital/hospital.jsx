import React from 'react';
import { connect } from 'dva';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { hashHistory } from 'dva/router';
import { formatDate } from '../../../utils/utils';
import { Table, Button, Alert, Modal, Input, Select, message, Icon, Upload, Checkbox } from 'antd';
import './style.less';
const { TextArea } = Input;
const confirm = Modal.confirm;
const { Option, OptGroup } = Select;
const levelList=[
    {
        name:'一级',value:'1',subLevel:[
            {name:'一级甲等',value:'11'},
            {name:'一级乙等',value:'12'},
            { name:'一级丙等',value:'13'},
        ]
    },
    {
        name:'二级',value:'2',subLevel:[
           {name:'二级甲等',value:'21'},
           {name:'二级乙等',value:'22'},
           { name:'二级丙等',value:'23'},
        ]
    },
    {
        name:'三级',value:'3',subLevel:[
            {name:'三级特等',value:'34'},
            {name:'三级甲等',value:'31'},
            {name:'三级乙等',value:'32'},
            {name:'三级丙等',value:'33'},
            
        ]
    }

]


class Hospital extends React.Component {
    state = { 
        ids: [],
        currentHis:'',//当前医院
        visible: false,
        visible1: false,//编辑医院
        hospitalName:'',
        defaultLevel:'请选择医院等级',//默认等级
        level: '',
        name: '',//输入的医院名称
        auditMethod1:false,
        auditMethod2:false,
        status: ''
    }
    //选择审核方式
    checked1 = () => {
        this.setState({
            auditMethod1:!this.state.auditMethod1
        })

    }
    checked2 = () => {
        this.setState({
            auditMethod2:!this.state.auditMethod2
        })

    }
    //选择医院等级
    handleChange = (e) => {       
        console.log(e);
        for(var i=0;i<levelList.length;i++){
             for(var j=0;j<levelList[i].subLevel.length;j++){
                 if(e==levelList[i].subLevel[j].value){
                     this.setState({
                        level:levelList[i].subLevel[j]
                     })
                 }
             }
        }
       // this.setState({ level:value });
    
    }

    showModal = () => {
        this.setState({
            visible: true,
            currentHis:'',//当前医院
            hospitalName:'',
            defaultLevel:'请选择医院等级',//默认等级
            level: '',
            auditMethod1:false,
            auditMethod2:false,            
        });
    };
   
    //确定添加医院
    handleOk = (e) => {
        const { dispatch } = this.props;
        var audit=0;
        if(this.state.auditMethod1&&this.state.auditMethod2){
            audit=3;
        }else{
             if(this.state.auditMethod1){
                 audit=1;
             }
             if(this.state.auditMethod2){
                audit=2;
            }
             
        }
        if(this.state.hospitalName==''){
            message.warning('请输入医院名称！', 2);
            return false;
        }
        if(this.state.level==''){
            message.warning('请选择医院等级！', 2);
            return false;
        }
        if(audit==0){
            message.warning('请选择审核方式！', 2);
            return false;
        }
        dispatch({
            type: 'hospital/addHospital',
            payload: {
                name: this.state.hospitalName,
                level: this.state.level.value,
                levelName: this.state.level.name,
                relation: '11',
                relationName: '11',
                auditMethod: audit,
                hisId: '2214',
            },
        });
        console.log('ssss')
        this.setState({
            visible: false,
        });
    };
     getIds = (id,hisId)=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'hospital/Ids',
            payload: {
                id,
                hisId
            },
        });
        this.setState({
            visible1: true,
        });
     }   
    changeDet = (payload) => {  
        this.setState({
            hospitalName: payload
        })
    }

    //取消添加
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            visible1: false,
        });
    }
    handleCancel1 = (e) => {
        console.log(e);
        this.setState({
            visible1: false,
        });
    }
    //修改医院状态
    action = (ids, hisId, operType) => {
        console.log('scscsc', ids, operType)
        const { dispatch } = this.props;
        if (operType == 'del') {
            confirm({
                content: '删除操作不可撤销，是否确定删除？',
                onOk() {
                    dispatch({ type: 'hospital/action', payload: { ids, hisId, operType } });
                },
            });
        } else {
            dispatch({ type: 'hospital/action', payload: { ids, hisId, operType } });
        }
    }
    //批量修改
    actions = (operType) => {
        console.log(this.state.ids)
        if (this.state.ids.length > 0) {
            this.action(this.state.ids.join(','), '2214', operType);
        } else {
            message.warning('请选择批量操作的科室！', 2);
        }
    }
    //查询
    query = (pageNum) => {
        const { dispatch } = this.props;
            dispatch({
                type: 'hospital/hisList',
                payload: {
                  name: this.state.name.replace(/(^\s*)|(\s*$)/g, ""), 
                    pageNum,            
                    status:this.state.status.replace(/(^\s*)|(\s*$)/g, ""), 
                    hisId: sessionStorage.getItem('hisId'),
                },
            });
        
        console.log('12121', this.props.data, this.props)
    }
    /* 编辑*/
    edit=(item)=>{
        this.setState({
            auditMethod1:false,
            auditMethod2:false,
           
        })
        var info=JSON.parse(item);
        console.log(JSON.parse(item));
        if(info.auditMethod=='1'){
            this.setState({
                auditMethod1:true
            })
        }
        if(info.auditMethod=='2'){
            this.setState({
                auditMethod2:true
            })
        }
        if(info.auditMethod=='3'){
            this.setState({
                auditMethod1:true,
                auditMethod2:true,
            })
        }
        this.setState({
            visible1:true,
            currentHis:info,
            hospitalName:info.name,
            defaultLevel:info.levelName,
            level:{name:info.levelName,value:info.level},
        })
    }
    /* 修改医院 */
    handleOk1=()=>{
        const { dispatch } = this.props;
        var audit=0;
        if(this.state.auditMethod1&&this.state.auditMethod2){
            audit=3;
        }else{
             if(this.state.auditMethod1){
                 audit=1;
             }
             if(this.state.auditMethod2){
                audit=2;
            }
             
        }
        if(this.state.hospitalName==''){
            message.warning('请输入医院名称！', 2);
            return false;
        }
        if(this.state.level==''){
            message.warning('请选择医院等级！', 2);
            return false;
        }
        if(audit==0){
            message.warning('请选择审核方式！', 2);
            return false;
        }
        dispatch({
            type: 'hospital/update',
            payload: {
                id:this.state.currentHis.id,
                name: this.state.hospitalName,
                level: this.state.level.value,
                levelName: this.state.level.name,
                relation: '11',
                relationName: '11',
                auditMethod: audit,
                hisId: '2214',
            },
        });
        console.log('ssss')
        this.setState({
            visible1: false,
        });
    }


    render() {
        console.log(levelList)
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
            }, {
                title: '等级',
                dataIndex: 'levelName',
            }, {
                title: '状态',
                dataIndex: 'status',
            }, {
                title: '创建时间',
                dataIndex: 'createTime',
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
        const data = this.props.data && this.props.data.recordList.length > 0 ?
            this.props.data.recordList.map((item) => {
                return {
                    key: item.id,
                    name: item.name, 
                    levelName: item.levelName,
                    status: item.status == 1 ? '启用' : '停用',
                    createTime: formatDate(new Date(item.createTime)),
                    action: { hisId: item.hisId, id: item.id, deptName: item.name, status: item.status,content:JSON.stringify(item) },
                };           
            }) : [];
        const totalCount = this.props.data ? this.props.data.totalCount : 0;
        const currentPage = this.props.data ? this.props.data.currentPage : 0;
        return (
            <div>
                <div className="query-box-hospital">
                    <span>医院名称：</span>
                    <Input type="text" size="large" placeholder="请输入"
                        value={this.state.name} onChange={e => this.setState({ name: e.target.value })}
                    />
                    <span>医院状态：</span>
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
                    <Button type="primary" onClick={() => this.query(1)}>搜 索</Button>
                   
                        <Button type="primary" icon="plus" onClick={() => { this.showModal() }}>添加医院</Button>
                        <Button size='default' onClick={() => this.actions('invalid')}>批量停用</Button>
                        <Button size='default' onClick={() => this.actions('valid')}>批量启用</Button>
                        <Button size='default' onClick={() => this.actions('del')}>批量删除</Button>
                 
                </div>
                <div className='chooseNumber'>
                    <Alert
                        type="info" showIcon
                        message={<p>已选择 <span style={{ color: '#EB6CA4' }}>{this.state.ids.length}</span> 项</p>}
                    />
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
                    title="添加医院"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className='hospitalName'><span>医院名称</span>
                    <Input placeholder="请填写医院名称" style={{width:'350px',marginLeft:'30px'}} value={this.state.hospitalName}
                        onChange={e => this.changeDet(e.target.value)}   /></div>
                    <div className='hospitalSize'>
                        <span>医院等级</span>
                        <Select 
                        defaultValue={this.state.defaultLevel} 
                        style={{ width: 200 }}
                         value={this.state.level.value!=''?this.state.level.value:''}
                        onChange={this.handleChange}>
                            {levelList.map((item,index)=>{
                                return(
                                    <OptGroup label={item.name} key={index}>
                                        {!!item&&!!item.subLevel&&item.subLevel.map((item1,index1)=>{
                                            return(
                                                <Option value={item1.value} key={index1}>{item1.name}</Option>
                                            )
                                        }
                                            )}
                                    </OptGroup>
                                )
                            })}
                       
                      </Select>
                    </div>
                    <div className='methods'>
                        <span className='methods1'>审核方式</span>
                        <Checkbox onChange={this.checked1} checked={this.state.auditMethod1}>监管端</Checkbox>
                        <Checkbox onChange={this.checked2} checked={this.state.auditMethod2}>医生工作台</Checkbox>
                    </div>

                </Modal>
                <Modal
                    title="编辑医院"
                    visible={this.state.visible1}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel}
                >
                    <div className='hospitalName'><span>医院名称</span>
                    <Input placeholder="请填写医院名称" style={{width:'350px',marginLeft:'30px'}} value={this.state.hospitalName}
                        onChange={e => this.changeDet(e.target.value)}  /></div>
                    <div className='hospitalSize'>
                        <span>医院等级</span>
                        <Select 
                        defaultValue={this.state.defaultLevel} 
                        style={{ width: 200 }} 
                        value={this.state.level.value!=''?this.state.level.value:''}
                        onChange={this.handleChange}>
                            {levelList.map((item,index)=>{
                                return(
                                    <OptGroup label={item.name} key={index}>
                                        {!!item&&!!item.subLevel&&item.subLevel.map((item1,index1)=>{
                                            return(
                                                <Option value={item1.value} key={index1}>{item1.name}</Option>
                                            )
                                        }
                                            )}
                                    </OptGroup>
                                )
                            })}
                       
                      </Select>
                    </div>
                    <div className='methods'>
                        <span className='methods1'>审核方式</span>
                        <Checkbox onChange={this.checked1} checked={this.state.auditMethod1}>监管端</Checkbox>
                        <Checkbox onChange={this.checked2} checked={this.state.auditMethod2}>医生工作台</Checkbox>
                    </div>

                </Modal>
           
                
            </div>
        )
    }
}


export default connect((state) => {
    const { hospital } = state
    return {
        ...hospital

    }
})(Hospital)
