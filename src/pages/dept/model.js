import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'dept',
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
    *depts({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      const { data } = yield call(service.depts, payload);
      // message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            depts: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *detail({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.detail, payload);
      message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            detail: data.data[0],
          },
        });
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
    *add({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.add, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({
          type: 'save',
          payload: {showModal: false, detail: {}},
        });
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
    *update({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.update, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({
          type: 'save',
          payload: {showModal: false, detail: {}},
        });
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
        if (pathname === '/dept') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['科室管理']}});
          dispatch({ type: 'list', payload: {hisId: sessionStorage.getItem('hisId')} });
          dispatch({ type: 'depts', payload: {hisId: sessionStorage.getItem('hisId')} });
        }
      });
    },
  },
};
