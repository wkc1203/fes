import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'operateStatistics',
  state: {
    userData: [],//用户统计
    inquiryData: [],//咨询问题
    apprData: [],//用户满意度
    profitData: [],//每日收益
    listDeptsData: [],//科室统计
    listData:{},
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
      const { data = {} } = yield call(service.getReceptionData, payload);
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { listData: data.data || {} }
      });
    },
    *getDeptsList({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getDeptsData, payload);
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { listDeptsData: data.data || {} }
      });
    },
    *getUserData({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getUserData, payload);
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { userData: data.data || [] }
      });
    },
    *getInquiryData({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getInquiryData, payload);
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { inquiryData: data.data || [] }
      });
    },
    *getApprData({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getApprData, payload);
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { apprData: data.data || [] }
      });
    },
    *getProfitData({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getProfitData, payload);
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { profitData: data.data || [] }
      });
    },
  *getInquiryPurposeData({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getInquiryPurposeData, payload);
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { inquiryPurposeData: data.data || [] }
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/operate/statistics') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['运营管理','数据统计']}});// eslint-disable-line
        }
      });
    },
  },
};
