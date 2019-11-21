import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'account',
  state: {
    showModal: false,
    depts: [],
    detail: {},
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return {};
    },
    changeDet(state, {payload}) {
      return {...state, detail: {...state.detail, ...payload}};
    },
  },
  effects: {
    *list({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      const { data } = yield call(service.list, payload);
      // message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            data: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *getAllMenuOperate({ payload,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getAllMenuOperate, payload);
      message.destroy();
      if (data.code === 0) {
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        };
      
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    
    *getDetail({ payload,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.detail, payload);
      message.destroy();
      if (data.code === 0) {
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        };
        yield put({
          type: 'save',
          payload: {
            detail: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *update({ payload,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.update, payload);
      message.destroy();
      if (data.code === 0) {
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        };
      
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *add({ payload,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.add, payload);
      console.log("dda1",data)
      message.destroy();
      console.log("dda",data)
      if (data.code === 0) {
       
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        };
      
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *addRole({ payload,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.addRole, payload);
      console.log("dda1",data)
      message.destroy();
      console.log("dda",data)
      if (data.code === 0) {
       
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        };
      
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *getRole({ payload,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getRole, payload);
      console.log("dda1",data)
      message.destroy();
      console.log("dda",data)
      if (data.code === 0) {
       
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        };
      
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *action({ payload }, { call, put }) {
      message.loading('loading...', 0);

      const { data } = yield call(service.action, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({
          type: 'list',
          payload: {
            hisId: sessionStorage.getItem('hisId'),
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *reset({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.reset, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({
          type: 'list',
          payload: {
            hisId: sessionStorage.getItem('hisId'),
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    
    
   
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/account/list') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['账号管理']}});
          dispatch({ type: '/account/list', payload: {hisId: sessionStorage.getItem('hisId')} });
        }
      });
    },
  },
};
