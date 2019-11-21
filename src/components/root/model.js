import { message } from 'antd';
import { hashHistory } from 'dva/router';
import * as service from './service';

export default {
  namespace: 'root',
  state: {
    breadcrumb: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return {
        breadcrumb: [],
        loginData: {},
      };
    },
  },
  effects: {
    *authority({ payload }, { call, put }) {
      put({
        type: 'clear',
        payload: {},
      });
      message.loading('loading...', 0);
      const { data } = yield call(service.authority, payload);
      message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            viewData: data,
          },
        });
      } else {
        message.error(data.msg, 3);
      }
    },
    *logout({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.logout, payload);
      message.destroy();
      sessionStorage.setItem('hisId', '');
      sessionStorage.setItem('hisName', '');
      sessionStorage.setItem('name', '');
      sessionStorage.setItem('account', '');
      sessionStorage.setItem('account_id', '');
      sessionStorage.setItem('flag', false);
      if (data.code === 0) {
        yield put({
          type: 'clear',
          payload: {},
        });
        hashHistory.push({pathname: '/login'});
      } else {
        hashHistory.push({pathname: '/login'});
      }
    },
  },
};
