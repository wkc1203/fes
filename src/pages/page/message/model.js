import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'message',
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
          callback(data); // 返回结果
        };
      
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log("page",pathname==='/page/message')
        if (pathname==='/page/message') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['页面统计/模板消息发送量统计']}});// eslint-disable-line
        }
      });
    },
  },
};
