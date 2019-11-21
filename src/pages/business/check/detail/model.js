import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'check',
  state: {
    detailData: {},
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
    *getDetail({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getDetail, payload);
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
};
