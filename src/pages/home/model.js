import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'home',
  state: {
    totalnum:{},//用户数量统计
    userData: {},//用户图表统计
    inquiryData: [],//咨询问题
    UserSatisfaction: {},//用户满意度
    profitData: [],//每日收益
    listDeptsData: [],//科室统计
    qrcode:{},//二维码
  },
  reducers: {
    save(state, { payload = {} }) {
      return { ...state, ...payload };
    },
    clear() {
      return {};
    },

    
  },
  effects: {

    *getTotalNum({payload,callback},{call,put}){
      message.loading();
      const { data={} } = yield call(service.getTotalNum,payload);
      message.destroy();

      // console.log(data)
      if(data.code !=0){
        message.error(data.msg,2);
        return
      }else{
        if (callback && typeof callback === 'function') {
          callback(data.data); // 返回结果
        }
      }
    },


    *getUserChart({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getUserChart, payload);
      // console.log(data,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { userData: data.data || {} }
      });
    },


    *getUserSatisfaction({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getUserSatisfaction, payload);
      // console.log(data,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { UserSatisfaction: data.data || {} }
      });
    },


    *getConsultationObj({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getConsultationObj, payload);
      // console.log(data,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { ConsultationObj: data.data || {} }
      });
    },
    

    *getConsultationAques({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getConsultationAques, payload);
      // console.log(data,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { ConsultationAques: data.data || {} }
      });
    },
    *getQr({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getQr, payload);
       console.log(payload,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      console.log("d",data)
      yield put({
        type: 'save',
        payload: { qrcode: data.data || {} }
      });
    },

    *getDailyincomeStatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getDailyincomeStatistics, payload);
      // console.log(data,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { DailyincomeStatistics: data.data || {} }
      });
    },

    *getkeyindicatorsstatistics({ payload,callback }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getkeyindicatorsstatistics, payload);
      message.destroy();

      // console.log(data,'getkeyindicatorsstatistics')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }else{
        if (callback && typeof callback === 'function') {
          callback(data.data); // 返回结果
        }
      }
    },

    *getintelliwarnstatistics({ payload,callback }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getintelliwarnstatistics, payload);
      message.destroy();
      // console.log(data,'getintelliwarnstatistics')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }else{
        if (callback && typeof callback === 'function') {
          callback(data.data); // 返回结果
        }
      }
    },


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/home') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['首页']}});// eslint-disable-line
        }
      });
    },
  },
};
