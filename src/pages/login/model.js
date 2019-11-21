import { message } from 'antd';
import { hashHistory } from 'dva/router';
import * as service from './service';

export default {
  namespace: 'login',
  state: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {  
      return {};
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.login, payload);
      message.destroy();
      
      if (data.code === 0) {
       
       
          if(data.data[1].length<0){
            message.error('暂无访问权限！', 2);
          }else{
            sessionStorage.setItem('hisId', data.data[0].hisId);// eslint-disable-line
            sessionStorage.setItem('platformId', data.data[0].hisId);// eslint-disable-line
            sessionStorage.setItem('doctor', JSON.stringify(data.data[0]));// eslint-disable-line
             sessionStorage.setItem('role', JSON.stringify(data.data[1]));// eslint-disable-line
             sessionStorage.setItem('loginInfo', JSON.stringify(data.data));// eslint-disable-line
            if(data.data[0].userFlag=='5'){
              yield put({
                type: 'nurseInfo',
                payload: {
                  doctorId:data.data[0].account,
                  hisId: sessionStorage.getItem('hisId'),
                }
                
            })}else{
              yield put({ type: 'query' });
            }
          }
       
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *getcode({ payload ,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getCode, payload);
      message.destroy();
      console.log("data",data);
      // console.log(data)
      if (data.code === 0) {
        message.info(data.msg, 2);
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        }
        // yield put({
        //   type: 'list',
        //   payload: {
        //     beginTime: formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))),
        //     endTime: formatDate(new Date()),
        //   },
        // });
      } else {
        message.error(data.msg, 2);
      }
    },
    *getPhone({ payload ,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getPhone, payload);
      message.destroy();
      console.log("data",data);
      // console.log(data)
      if (data.code === 0) {
        message.info(data.msg, 2);
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        }
        // yield put({
        //   type: 'list',
        //   payload: {
        //     beginTime: formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))),
        //     endTime: formatDate(new Date()),
        //   },
        // });
      } else {
        message.error(data.msg, 2);
      }
    },
    *checkcode({ payload ,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.checkCode, payload);
      message.destroy();
      console.log("data",data);
      // console.log(data)
      if (data.code === 0) {
        message.info(data.msg, 2);
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        }
        // yield put({
        //   type: 'list',
        //   payload: {
        //     beginTime: formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))),
        //     endTime: formatDate(new Date()),
        //   },
        // });
      } else {
        message.error(data.msg, 2);
      }
    },
    *query({ payload }, { call }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.query, payload);
      console.log("data",sessionStorage.getItem('hisId'));
      message.destroy();
      if (data.code === 0) {
        
        sessionStorage.setItem('hisName', data.data.hisName);// eslint-disable-line
        sessionStorage.setItem('name', data.data.name);// eslint-disable-line
        sessionStorage.setItem('account', data.data.account);// eslint-disable-line
        sessionStorage.setItem('phone', data.data.phone||"");// eslint-disable-line
        sessionStorage.setItem('account_id', data.data.id);// eslint-disable-line
        sessionStorage.setItem('flag', data.data.userFlag=='4'?true:false);// eslint-disable-line
        var  roleList=JSON.parse(sessionStorage.role);
        var has=false;
        var operate=[];
        for(var i=0;i<roleList.length;i++){
          if(roleList[i].url=='/home'){
                  has=true;
                  console.log("roleList[i]",roleList[i])
                  if(!!roleList[i].operatePurview&&roleList[i].operatePurview.length>0){
                        for(var j=0;j<roleList[i].operatePurview.length;j++){
                              console.log(roleList[i].operatePurview[j])
                              operate.push(roleList[i].operatePurview[j].code)
                        } 
                }
          }
         }
        if(has){
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
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    
    *nurseInfo({ payload }, { call }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.nurseInfo, payload);
      console.log("data",sessionStorage.getItem('hisId'));
      message.destroy();
      if (data.code === 0) {
        
        sessionStorage.setItem('hisName', data.data.hisName);// eslint-disable-line
        sessionStorage.setItem('name', data.data.name);// eslint-disable-line
        sessionStorage.setItem('account', data.data.doctorId);// eslint-disable-line
        sessionStorage.setItem('phone', data.data.phone||"");// eslint-disable-line
        sessionStorage.setItem('account_id', data.data.id);// eslint-disable-line
        sessionStorage.setItem('nurseInfo', JSON.stringify(data.data));// eslint-disable-line
        sessionStorage.setItem('flag', false);// eslint-disable-line
        var  roleList=JSON.parse(sessionStorage.role);
        var has=false;
        for(var i=0;i<roleList.length;i++){
          if(roleList[i].url=='/home'){
                  has=true;
          }
         }
        if(has){
          hashHistory.push({ 
            pathname: '/home',
            query:{has:1}
          });
        }else{
          hashHistory.push({ 
            pathname: '/home',
            query:{has:0}
          });
        }
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
  },
};
