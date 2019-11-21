import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'prescription',
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
    mdt:{
      status:false,
      value:'',
      text:'',
    },
    radio: {
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
        radio: {
          type: 3,
          remune: '',
          isOnDuty: 0,
        },
        mdt:{
          status:false,
          value:'0',
          text:'无权限',
        },
      };
    },
    changeDet(state, {payload}) {
      return {...state, detail: {...state.detail, ...payload}};
    },
    changeRef(state, {payload}) {
        console.log(state,payload)
      return {...state, referral: {...state.referral, ...payload}};
    },
    changegraphic(state, {payload}) {
      return {...state, graphic: {...state.graphic, ...payload}};
    },
    changevideo(state, {payload}) {
      return {...state, video: {...state.video, ...payload}};
    },
    changeradio(state, {payload}) {
      return {...state, radio: {...state.radio, ...payload}};
    },
    changemdt(state, {payload}) {
      return {...state, mdt: {...state.mdt, ...payload}};
    },
  },
  effects: {
    *getFunc({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      payload.hisId=sessionStorage.getItem('hisId')
      const { data } = yield call(service.getFunc, payload);
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {},
          funcdata: data.data,
        });
      }
    },
    *detail({ payload }, { call, put }) {
    
  
        message.loading('loading...', 0);
        const { data } = yield call(service.detail, payload);
        message.destroy();
        if (data.code === 0) {
          yield put({
            type: 'save',
            payload: {
              detail: data.data,
              caseInfo:!!data.data.caseInfo?data.data.caseInfo:''
            },
          });
        } else {
          message.error(data.msg, 2);// eslint-disable-line
        }
      
     
    },
    *list({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      const { data } = yield call(service.list, payload);
      // message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            data: data.data
          
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },

    *refund({ payload,callback }, { call, put }) {
      // message.loading('loading...', 0);
      const { data } = yield call(service.refund, payload);
      // message.destroy();
      if (data.code === 0) {
        callback(data)
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },

    *action({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.action, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({
          type: 'list',
          payload: {
            hisId: sessionStorage.getItem('hisId'),
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *reset({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.reset, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({
          type: 'list',
          payload: {
            hisId: sessionStorage.getItem('hisId'),
          },
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
    *getImg({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      const { data } = yield call(service.getImg, payload);
      // message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            signImg: data.data,
          },
        });
      } else {
       // message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *updateImg({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      const { data } = yield call(service.updateImg, payload);
      // message.destroy();
      if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            signUrl: data.data,
          },
        });
      } else {
       // message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *update({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.update, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({
          type: 'list',
          payload: {
            hisId: sessionStorage.getItem('hisId'),
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *add({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.add, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({
          type: 'list',
          payload: {
            hisId: sessionStorage.getItem('hisId'),
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
        if (pathname === '/business/prescription/list') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['医疗业务管理', '电子处方']}});// eslint-disable-line
          dispatch({ type: 'list', payload: {hisId: sessionStorage.getItem('hisId')} });
        }
      });
    },
  },
};
