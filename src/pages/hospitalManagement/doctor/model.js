import { message } from 'antd';
import * as service from './service';

export default {
    namespace: 'doctor',
    state:{},
    reducers: {
      save(state, { payload }) {
        return { ...state, ...payload };
      },
      clear() {
        return {};
      },
    },
    effects:{
      *list({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      payload.hisId=sessionStorage.getItem('hisId')

      const { data } = yield call(service.list, payload);
      if (data.code === 0) {
        console.log('ccc',data.data)
        yield put({
          type: 'save',
          payload: {
            data: data.data,
          },
        });
      }
    },

    *action({ payload }, { call, put }) {
      message.loading('loading...', 0);
      payload.hisId=sessionStorage.getItem('hisId')
      const { data } = yield call(service.action, payload);
      console.log(data,'dadasd')
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({
          type: 'list',
          payload: {
            pageNum:1 
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *reset({ payload }, { call }) {
      message.loading('loading...', 0);
      payload.hisId=sessionStorage.getItem('hisId')
      const { data } = yield call(service.reset, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    },
    
    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname,query }) => {
            if (pathname === '/hospitalManagement/doctor') {
              const position = sessionStorage.getItem('position');// eslint-disable-line
              dispatch({type: 'root/save', payload: {breadcrumb: ['双转联盟管理', '医生管理']}});// eslint-disable-line
              dispatch({ type: 'list', payload: {pageNum:1 }});
            }
          });
        },
      },
}
