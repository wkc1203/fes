import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'flowUpData',
  state: {
    inquirytotal:{},
    inquirytype:{},
    inquirygoal:{},
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return {
      };
    },
  },
  effects: {
    *getinquirytotalstatistics({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getinquirytotalstatistics, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            inquirytotal: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },
    *getfollowCompleteStatistics({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getfollowCompleteStatistics, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            completetotal: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },
    *getDept({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getDept, payload);
      message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            deptList: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
  
    *getinquirytypestatistics({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getinquirytypestatistics, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            inquirytype: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },
    *getinquirygoalstatistics({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getinquirygoalstatistics, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            inquirygoal: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/flowUpData') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['随访数据分析']}});// eslint-disable-line
        }
      });
    },
  },
};
