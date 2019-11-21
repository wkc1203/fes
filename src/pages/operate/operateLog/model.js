import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'operateLog',
  state: {
    listData: [],
    detailData:{}
  },
  reducers: {
    save(state, { payload = {} }) {
      return { ...state, ...payload };
    },
    clear() {
      return {};
    },
  },
  effects: {
    *getList({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getList, payload);
      message.destroy();
      console.log(data)
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { listData: data.data || [] }
      });
    },

    *getDetail({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getDetail, payload);
      message.destroy();
        console.log(data)
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { detailData: data.data || {} }
      });
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname ,query}) => {
         console.log(pathname)
        if (pathname === '/operate/operateLog') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['运营管理','操作日志']}});// eslint-disable-line
        }

        

      });
    },
  },
};
