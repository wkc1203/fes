import React from 'react';
import { connect } from 'dva';
import { Layout, Button, message,Select } from 'antd';
import { hashHistory } from 'dva/router';

import './style.less';

const { Header, Footer, Content } = Layout;
const Option = Select.Option;
class Login extends React.Component {
  state = {
    username: '',
    password: '',
    isSendValidate:true,
    leftTime:'',
    valicode:'',
    phone:'',
    hisList:[],
    hisId:'',
  }
  getCode(){
    const { dispatch } = this.props;
    console.log("st",this.state.phone);
    const { username, password} = this.state;
    if (username && password) {
      dispatch({
        type: 'login/getPhone',
        payload: {phone:username},
        callback:(res)=>{
          console.log("props",this.props)
          if(res.code==0){
            
           if(res.data.length>0){
                if(res.data.length>1){
                  this.setState({
                    hisList:res.data,
                    hisId:res.data[0].hisId,
                    })
                }else{
                  this.setState({
                    hisId:res.data[0].hisId,
                })
              }
              dispatch({
                type: 'login/getcode',
                payload: {phone: username, type:'login'},
                callback:(res)=>{
                  console.log(res)
                  if(res.code==0){
                    this.setState({
                      leftTime:120,
                      isSendValidate:false,
                  })
                   this.clock();
                  }
              }
              });
             
             
           }else{
            message.warning('该手机号暂未登记！', 2);
           }
          }
      }
      });
    }else{
      message.warning('请输入账号与密码！', 2);
    }
  }
  checkCode= () => {
    console.log("s",this)
    const { dispatch } = this.props;
    const { username, password} = this.state;
    console.log(this.props)
    if (username && password) {
      //this.login();
           if(this.state.valicode){
          dispatch({
            type: 'login/checkcode',
            payload: {phone: username, validateCode:this.state.valicode,type:'login',},
            callback:(res)=>{
              console.log("res",res)
              if(res.code==0){
                this.login();
              }
          }
          });
         }else{
          message.warning('请输入验证码', 2);
         } 
         
       
    } else {
      message.warning('请输入账号与密码', 2);
    }
    
   
  }
   /**
     * 倒计时
     */
    clock() {
      var clockTimer = setTimeout(() => {
          var leftTime1 = this.state.leftTime;
          --leftTime1;
          this.setState({
              leftTime: leftTime1
          })
          if (leftTime1 <= 0) {
           // 查询超时，跳转详情页面
              this.setState({
                  isSendValidate: true,
              })
          } else {
              this.setState({
                  leftTime: leftTime1
              })
              this.clock();
          }
      }, 1000);
  }
  login = () => {
    const { username, password,phone,hisId} = this.state;
    const { dispatch } = this.props;
   
        dispatch({
          type: 'login/login',
          payload: {username,password,phone:username,hisId:hisId},
        });
        clearInterval(this.state.checkInterval);
  }
  
  render() {
    return (
      <div className="page-login" >
        <Layout style={{ height: '100%', display: 'block' }}>
          <Header><img src="./images/logo.png" alt="" /></Header>
          <Layout className="my-body">
            <Content>
              <div className="logo-box">
                <div className="title">欢迎使用互联网医院！</div>
                <div className="input-box">
                  <p className="tip">手机号码</p>
                  <input type="text" maxLength='11' placeholder="请输入您的账号" onChange={e => this.setState({username: e.target.value})} />
                  <p className="tip">密码</p>
                  <input 
                    type="password" placeholder="请输入您的密码" onChange={e => this.setState({password: e.target.value})}
                  />
                  <p className="tip">验证码</p>
                  <input
                    type="text" placeholder="请输入验证码" onChange={e => this.setState({valicode: e.target.value})}
                  />
                    {this.state.isSendValidate&&<span onClick={()=>{ 
                      this.getCode();
                }} className='send'>获取验证码</span>
                }
                {this.state.hisList&&this.state.hisList.length>0&&<p className="tip">医院选择</p>}
                {this.state.hisList&&this.state.hisList.length>0&&<Select
                size="large"
                style={{width: '220px',display:'block'}}
                placeholder="请选择医院"
                value={this.state.hisId}
                onChange={value => this.setState({hisId: value})}
              >
                {this.state.hisList&&this.state.hisList.length>0&&this.state.hisList.map(his => <Option value={his.hisId} key={his.id}>
                  {his.hisId=='-2'?'凯桥互联网医院':''}
                  {his.hisId=='2214'?'儿童医院':''}
                  {his.hisId=='2215'?'凯桥医疗科技':''}
                  </Option>)}
              </Select>}
                {!this.state.isSendValidate&&<span className='send'>{this.state.leftTime} s 后重试</span>}
                  <p style={{marginTop:'20px'}}> 忘记密码？请联系管理员进行重置操作</p>
                </div>
                <Button className="login-btn" type="primary" size="large" 
                onClick={()=>{ 
                this.checkCode();
               
            }}
                >登录</Button>
              </div>
            </Content>
            <Footer>
              <p><span>帮助</span><span>隐私</span><span>条款</span><span>Copyright © 2019 重庆凯桥医疗科技有限公司</span></p>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default connect((state) => {
  const { login } = state;
  return {...login};
})(Login);
