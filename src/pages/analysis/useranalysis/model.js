import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'userAnalysis',
  state: {

      RegisterData1:{},
      RegisterData2:{},

      BingCardData1:{},
      BingCardData2:{},

      AllUserProvince:{},
      UserProvince:{},
      UserCity:{},
      UserSex:{},
      UserAge:{},

      AllPatientProvince:{},
      PatientProvince:{},
      PatientCity:{},
      PatientSex:{},
      PatientAge:{},

      
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
    
    *getaccountnumstatistics({payload,callback},{call,put}){
      message.loading();
      const { data={} } = yield call(service.getaccountnumstatistics,payload);
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

    *getaccountanalysisstatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getaccountanalysisstatistics, payload);
      // console.log(data,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { RegisterData1: data.data || {} }
      });
    },

    *getnewusernumstatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getnewusernumstatistics, payload);
      // console.log(data,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { RegisterData2: data.data || {} }
      });
    },

    //-----绑卡-----
    *getbindusernumstatistics({payload,callback},{call,put}){
      message.loading();
      const { data={} } = yield call(service.getbindusernumstatistics,payload);
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

    *getbinduseranalysisstatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getbinduseranalysisstatistics, payload);
      // console.log(data,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { BingCardData1: data.data || {} }
      });
    },

    *getnewbindusernumstatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getnewbindusernumstatistics, payload);
      // console.log(data,'model')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { BingCardData2: data.data || {} }
      });
    },

    //用户属性--省份
    *getaccountprovincestatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getaccountprovincestatistics, payload);
      // console.log(data,'province')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }

      // console.log(payload)
      if(payload.numPerPage===50){
        yield put({
          type: 'save',
          payload: { AllUserProvince: data.data || {} }
        });
      }else{
        yield put({
          type: 'save',
          payload: { UserProvince: data.data || {} }
        });
      }
    },

    //用户属性--城市
    *getaccountcitystatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getaccountcitystatistics, payload);
      // console.log(data,'city')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { UserCity: data.data || {} }
      });
    },

    //用户属性--性别
    *getaccountsexstatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getaccountsexstatistics, payload);
      // console.log(data,'xx')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { UserSex: data.data || {} }
      });
    },

    //用户属性--年龄
    *getaccountagestatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getaccountagestatistics, payload);
      // console.log(data,'aa')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { UserAge: data.data || {} }
      });
    },

    // ------------
    //就诊人属性--省份
    *getpatientprovincestatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getpatientprovincestatistics, payload);
      // console.log(data,'province')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }

      // console.log(payload)
      if(payload.numPerPage===50){
        yield put({
          type: 'save',
          payload: { AllPatientProvince: data.data || {} }
        });
      }else{
        yield put({
          type: 'save',
          payload: { PatientProvince: data.data || {} }
        });
      }
    },

    //就诊人属性--城市
    *getpatientcitystatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getpatientcitystatistics, payload);
      // console.log(data,'city')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { PatientCity: data.data || {} }
      });
    },

    //就诊人属性--性别
    *getpatientsexstatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getpatientsexstatistics, payload);
      // console.log(data,'xx')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { PatientSex: data.data || {} }
      });
    },

    //就诊人属性--年龄
    *getpatientagestatistics({ payload }, { call, put }) {
      // message.loading();
      const { data = {} } = yield call(service.getpatientagestatistics, payload);
      // console.log(data,'aa')
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { PatientAge: data.data || {} }
      });
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/dataanalysis/useranalysis') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['用户分析']}});// eslint-disable-line
        }
      });
    },
  },
};
