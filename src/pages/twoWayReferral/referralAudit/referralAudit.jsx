import React from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Tabs, Drawer, Input, Select, Table, DatePicker, Button, Modal, Radio ,Checkbox, message } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const { TabPane } = Tabs;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Search } = Input;
const confirm = Modal.confirm;
import Image from '../../../resources/images/1.png';
import Image1 from '../../../resources/images/2a.png';
import './style.less';

var style = {
    color:'white',
    background: `url(${Image})`
}
var style1 = {
    background: `url(${Image1})`
}
var style2 = {
    color:'#108ee9'
}
class Referral extends React.Component {
    state = {
        visible: false,
        startDate: '',
        loginInfo:'',
        reasonList:[
            {name:'科室不符',checked:false},
            {name:'资料不全',checked:false},
            {name:'未达到转诊指标',checked:false},
            {name:'其他',checked:false},
        ],
        endDate: '',
        visible1: false,
        curContent:'',//当前审核信息
        status:'1',
        curDeptId:'',
        name1:'',//模糊查询字段
        curHisId:'',
        curInputHisId:'',
        isRefer:false,//是否是转入医院
        curDoctor:'',//当前选择的医生
        dates: [
            // moment(formatDate(new Date(new Date() - (365 * 24 * 60 * 60 * 1000))), 'YYYY-MM-DD'),
            // moment(formatDate(new Date()), 'YYYY-MM-DD'),
          ],
        visible2: false,
        reasonTxt:'',
        referralEnd:false
    }
    componentDidMount(){
        this.query(1,this.state.status);
      
        this.getHis();
        var data=JSON.parse(sessionStorage.getItem('loginInfo'));
       
        const { dispatch } = this.props;
        if(!!data[2].referral){
            const { dispatch } = this.props;
            dispatch({
                type: 'referral/dept',
                payload: {
                    hisId:data[2].hisId,
                },
            });
        }else{
            const { dispatch } = this.props;
            dispatch({
                type: 'referral/dept',
                payload: {
                    hospitalId:data[2].hospitalId,
                },
            });
        }
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    handleOk1=()=>{
        var flag='';
           for(var i=0;i<this.state.reasonList.length;i++){
            if(flag==''&&this.state.reasonList[i].checked&&i!=3){
                flag=this.state.reasonList[i].name;
            }else{
                if(this.state.reasonList[i].checked&&i!=3){

                    flag=flag+','+this.state.reasonList[i].name;
                }else{
                    if(i==3&&this.state.reasonList[i].checked){
                        if(this.state.reasonTxt==''){
                            message.warning('请输入其他原因', 2);
                            return false;
                        }else{
                            if(flag==''){
                                flag=this.state.reasonTxt;
                            }else{
                                flag=flag+','+this.state.reasonTxt;
                            }
                        }
                        
                    }
                }
            }
               
           }
           if(flag!=''){
               this.noApply(flag);
           }else{
            message.warning('请选择拒绝的原因', 2);
           }
    }
    getDetail=(id)=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'referral/detail',
            payload: {
                hisId:sessionStorage.getItem('hisId'),
                applyId:id
            },
        });
        console.log(".auditList",this.props)
    }
    showImg=(url)=>{
        Modal.info({
            // title: (<span className="model2">备注信息</span>),
            iconType:'',
            footer:null,
            maskClosable:true,
            okText:'',
            cancelText:'',
            content: (
              <img className="prl40" alt="example" style={{ width: '100%' }} src={url} />
            ),
            // onOk() {},
          });
         
    }
    
    getHis=()=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'referral/hospital',
            payload: {
                hisId:sessionStorage.getItem('hisId'),
            },
        });
    }
    getDoc=(id)=>{ 
        const { dispatch } = this.props;
        dispatch({
            type: 'referral/doctor',
            payload: {
                deptId:id,
                hisId:sessionStorage.getItem('hisId'),
            },
        });
    }
    query = (pageNum,val) => {
        var data=JSON.parse(sessionStorage.getItem('loginInfo'));
        this.setState({
            loginInfo:data
        })
        const { dispatch } = this.props;
        if(!!data[2].referral){
            this.setState({
                isRefer:true
            })
            console.log(val,this.state.curInputHisId)
            dispatch({
                type: 'referral/list',
                payload: {
                    hisId:this.state.curHisId!=''?this.state.curHisId:sessionStorage.getItem('hisId'),
                    pageNum,
                    numPerPage:10,
                    state:val,
                    doctorId:data[2].id,
                    doctorName:data[2].name,
                    deptId:this.state.curDeptId==''?data[2].referral[0].deptId:this.state.curDeptId,
                    hospitalId:this.state.curInputHisId,
                    vagueName:this.state.name1.replace(/(^\s*)|(\s*$)/g, ""),
                    startDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
                    endDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
                    sort:'DESC',
                    category:!!data&&!!data[2]&&!!data[2].referral?'1':'2'
                },
            });
        }else{
            this.setState({
                isRefer:false
            })
            console.log(val,this.state.name1)
            dispatch({
                type: 'referral/list',
                payload: {
                    hisId:sessionStorage.getItem('hisId'),
                    pageNum,
                    numPerPage:10,
                    state:val,
                    hospitalId:'',//data[2].hospitalId,
                    hospitalDeptId:data[2].deptId,
                    doctorId:data[2].id,
                    doctorName:data[2].name,
                    vagueName:this.state.name1.replace(/(^\s*)|(\s*$)/g, ""),
                    startDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
                    endDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
                    sort:'DESC',
                    category:!!data&&!!data[2]&&!!data[2].referral?'1':'2'
                },
            });
        }
        
    } 
    changeDate = (dates, dateStrings) => {
        this.setState({
          dates,
          startDate: dateStrings[0],
          endDate: dateStrings[1],
        });
      }
    changeDept=(val)=>{
        this.setState({
            curDeptId:val
        })
    }
    changeHis=(val)=>{
        this.setState({
            curHisId:val
        })
    }
    changeInputHis=(val)=>{
        this.setState({
            curInputHisId:val
        })
    }
    showDrawer = (type,id) => {
        console.log(type,"333");
        this.getDetail(id);
        if(type==1){
            this.setState({
                referralEnd:true
            })
            
        }else{
            this.setState({
                referralEnd:false
            }) 
        }
        this.setState({
            visible: true, 
        });
    };
    onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }
    showModal = () => {
        var that=this;
        if(this.state.isRefer){
            confirm({
                content: '是否同意本次转诊？',
                onOk() {
                    that.apply();
                },
            });
              
        }else{
            if(this.props.detail.auditMethod=='1'){
                this.setState({
                    visible1: true,
                });
            }else{
                var that=this;
                confirm({
                    content: '是否同意本次转诊？',
                    onOk() {
                        that.apply1();
                    },
                });
                ;
            }
        }
       
    };
    noApply=(flag)=>{
        const { dispatch } = this.props;
        var auditId='';
        for(var i=0;i<this.props.detail.auditList.length;i++){
            if(this.state.curContent.auditProcess==this.props.detail.auditList[i].type&&this.props.detail.auditList[i].status=='1'){
                auditId=this.props.detail.auditList[i].id;
            }
        }
        this.setState({
            visible1: false,
            visible: false,
            visible2:false,
            visible3:false,
        });
        dispatch({
            type: 'referral/apply',
            payload: {
                applyId:this.state.curContent.id,
                auditId:auditId,
                reason:flag,
                curDoctorId:this.state.loginInfo&&this.state.loginInfo[2].id,
                curDoctorName:this.state.loginInfo&&this.state.loginInfo[2].name
            }
        });
    }
    apply1=()=>{
        const { dispatch } = this.props;
        var auditId='';
        for(var i=0;i<this.props.detail.auditList.length;i++){
            if(this.state.curContent.auditProcess==this.props.detail.auditList[i].type&&this.props.detail.auditList[i].status=='1'){
                auditId=this.props.detail.auditList[i].id;
            }
        }
        this.setState({
            visible1: false,
            visible: false,
            visible2:false,
            visible3:false,
        });
        dispatch({
            type: 'referral/apply',
            payload: {
                applyId:this.state.curContent.id,
                auditId:auditId,
                curDoctorId:this.state.loginInfo&&this.state.loginInfo[2].id,
                curDoctorName:this.state.loginInfo&&this.state.loginInfo[2].name
            }
        });
    }
    apply=()=>{
        const { dispatch } = this.props;
        var auditId='';
        for(var i=0;i<this.props.detail.auditList.length;i++){
            if(this.state.curContent.auditProcess==this.props.detail.auditList[i].type&&this.props.detail.auditList[i].status=='1'){
                auditId=this.props.detail.auditList[i].id;
            }
        }
        this.setState({
            visible1: false,
            visible: false,
            visible2:false,
            visible3:false,
        });
        dispatch({
            type: 'referral/apply',
            payload: {
                applyId:this.state.curContent.id,
                auditId:auditId,
                curDoctorId:this.state.loginInfo&&this.state.loginInfo[2].id,
                curDoctorName:this.state.loginInfo&&this.state.loginInfo[2].name
            }
        });
    }
    disagree = () => {
        this.setState({
            visible2: true,
        });
    };
    changeReason=(item)=>{
         console.log("12",item);
         var list=this.state.reasonList;
         for(var i=0;i<list.length;i++){
             console.log(list[i])
             if(item.name==list[i].name){ 
                  
                list[i].checked=!list[i].checked;
             }

         }
         this.setState({
            reasonList:list
         })
         console.log(this.state.reasonList)
      
    }
    handleOk = e => {
        const { dispatch } = this.props;
        console.log(e);
        var auditId='';
        for(var i=0;i<this.props.detail.auditList.length;i++){
            if(this.state.curContent.auditProcess==this.props.detail.auditList[i].type&&this.props.detail.auditList[i].status=='1'){
                auditId=this.props.detail.auditList[i].id;
            }
        }
        console.log(this.state.curDoctor)
        var doc='';
        for(var i=0;i<this.props.doctor.length;i++){
            if(this.state.curDoctor==this.props.doctor[i].id){
                 doc=this.props.doctor[i];
            }
        }
        if(this.state.curDoctor!=''){
            this.setState({
                visible1: false,
                visible: false,
                visible2:false,
                visible3:false,
            });
            dispatch({
                type: 'referral/apply',
                payload: {
                    applyId:this.state.curContent.id,
                    auditId:auditId,
                    doctorId:doc.id,
                    doctorName:doc.name,
                    curDoctorId:this.state.loginInfo&&this.state.loginInfo[2].id,
                    curDoctorName:this.state.loginInfo&&this.state.loginInfo[2].name
                }
            });

           
       
        }else{
            message.warning('请选择科室', 2);

        }
        
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible1: false,
            visible2: false,
        });
    };
    changeTab=(e)=>{
          
        
        this.setState({status:e});
        console.log(this.state.status);
        this.query(1,e);

    }
    render() {
        console.log(this.props)
        const data = this.props.data && this.props.data.recordList.length > 0 ?
        this.props.data.recordList.map((item) => {
            return {
                key: item.id,
                patientName: item.patientName,
                deptName: item.deptName,
                doctorName: item.doctorName,
                hisName:item.hisName,
                hospitalName:item.hospitalName,
                createDate:item.createDate,
                status:item.status=='1'?'转诊中':item.status=='2'?'转诊成功':'转诊失败',
                action: { hisId: item.hisId, id: item.id,content:JSON.stringify(item),deptId:item.hospitalDeptId, deptName: item.name, status: item.status },
            };
        }) : [];
    const totalCount = this.props.data ? this.props.data.totalCount : 0;
    const currentPage = this.props.data ? this.props.data.currentPage : 0;

       
        const columns = [
            {
                title: '患者姓名',
                dataIndex: 'patientName',
                key: 'patientName',
            },
            {
                title: '科室',
                dataIndex: 'deptName',
                key: 'deptName',
            },
            {
                title: '医生',
                dataIndex: 'doctorName',
                key: 'doctorName',
            },
            {
                title: '转出医院',
                dataIndex: 'hisName',
                key: 'hisName',
            },
            {
                title: '转入医院',
                dataIndex: 'hospitalName',
                key: 'hospitalName',
                // sorter: (a, b) => a.fee - b.fee,
            },
            {
                title: '申请时间',
                dataIndex: 'createDate',
                key: 'createDate',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {

                dataIndex: 'action',
                key: 'action',
                render: (e) => {
                    return (
                        <span>
                            <a onClick={
                                () => {
                                    this.setState({curContent:JSON.parse(e.content)})
                                     this.getDoc(e.deptId);
                                    this.showDrawer(2,e.id)
                                }
                            }>查看</a>
                        </span>
                    );
                },
            },
        ];
        return (
            <div>
                <Tabs defaultActiveKey="1"  onChange={this.changeTab}>
                    <TabPane tab="待审核" key="1">
                        <div>
                        <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            showQuickJumper: true,
                            current: currentPage,
                            total: totalCount,
                            showTotal: total => `共 ${total} 条`,
                            onChange: pageNumber => this.query(pageNumber,this.state.status),
                        }}
                        rowSelection={{
                            selectedRowKeys: this.state.ids,
                            onChange: (selectedRowKeys) => {
                                this.setState({ ids: selectedRowKeys });
                            },
                        }}
                    />
                        </div>
                    </TabPane>
                    <TabPane tab="审核结束" key="2">
                        <div className="query-box-refer">
                            <span>科室</span>
                            <Select
                                size="large"
                                style={{ width: '120px', marginRight: '30px' }}
                                placeholder="请选择"
                                onChange={value => {this.changeDept(value)}}
                            >
                                { <Option value="">全部</Option> }
                                {this.props.dept&&this.props.dept.map((item,index)=>{
                                    return(
                                        <Option value={item.id}>{item.name}</Option>
                                    )
                                })}
                     
                            </Select>

                            {this.state.isRefer&&<span >转入医院</span>}
                            {this.state.isRefer&&<Select
                                size="large"
                                style={{ width: '120px', marginRight: '30px' }}
                                placeholder="请选择"
                                disabled={this.state.showordertype}
                                onChange={value => this.changeInputHis(value)}
                            >
                            { <Option value="">全部</Option> }
                            {this.props.hospital&&this.props.hospital.map((item,index)=>{
                                return(
                                    <Option value={item.id}>{item.name}</Option>
                                )
                            })}
                            </Select>
                           }
                                
                            <span>时间：</span>
                            <RangePicker size="large"   value={this.state.dates} onChange={this.changeDate} disabledDate={this.disabledDate} locale={locale.datePicker} />
          
                            <Input
                                placeholder="输入关键词查找"
                                onChange={name =>this.setState({name1:name})}
                                style={{ width: 200,marginRight:'10px' }}
                            />
                            <Button size="large" type="primary" onClick={() => this.query(1,this.state.status)}>确 定</Button>
                        </div>

                        <div>
                        <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            showQuickJumper: true,
                            current: currentPage,
                            total: totalCount,
                            showTotal: total => `共 ${total} 条`,
                            onChange: pageNumber => this.query(pageNumber,this.state.status),
                        }}
                        rowSelection={{
                            selectedRowKeys: this.state.ids,
                            onChange: (selectedRowKeys) => {
                                this.setState({ ids: selectedRowKeys });
                            },
                        }}
                    />
                        </div>
                    </TabPane>
                </Tabs>

                <div className='auditEnd'>
                    <Drawer
                        title="转诊详情"
                        placement="right"
                        onClose={this.onClose}
                        visible={this.state.visible}
                        bodyStyle={{
                            width: '100%',
                        }}
                        width='1200'
                    >
                        <div className='step'>
                        <img src='./images/jx.png' />转诊阶段</div>
                        <div className='step1'>
                            <div><p>阶段</p> <p>状态</p></div>
                            {
                                this.props.detail&&this.props.detail.auditList&&this.props.detail.auditList.length>0&&this.props.detail.auditList.map((item,index)=>{
                                    return(
                                        <div key={index}>
                                         <p style={this.state.curContent.auditProcess==item.type?style:style1}>{item.typeName}</p><img src='./images/wys.png'/>
                                          {this.state.curContent.auditProcess==item.type&&<p style={{color:'#108ee9',paddingTop:'5px'}}>{item.status=='2'?'已通过':this.state.curContent.auditProcess==item.type&&item.status!=='3'?'待审核':item.status=='3'?'未通过：'+item.remarker:''}</p>}
                                          {this.state.curContent.auditProcess!==item.type&&<p style={{paddingTop:'5px'}}>{item.status=='2'?'已通过':this.state.curContent.auditProcess==item.type&&item.status!=='3'?'待审核':item.status=='3'?'未通过：'+item.remarker:''}</p>}

                                          </div>
                                    )
                                })
                            }
                            
                        </div>
                        
                        <div className='message'> <img src='./images/jx.png' /><p>患者信息</p></div>
                        <div className='peopleMessages'>
                            <p>姓名：{this.state.curContent&&this.state.curContent.patientName}</p>
                            <p>年龄：{this.state.curContent&&this.state.curContent.patientAge}</p>
                            <p>生日：{this.state.curContent&&this.state.curContent.patientBirthday.substring(0,10)}</p>
                            <p>性别：{this.state.curContent&&this.state.curContent.patientSex}</p>
                            <p>籍贯：{this.state.curContent&&this.state.curContent.patientNative}</p>
                            <p>医保类型：{this.state.curContent&&this.state.curContent.patientInsureName}</p>
                            <p>患者就医类型：{this.state.curContent&&this.state.curContent.treatmentTypeName}</p>
                            <p>就诊卡号：{this.state.curContent&&this.state.curContent.patCardNo}</p>
                            <p>身份证号：{this.state.curContent&&this.state.curContent.patientIdNo}</p>
                            <p>家庭住址：{this.state.curContent&&this.state.curContent.patientAddress}</p>
                        </div>
                        <div className='message'> <img src='./images/jx.png' /><p>监护人信息</p></div>
                        <div className='parentMessages'>
                            <p>姓名：{this.state.curContent&&this.state.curContent.parentName}</p>
                            <p>与患者关系：{this.state.curContent&&this.state.curContent.parentRelation=='2'?'母亲':'父亲'}</p>
                            <p>联系电话：{this.state.curContent&&this.state.curContent.parentPhone}</p>
                        </div>
                        <div className='hospitalMessage'>
                            <div className='message'> <img src='./images/jx.png' /><p>转诊医院信息</p></div>
                            <p>转出医院：{this.state.curContent&&this.state.curContent.hisName}</p>
                            <p>转入医院：{this.state.curContent&&this.state.curContent.hospitalName}</p>
                            <p>转入科室：{this.state.curContent&&this.state.curContent.hospitalDeptName}</p>
                            <p>申请时间：{this.state.curContent&&this.state.curContent.createDate}</p>
                        </div>

                        <div className='hospitalMessage'>
                            <div className='message'> <img src='./images/jx.png' /><p >医生诊断</p></div>
                            <p>{this.state.curContent&&this.state.curContent.diagnosis}</p>
                        </div>

                        <div className='hospitalMessage'>
                            <div className='message'> <img src='./images/jx.png' /><p>检验检查报告</p></div>
                            <div className='report'>
                            {
                                this.state.curContent&&this.state.curContent.reports&&JSON.parse(this.state.curContent.reports).map((item,index)=>{
                                      return(
                                        <div key={index}><p>{item.name}</p> <a href={item.url} target='_blank'>查看</a></div>
                                      )
                                  })
                            }

                            </div>
                        </div>
                        <div className='agreeConsent'>
                            <div className='message'> <img src='./images/jx.png' /><p>知情同意书</p> <a target='_blank'  href={this.state.curContent&&this.state.curContent.consentUrl} >查看</a></div>
                        </div>
                        <div className='hospitalMessage'>
                            <div className='message'> <img src='./images/jx.png' /><p>备注</p></div>
                            <p>{this.state.curContent&&this.state.curContent.remark}</p>
                        </div>
                         
                        {this.state.curContent&&this.state.curContent.status=='1'&&this.state.status!='2'&&<div className='agreeAudit'>
                            <p onClick={this.disagree}>不同意</p>
                            <p onClick={this.showModal}>同意</p>
                        </div>}

                        <Modal
                            title="选择科室医生"
                            visible={this.state.visible1}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >   
                        <div className='agreeDoctor'>
                            <Select
                                showSearch
                                style={{ width: 350,height:40 }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={(value)=>{this.setState({
                                    curDoctor:value
                                })
                                console.log(value)
                               }}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                               {this.props.doctor&&this.props.doctor.length>0&&this.props.doctor.map((item,index)=>{
                                   return( 
                                    <Option key={index} value={item.id}>{item.name}</Option>
                                   )
                               })}
                            </Select>
                            </div>
                        </Modal>
                        <Modal
                            title="请选择不同意转诊理由"
                            visible={this.state.visible2}
                            onOk={this.handleOk1}
                            onCancel={this.handleCancel}
                        >
                           <div className='disagreeReason'>
                             {this.state.reasonList&&this.state.reasonList.length>0&&this.state.reasonList.map((item,index)=>{
                                 return(
                                    <p key={index}><Checkbox checked={item.checked}  onChange={()=>{this.changeReason(item)}}>{item.name}</Checkbox></p>

                                 )

                             })}
                                <p><TextArea value={this.state.reasonTxt} onChange={(e)=>{this.setState({reasonTxt:e.target.value})}}/></p>
                           </div>
                        </Modal>
                        <Modal
                            title="请选择拒绝原因"
                            visible={this.state.visible3}
                            onOk={this.handleOk1}
                            onCancel={this.handleCancel}
                        >
                           <div className='disagreeReason'>
                             {this.state.reasonList&&this.state.reasonList.length>0&&this.state.reasonList.map((item,index)=>{
                                 return(
                                    <p key={index}><Checkbox checked={item.checked}  onChange={()=>{this.changeReason(item)}}>{item.name}</Checkbox></p>
                                 )
                             })}
                                <p><TextArea value={this.state.reasonTxt} onChange={(e)=>{this.setState({reasonTxt:e.target.value})}}/></p>
                           </div>
                        </Modal>
                    </Drawer>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    const { referral } = state
    return {
        ...referral
    }
})(Referral)
