import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'allanalysis',
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
        if (pathname === '/dataanalysis/allanalysis') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['数据分析','概览']}});// eslint-disable-line
        }
      });
    },
  },
};
