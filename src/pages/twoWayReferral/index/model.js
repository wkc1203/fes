
import { message } from 'antd';
import * as service from './service';
export default {
    namespace: 'index',
    state:{},
    reducers: {
      save(state, { payload }) {
        return { ...state, ...payload };
      },
      clear() {
        return {};
      },
    },
    effects:{
      *dept({ payload }, { call, put }) {
        message.loading('loading...', 0);
        const { data } = yield call(service.dept, payload);
        console.log(data,'dadasd')
        message.destroy();
        if (data.code === 0) {
          console.log('ccc',data.data)
          yield put({
            type: 'save',
            payload: {
              dept: data.data,
            },
          });
        }
      },
      *getApply({ payload }, { call, put }) {
        // message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
  
        const { data } = yield call(service.getApply, payload);
        if (data.code === 0) {
          console.log('ccc',data.data)
          yield put({
            type: 'save',
            payload: {
              applydata: data.data,
            },
          });
        }
      },
      *getApply2({ payload }, { call, put }) {
        // message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
  
        const { data } = yield call(service.getApply, payload);
        if (data.code === 0) {
          console.log('ccc',data.data)
          yield put({
            type: 'save',
            payload: {
              applydata1: data.data,
            },
          });
        }
      },
      *getSpeed({ payload }, { call, put }) {
        // message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
  
        const { data } = yield call(service.getSpeed, payload);
        if (data.code === 0) {
          console.log('ccc',data.data)
          yield put({
            type: 'save',
            payload: {
              speeddata: data.data,
            },
          });
        }
      },
      *getSurvey({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      payload.hisId=sessionStorage.getItem('hisId')

      const { data } = yield call(service.getSurvey, payload);
      if (data.code === 0) {
        console.log('ccc',data.data)
        yield put({
          type: 'save',
          payload: {
            data: data.data,
          },
        });
      }
    },

    
    },
    
    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname,query }) => {
            if (pathname === '/twoWayReferral/index') {
              const position = sessionStorage.getItem('position');// eslint-disable-line
              dispatch({type: 'root/save', payload: {breadcrumb: ['转诊管理', '首页']}});// eslint-disable-line
            }
          });
        },
      },
}