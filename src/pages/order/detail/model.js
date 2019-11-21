import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'ordDet',
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
    *detail({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.detail, payload);
      message.destroy();
      // console.log(data,'detail')
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
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/order/detail') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['订单管理', '订单详情']}});// eslint-disable-line
          dispatch({ type: 'detail', payload: {orderId:query.orderId,hisId: sessionStorage.getItem('hisId')} });
        }
      });
    },
  },
};
