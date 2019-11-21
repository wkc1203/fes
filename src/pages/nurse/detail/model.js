import { message } from 'antd';
import { hashHistory } from 'dva/router';
import * as service from './service';

export default {
  namespace: 'nurseDe',
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
    changegraphic(state, {payload}) {
      return {...state, graphic: {...state.graphic, ...payload}};
    },
    changevideo(state, {payload}) {
      return {...state, video: {...state.video, ...payload}};
    },
  },
  effects: {
    *detail({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.detail, payload);
      message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            detail: data.data.doctorVoList[0],
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
        if (pathname === '/nurse/detail') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['护士管理','护士编辑']}});// eslint-disable-line
          if (query.doctorId) {
            dispatch({ type: 'detail', payload: {hisId: sessionStorage.getItem('hisId'), doctorId: query.doctorId} });
          }
          dispatch({ type: 'depts', payload: {hisId: sessionStorage.getItem('hisId')} });
        
        }
      });

    },
  },
};
