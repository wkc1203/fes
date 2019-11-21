import { message } from 'antd';
import * as service from './service';
import { formatDate } from '../../../utils/utils';

export default {
  namespace: 'team',
  state: {
    detaildata:{}
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
    *add({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.add, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        message.success(data.msg, 2);
        yield put({
          type: 'getOrderList',
          payload: {
            hisId:sessionStorage.getItem('hisId'),
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },
    *update({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.update, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        message.success(data.msg, 2);
        yield put({
          type: 'getOrderList',
          payload: {
            hisId:sessionStorage.getItem('hisId'),
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },
    *del({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.del, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        message.success(data.msg, 2);
        yield put({
          type: 'getOrderList',
          payload: {
            hisId:sessionStorage.getItem('hisId'),
          },
        });
      } else {
        message.error(data.msg, 2);
      }
    },
    *deptList({ payload,callback }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.deptList, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        if (callback && typeof callback === 'function') {
          yield put({
            type: 'save',
            payload: {
              dept:data.data,
            },
          });
          callback(data.data); // 返回结果
        };
      } else {
        message.error(data.msg, 2);
      }
    },
    *docList({ payload ,callback}, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.docList, payload);
      message.destroy();
      // console.log(data)
      if (data.code === 0) {
        if (callback && typeof callback === 'function') {
          callback(data.data); // 返回结果
        };
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
            detaildata: data.data[0],
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *teamDetail({ payload1 }, { call, put }) {
      message.loading('loading...', 0);
      console.log(payload1)
      const { data } = yield call(service.teamDetail, payload1);
      message.destroy();
       console.log(data,'detail')
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            teamdetail: data.data,
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
        if (pathname === '/mdt/team') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['会诊管理', '专家团队']}});// eslint-disable-line
          // dispatch({
          //   type: 'getOrderList',
          //   payload: {
          //     hisId:sessionStorage.getItem('hisId'),
          //     pageNum,
          //     numPerPage:10,
          //     orderId: this.state.searchId, 
          //     startDate: this.state.startDate?this.state.startDate+ ' 00:00:00':'',
          //     endDate: this.state.endDate?this.state.endDate+ ' 23:59:59':'',
          //     sort:'DESC',
          //     orderBy:'createTime',
          //     type:this.state.ordertype || '',
          //     orderStatus:'R'
          //   },
          // });
        }
      });
    },
  },
};
