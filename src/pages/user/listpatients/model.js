import { message } from 'antd';
import * as service from './service';
import { formatDate } from '../../../utils/utils';

export default {
  namespace: 'ListPatients',
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
    *PatientsList({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.PatientsList, payload);
      message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            PatientsList: data.data,
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
        if (pathname === '/user/listpatients') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['用户管理','就诊人列表']}});// eslint-disable-line
          // dispatch({
          //   type: 'list',
          //   payload: {
          //     startTime: formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))),
          //     endTime: formatDate(new Date()),
          //   },
          // });
        }
      });
    },
  },
};
