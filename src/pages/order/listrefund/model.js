import { message } from 'antd';
import * as service from './service';
import { formatDate } from '../../../utils/utils';

export default {
  namespace: 'ordListRefund',
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

    *getexcel({ payload }, { call, put }) {
      

      message.loading('loading...', 0);
      const { data } = yield call(service.getexcel, payload);
      message.destroy();
       console.log(data,'getexcel')
      if (data.code === 0) {
        message.success('导出成功', 3);
        // yield put({
        //   type: 'save',
        //   payload: {
        //     detaildata: data.data,
        //   },
        // });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/order/listrefund') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['订单管理', '退款列表']}});// eslint-disable-line
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
