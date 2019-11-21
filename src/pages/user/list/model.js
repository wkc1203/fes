import { message } from 'antd';
import * as service from './service';
// import { formatDate } from '../../utils/utils';

export default {
  namespace: 'userList',
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
    *RegisterList({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.RegisterList, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            RegisterList: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },

    *TieCardList({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.TieCardList, payload);
      message.destroy();
      // console.log(data)

      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            TieCardList: data.data,
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
        console.log("pathanme2",pathname)
        if (pathname === '/user/list') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['用户管理','用户列表']}});// eslint-disable-line
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
