import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'visitanalysis',
  state: {
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
   
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/dataanalysis/visitanalysis') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['数据分析','访问分析']}});// eslint-disable-line
        }
      });
    },
  },
};
