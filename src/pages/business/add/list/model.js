import { message } from 'antd';
import * as service from './service';
import { formatDate } from '../../../../utils/utils';

export default {
  namespace: 'addordList',
  state: {
  detaillist:''
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
        message.info('退费成功', 2);
        setTimeout(function(){
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
        },1000)
       
      } else {
        message.error(data.msg, 2);
      }
    },
    *getDetail({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getDetail, payload);
      message.destroy();
        console.log('j',data)
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { detaillist: data.data || {} }
      });
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
    *subscrib({ payload ,callback}, { call, put }) {
      message.loading('loading...', 0);
      console.log("p",payload)
      const { data } = yield call(service.subscrib, payload);
      message.destroy();
      if (data.code === 0) {
        message.info('设置成功', 2);
        setTimeout(function(){
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
        },1000)
      } else {
        message.error(data.msg, 2);
      }
    },

    *getAddOrderList({ payload }, { call, put }) {
       console.log("pay11",payload)
      message.loading('loading...', 0);
      const { data } = yield call(service.getAddOrderList, payload);
      message.destroy();
       console.log('data111',data.data)
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
         console.log("pathname",pathname)
         if (pathname === '/business/add/list') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['医疗业务管理', '加号管理']}});// eslint-disable-line
          dispatch({
            type: 'getAddOrderList',
            payload: {
              hisId:sessionStorage.getItem('hisId'),
              pageNum:1,
              numPerPage:10,
              sort:'DESC',
              orderBy:'createTime',
            },
          });
        }
      });
    
    },
  },
};
