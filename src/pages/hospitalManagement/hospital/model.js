import { message } from 'antd';
import * as service from './service';
export default {
    namespace: 'hospital',
    state:{
      ids:{},
    },
    reducers: {
      save(state, { payload }) {
        return { ...state, ...payload };
      },
      clear() {
        return {};
      },
    },
    effects:{
       *hisList({ payload }, { call, put }) {
        // message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
        const { data } = yield call(service.hislist, payload);
        console.log("bb")
        if (data.code === 0) {
          yield put({
            type: 'save',
            payload: {
              data: data.data,
            },
          });
        }
      },
      //根据id查询
      *Ids({ payload }, { call, put }) {
        // message.loading('loading...', 0);
        payload.hisId=sessionStorage.getItem('hisId')
        const { data } = yield call(service.ids, payload);
        if (data.code === 0) {
          yield put({
            type: 'save',
            payload: {
              ids: data.data,
            },
          });
        }
      },
      //修改信息
      *update({ payload }, { call, put }) {
        message.loading('loading...', 0);
        const { data } = yield call(service.update, payload);
        message.destroy();
        if (data.code === 0) {
          message.success('操作成功！', 2);
          yield put({
            type: 'save',
            payload: { ids: {}},
          });
          yield put({
            type: 'hisList',
            payload: {
              hisId: sessionStorage.getItem('hisId'),
            },
          });
        } else {
          message.error(data.msg, 2);// eslint-disable-line
        }
      },
      //添加医院
      *addHospital({ payload }, { call, put }) {
        message.loading('loading...', 0);
        const { data } = yield call(service.addHospital, payload);
        message.destroy();
        if (data.code === 0) {
        message.success('操作成功！', 2);
          yield put({
            type: 'save',
            payload: { detail: {}},
          });
          yield put({
            type: 'hisList',
            payload: {
              hisId: sessionStorage.getItem('hisId'),
            },
          });
        } else {
          message.error(data.msg, 2);// eslint-disable-line
        }
      },

      //修改医院状态
      *action({ payload }, { call, put }) {
        message.loading('loading...', 0);
        const { data } = yield call(service.action, payload);
        message.destroy();
        if (data.code === 0) {
          message.success('操作成功！', 2);
          yield put({
            type: 'hisList',
            payload: {
              pageNum:1,
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
            if (pathname === '/hospitalManagement/hospital') {
              const position = sessionStorage.getItem('position');// eslint-disable-line
              dispatch({type: 'root/save', payload: {breadcrumb: ['双转联盟管理', '医院管理']}});// eslint-disable-line
              dispatch({ type: 'hisList', payload: {hisId: sessionStorage.getItem('hisId')} });
            }
          });
        },
      },
}
