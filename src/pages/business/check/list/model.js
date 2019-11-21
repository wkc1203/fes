import { message } from 'antd';
import * as service from './service';
import { formatDate } from '../../../../utils/utils';

export default {
  namespace: 'checklist',
  state: {
    checkList:[]

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
        message.info(data.data, 2);
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

    *getCheckOrderList({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.getCheckOrderList, payload);
      message.destroy();
       console.log("hh",data.data)
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            
            checkList: data.data,
          },
        });  
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
        
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['医疗业务管理', '检查单管理']}});// eslint-disable-line
          dispatch({
            type: 'getCheckOrderList',
            payload: {
              hisId:sessionStorage.getItem('hisId'),
              pageNum:1,
              numPerPage:10,
              sort:'DESC',
              orderBy:'createTime',
            },
          });
        
      });
    },
  },
};
