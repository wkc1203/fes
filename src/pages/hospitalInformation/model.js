import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'information',
  state: {
     detail: {},
     sign:[],
     hospitalInformation:{}
    },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    changeDet(state, {payload}) {
      return {...state, hospitalInformation: {...state.hospitalInformation, ...payload}};
    },
  },
  effects: {
    *add({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.add, payload);
      message.destroy();
      if(data.code==0){
        message.info('添加成功')
        yield put({
          type: 'getHoi',
          payload: {
            hisId:sessionStorage.getItem("hisId")
          },
        });
      }else{
        message.error(data.msg,2)
      }
    },
    
    *sign({ payload }, { call, put }) {
      const { data } = yield call(service.sign, payload);
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            sign: data.data,
          },
        });
      }
    },
    
    *getHoi({ payload }, { call, put }) {
      const { data } = yield call(service.getHoi, payload);
      console.log(data,'ssa321')     
      if (data.code === 0) {
        yield put({
          type: 'save', 
          payload: {
            hospitalInformation:data.data,
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hospitalInformation') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'information/sign', payload: {bucket: 'ihoss',dir: "PIC"}});// eslint-disable-line          
          dispatch({type: 'information/getHoi', payload: {hisId:sessionStorage.getItem("hisId")}});// eslint-disable-line          
          dispatch({type: 'root/save', payload: {breadcrumb: ['医院信息']}});// eslint-disable-line
        }
      });
    },
  },
};
