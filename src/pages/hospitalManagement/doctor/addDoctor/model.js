import { message } from 'antd';
import { hashHistory } from 'dva/router';
import * as service from './service';

export default {
  namespace: 'docDet',
  state: {
    depts: [],
    detail: {},
   
    graphic: {
      type: 1,
      remune: '',
      isOnDuty: 0,
    },
    video: {
      type: 2,
      remune: '',
      isOnDuty: 0,
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return {
        depts: [],
        detail: {},
        referral:{},
        graphic: {
          type: 1,
          remune: '',
          isOnDuty: 0,
        },
        video: {
          type: 2,
          remune: '',
          isOnDuty: 0,
        },
      };
    },
    changeDet(state, {payload}) {
      return {...state, detail: {...state.detail, ...payload}};
    },
    changeRef(state, {payload}) {
        console.log(state,payload)
      return {...state, detail: {...state.detail, ...payload}};
    },
    changegraphic(state, {payload}) {
      return {...state, graphic: {...state.graphic, ...payload}};
    },
    changevideo(state, {payload}) {
      return {...state, video: {...state.video, ...payload}};
    },
  },
  effects: {
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
    *getFunc({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      payload.hisId=sessionStorage.getItem('hisId')
      const { data } = yield call(service.getFunc, payload);
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            funcdata: data.data,
          },
        });
      }
    },
    *getDept({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      payload.hisId=sessionStorage.getItem('hisId')
      const { data } = yield call(service.getDept, payload);
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            deptdata: data.data,
          },
        });
      }
    },
    *detail({ payload }, { call, put }) {
      message.loading('loading...', 0);
      payload.hisId=sessionStorage.getItem('hisId')
      const { data } = yield call(service.detail, payload);
      message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            detail: !!data.data&&!!data.data[0]?data.data[0]:'',
          },
        });
       yield put({
          type: 'getFunc',
          payload: {
            hospitalId:data.data[0].hospitalId
          },
        }); 
        yield put({
          type: 'getDept',
          payload: {
            hospitalId:data.data[0].hospitalId
          },
        });
        const graphic = {
          type: 1,
          remune: '',
          isOnDuty: 0,
        };
        const video = {  
          type: 2,
          remune: '',
          isOnDuty: 0,
        };
        if (data.data.inquirys && data.data.inquirys.length > 0) {
          data.data.inquirys.forEach((v) => {
            if (v.type == 1) {
              graphic.remune = v.remune / 100;
              graphic.isOnDuty = v.isOnDuty;
            }
            if (v.type == 2) {
              video.remune = v.remune / 100;
              video.isOnDuty = v.isOnDuty;
            }
          });
        }
        yield put({
          type: 'save',
          payload: { graphic, video },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *depts({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      const { data } = yield call(service.depts, payload);
      // message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            depts: data.data,
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *update({ payload }, { call }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.update, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2, () =>{history.back(-1)});
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *add({ payload }, { call }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.add, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2, () => {history.back(-1)});
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/doctor/addDoctor') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['医生管理','医生编辑']}});// eslint-disable-line
          if (query.id) {
            dispatch({ type: 'detail', payload: {hisId: sessionStorage.getItem('hisId'), id: query.id} });
          }
          dispatch({ type: 'depts', payload: {hisId: sessionStorage.getItem('hisId')} });
        }
      });
    },
  },
};
