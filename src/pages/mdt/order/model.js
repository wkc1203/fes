import { message } from 'antd';
import * as service from './service';
import { formatDate } from '../../../utils/utils';

export default {
  namespace: 'order',
  state: {
    codeStatus:'',
    detaildata:'',
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return {};
    },
  },
  effects: {

    *refund({ payload ,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.refund, payload);
      message.destroy();
      if (data.code === 0) {
        message.info(data.msg, 2);
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        }
        // yield put({
        //   type: 'list',
        //   payload: {
        //     beginTime: formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))),
        //     endTime: formatDate(new Date()),
        //   },
        // });
      } else {
        message.error(data.msg, 2);
      }
    },
    *detail({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.detail, payload);
      message.destroy();
       console.log(data,'detail')
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            detaildata: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },

    *getOrderList({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getOrderList, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            data: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },
    *getcode({ payload ,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getCode, payload);
      message.destroy();
      console.log("data",data);
      // console.log(data)
      if (data.code === 0) {
        message.info(data.msg, 2);
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        }
        // yield put({
        //   type: 'list',
        //   payload: {
        //     beginTime: formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))),
        //     endTime: formatDate(new Date()),
        //   },
        // });
      } else {
        message.error(data.msg, 2);
      }
    },
    *checkcode({ payload ,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.checkCode, payload);
      message.destroy();
      console.log("data",data);
      // console.log(data)
      if (data.code === 0) {
        message.info(data.msg, 2);
        if (callback && typeof callback === 'function') {
          callback(data); // 返回结果
        }
        // yield put({
        //   type: 'list',
        //   payload: {
        //     beginTime: formatDate(new Date(new Date() - (15 * 24 * 60 * 60 * 1000))),
        //     endTime: formatDate(new Date()),
        //   },
        // });
      } else {
        message.error(data.msg, 2);
      }
    },
    *comingOvertimeList({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.comingOvertimeList, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            data: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,query }) => {
        console.log(pathname)
        if (pathname === '/mdt/order') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['会诊管理', '会诊订单']}});// eslint-disable-line
          dispatch({
            type: 'getOrderList',
            payload: {
              hisId:sessionStorage.getItem('hisId'),
              pageNum:1,
              numPerPage:10,
              doctorRoomIdList:'',
              timeSort:'',
            },
          });
        } 
      })
  }
  }
}
