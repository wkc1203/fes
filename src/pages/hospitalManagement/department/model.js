import { message } from 'antd';
import * as service from './service';

export default {
    namespace: 'department',
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
      *getHospital({ payload }, { call, put }) {
        // message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
        const { data } = yield call(service.getHospital, payload);
        if (data.code === 0) {
          yield put({
            type: 'save',
            payload: {
              hisdata: data.data,
            },
          });
        }
      },
       *deptList({ payload }, { call, put }) {
        // message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
        const { data } = yield call(service.deptList, payload);
        if (data.code === 0) {
          console.log('aa',data.data)
          yield put({
            type: 'save',
            payload: {
              data: data.data,
            },
          });
        }
      },
      *addDepartment({ payload }, { call, put }) {
        message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
        const { data } = yield call(service.addDepartment, payload);
        message.destroy();
        if (data.code === 0) {
        message.success('操作成功！', 2);
          yield put({
            type: 'save',
            payload
          });
          yield put({
            type: 'deptList',
            payload: {
              pageNum:1 
            },
          });
        } else {
          message.error(data.msg, 2);// eslint-disable-line
        }
      },
      *updateDepartment({ payload }, { call, put }) {
        message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
        const { data } = yield call(service.updateDepartment, payload);
        message.destroy();
        if (data.code === 0) {
        message.success('操作成功！', 2);
          yield put({
            type: 'save',
            payload
          });
          yield put({
            type: 'deptList',
            payload: {
              pageNum:1 
            },
          });
        } else {
          message.error(data.msg, 2);// eslint-disable-line
        }
      },
      *action({ payload }, { call, put }) {
        message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
        const { data } = yield call(service.action, payload);
        message.destroy();
        if (data.code === 0) {
          message.success('操作成功！', 2);
          yield put({
            type: 'deptList',
            payload: {
              pageNum:1 
            },
          });
        } else {
          message.error(data.msg, 2);// eslint-disable-line
        }
      },
    },

    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname,query }) => {
            if (pathname === '/hospitalManagement/department') {
              const position = sessionStorage.getItem('position');// eslint-disable-line
              dispatch({type: 'root/save', payload: {breadcrumb: ['双转联盟管理', '科室管理']}});// eslint-disable-line
              dispatch({ type: 'deptList', payload: {pageNum:1,hisId: sessionStorage.getItem('hisId')}});
            }
          });
        },
      },
}
