import { message } from 'antd';
import * as service from './service';


export default {
  namespace: 'operateComplaintLst',
  state: {
    listData: {},
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
      // console.log(data)
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { listData: data.data || {} }
      });
    },

    *Handling({ payload ,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.Handling, payload);
      message.destroy();
      if (data.code === 0) {
        message.info(data.msg, 2);
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        }
        // yield put({
        //   type: 'getList',
        //   payload: {
        //     hisId:sessionStorage.getItem('hisId'),
        //     platformId:sessionStorage.getItem('hisId'),
        //     orderBy: 'create_time',
        //     sort: 'desc',
        //   },
        // });
      } else {
        message.error(data.msg, 2);
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/operate/complaint/list') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['运营管理','投诉管理']}});// eslint-disable-line
        }
      });
    },
  },
};
