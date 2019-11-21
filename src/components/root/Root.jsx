import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';

import './style.less';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Root extends React.Component {
  // componentWillMount(){
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'root/save',
  //     payload: {chartpadd:['auto',200,'auto','auto']},
  //   });
  // }

  // componentDidMount() {

  //   window.addEventListener('resize', this.resize);
  //   console.log(this.props,11111)

  // }

  // componentWillUnmount() {       
  //   window.removeEventListener('resize',this.resize);
  // }

  // resize=()=>{
  //     console.log(1)
  //     const { dispatch } = this.props;
  //     dispatch({
  //       type: 'root/save',
  //       payload: {chartpadd:'auto'},
  //     });
  //   console.log(this.props,22222)
  // }
  logout=()=>{
    const { dispatch } = this.props;
      dispatch({
        type: 'root/logout',
        payload:{id:sessionStorage.getItem('account_id')}
      });
  }
  

  render() {
    var  roleList=JSON.parse(sessionStorage.role);
    var has=false;
    for(var i=0;i<roleList.length;i++){
        if(roleList[i].url=='/home'){
                has=true;
        }
    }

     console.log(roleList)
    return (
      <div className="common-page">
        <Layout style={{ minHeight: '100%' }}>
          <Sider className="menu-box">
            <div className="logo-box">
              <img src="./images/logo2.png" alt="" />
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={[this.props.location.pathname]}
              defaultOpenKeys={['/'+this.props.location.pathname.split('/')[1]]}
              style={{marginBottom: '16px'}}
            >
            {/* <Menu.Item key='/home' >
                              <a onClick={() => { 
                                 if(has){
                                  if(!!item1.operatePurview&&item1.operatePurview.length>0){
                                    var operate=[];
                                        for(var i=0;i<item1.operatePurview.length;i++){
                                              operate.push(item1.operatePurview[i].code)
                                        }
                                        hashHistory.push({ 
                                         pathname: item1.url,
                                         query:{operate:JSON.stringify(operate)}
                                        }); 
                                }else{
                                 hashHistory.push({ 
                                   pathname: item1.url,
                                   
                                  }); 
                                }
                                
                                  hashHistory.push({ 
                                    pathname: '/home',
                                    query:{has:1,operate:JSON.stringify(operate)}
                                   });
                                 }else{
                                  hashHistory.push({ 
                                    pathname: '/home',
                                    query:{has:0}
                                   });
                                 }
                                 
                              }}>
                                <img src='images/home.png' alt="" />首页
                              </a>
                            </Menu.Item> */}
              {
                 !!roleList&&roleList.length>0&&roleList.map((item,index)=>{
                     var hasChild=!!item.childMenu&&item.childMenu.length>0;
                     console.log("cc",hasChild);
                     if(hasChild){
                        return(
                          <SubMenu   key={item.url} title={<span><img src={item.icon} alt="" />{item.name}</span>}>
                             {!!item.childMenu&&item.childMenu.length>0&&item.childMenu.map((item1,index1)=>{
                              console.log(item1);
                              return(
                                <Menu.Item key={item1.url} >
                                <a onClick={() => { 
                                   if(!!item1.operatePurview&&item1.operatePurview.length>0){
                                       var operate=[];
                                           for(var i=0;i<item1.operatePurview.length;i++){
                                                 operate.push(item1.operatePurview[i].code)
                                           }
                                           hashHistory.push({ 
                                            pathname: item1.url,
                                            query:{has:has?1:0,operate:JSON.stringify(operate)}
                                           }); 
                                   }else{
                                    hashHistory.push({ 
                                      pathname: item1.url,
                                      query:{has:has?1:0,operate:JSON.stringify(operate)}
                                      
                                     }); 
                                   }
                                }}>
                                  {item1.name}
                                </a>
                              </Menu.Item>
                               )
                             })
                             }
                        </SubMenu>
                       )
                     }else if(!hasChild){
                      return(
                        <Menu.Item key={item.url} >
                              <a onClick={() => { 
                                if(!!item.operatePurview&&item.operatePurview.length>0){
                                  var operate=[];
                                      for(var i=0;i<item.operatePurview.length;i++){
                                            operate.push(item.operatePurview[i].code)
                                      }
                                      hashHistory.push({ 
                                       pathname: item.url,
                                       query:{has:has?1:0,operate:JSON.stringify(operate)}
                                      }); 
                              }else{
                               hashHistory.push({ 
                                 pathname: item.url,
                                 query:{has:has?1:0,operate:JSON.stringify(operate)}
                                }); 
                              }
                              }}>
                                <img src={item.icon} alt="" />{item.name}
                              </a>
                          </Menu.Item>
                      )
                     }
                }) 
              }
              {/* Data analysis */}

            </Menu>
          </Sider>
          <Layout>
            <Header className="root-header">
              <Breadcrumb>
                {this.props.breadcrumb.map(breadcrumb =>
                  <Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>)}
              </Breadcrumb>
              <div className="nav-box">
                <img
                  className="headImage"
                  src="http://shp.qpic.cn/bizmp/TzGM3GFqey52EnnOl7OEepA1bUxe1gRQdsMia1hqfOtpk5w8wKstic1g/" alt=""
                />
                <span>{sessionStorage.getItem('account')?sessionStorage.getItem('account'):''}</span>
                {sessionStorage.getItem('account')?
                <span style={{color: '#108ee9',cursor:'pointer'}} onClick={this.logout}>退出</span>
                :''}
              </div>
            </Header>
            <Content style={{ padding: '24px'}}>
              {this.props.children}
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>
              <div>Copyright © 2014-2017 All Rights Reserved 广州海鹚网络科技有限公司</div>
              <div>粤公网安备 44010602000461号</div>
            </Footer> */}
          </Layout>
        </Layout>
      </div>
    );
  }
}

function mapState(state) {
  const { root } = state;
  return {
    ...root,
  };
}

export default connect(mapState)(Root);
