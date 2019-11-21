import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'docMng1',
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
    
      if(payload.doctorId=='1'){
        yield put({
          type: 'save',
          payload: {
            detail: {},
            referral:[]
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
        const radio = {
          type: 3,
          remune: '',
          isOnDuty: 0,
        };
        const mdt={
          status:false,
          value:'0',
          text:'无权限',
        };
        
      yield put({
        type: 'save',
        payload: { graphic, video,radio,mdt },
      });
      }else{
        message.loading('loading...', 0);
        const { data } = yield call(service.detail, payload);
        message.destroy();
        if (data.code === 0) {
          yield put({
            type: 'save',
            payload: {
              detail: data.data.doctorVoList[0],
              referral:data.data.doctorVoList[0]||''
              // referral:[]//data.data&&data.data.referralDoctorConfigVo[0]

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
          const radio = {
            type: 3,
            remune: '',
            isOnDuty: 0,
          };
          const mdt={
            status:false,
            value:'0',
            text:'无权限',
          };
          if(data.data.consultationAuthority=='0'){
              mdt.status=false;
              mdt.value='0';
              mdt.text='无权限'
          }
          if(data.data.consultationAuthority=='1'){
            mdt.status=false;
            mdt.value='1';
             mdt.text='会诊审核员'
          }
            if(data.data.consultationAuthority=='2'){
              mdt.status=false;
              mdt.value='2';
              mdt.text='会诊医师'
          }
          if(data.data.consultationAuthority=='3'){
            mdt.status=false;
            mdt.value='3';
            mdt.text='会诊报告审核员'
        }
          if (data.data.doctorVoList[0].inquirys && data.data.doctorVoList[0].inquirys.length > 0) {
            data.data.doctorVoList[0].inquirys.forEach((v) => {
              if (v.type == '1') {
                graphic.remune = v.remune / 100;
                graphic.isOnDuty = v.isOnDuty;
              }
              if (v.type == '2') {
                video.remune = v.remune / 100;
                video.isOnDuty = v.isOnDuty;
              }
              if (v.type == '3') {
                radio.remune = v.remune / 100;
                radio.isOnDuty = v.isOnDuty;
              }
            });
          }
          yield put({
            type: 'save',
            payload: { graphic, video,radio },
          });
        } else {
          message.error(data.msg, 2);// eslint-disable-line
        }
      }
     
    },
    *list({ payload }, { call, put }) {
      // message.loading('loading...', 0);
      const { data } = yield call(service.list, payload);
      // message.destroy();
      if (data.code === 0) {
        var lis=[];

        for(let i in data.data.params.prescriptionQualificationMap){
            var no={};
            no.value=data.data.params.prescriptionQualificationMap[i];
            no.dex=i;
          lis.push(no)
        }
        console.log(lis)
        yield put({
          type: 'save',
          payload: {
            data: data.data.pages,
            selectOptions:data.data.params,
            prescriptionQualificationMap:lis
          },
        });
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
        if (pathname === '/docMng') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['医生管理']}});// eslint-disable-line
          dispatch({ type: 'list', payload: {hisId: sessionStorage.getItem('hisId')} });
        }
      });
    },
  },
};
