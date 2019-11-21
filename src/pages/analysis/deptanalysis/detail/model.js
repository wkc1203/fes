import { message } from 'antd';
import * as service from '../service';

export default {
  namespace: 'deptanalysisdetil',
  state: {
    chartdata:{}
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

    *getdeptanalysisstatisticsde({ payload,callback }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getdeptanalysisstatistics, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
          if (callback && typeof callback === 'function') {
            callback(data.data); // 返回结果
          }
      } else {
        message.error(data.msg, 2);
      }
    },

    *getinquirytypestatistics({ payload,callback }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getinquirytypestatistics, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
          if (callback && typeof callback === 'function') {
            callback(data.data); // 返回结果
          }
      } else {
        message.error(data.msg, 2);
      }
    },

    // getinquirytotalstatistics

    *getinquirytotalstatistics({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getinquirytotalstatistics, payload);
      message.destroy();
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      // console.log(data)
      yield put({
        type: 'save',
        payload: {chartdata: data.data || {} },
      });
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,query }) => {
        if (pathname === '/dataanalysis/deptanalysis/detail') {
          // console.log(query)
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['数据分析','科室分析','科室详情']}});// eslint-disable-line
          dispatch({ type: 'getdeptanalysisstatistics', payload: query });
        }
      });
    },
  },
};
