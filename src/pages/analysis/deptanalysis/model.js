import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'deptanalysis',
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

    *getdeptanalysisstatistics({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getdeptanalysisstatistics, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            listData: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/dataanalysis/deptanalysis') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['数据分析','科室分析']}});// eslint-disable-line
        }
      });
    },
  },
};
