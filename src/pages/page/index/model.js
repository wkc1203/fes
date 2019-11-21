import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'index',
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
    *list({ payload,callback }, { call, put }) {
      // message.loading('loading...', 0);
      const { data } = yield call(service.list, payload);
      // message.destroy();
     // message.destroy();
      if (data.code === 0) {
        if (callback && typeof callback === 'function') {
          callback(data); //返回结果
        };
      
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
       
      return history.listen(({ pathname }) => {
        console.log("page",pathname)
        if (pathname === '/page/index') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['页面统计/按钮数据统计']}});// eslint-disable-line
        }
      });
    },
  },
};
