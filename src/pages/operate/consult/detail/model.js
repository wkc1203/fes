import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'operateConsultDtl',
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
      message.destroy();
        // console.log(data)
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { detailData: data.data || {} }
      });
    },
    *getDetailById({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getDetailById, payload);
      message.destroy();
        // console.log(data)
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
