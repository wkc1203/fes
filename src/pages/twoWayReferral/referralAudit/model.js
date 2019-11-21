import { message } from 'antd';
import * as service from './service';

export default {
    namespace: 'referral',
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
    *detail({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.detail, payload);
      console.log(data,'dadasd')
      message.destroy();
      if (data.code === 0) {
        console.log('ccc',data.data)
        yield put({
          type: 'save',
          payload: {
            detail:data.data,
          },
        });
      }
    },
    *hospital({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.hospital, payload);
      console.log(data,'dadasd')
      message.destroy();
      if (data.code === 0) {
        console.log('ccc',data.data)
        yield put({
          type: 'save',
          payload: {
            hospital: data.data,
          },
        });
      }
    },
    *dept({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.dept, payload);
      console.log(data,'dadasd')
      message.destroy();
      if (data.code === 0) {
        console.log('ccc',data.data)
        yield put({
          type: 'save',
          payload: {
            dept: data.data,
          },
        });
      }
    },
    *doctor({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.doctor, payload);
      console.log(data,'dadasd')
      message.destroy();
      if (data.code === 0) {
        console.log('ccc',data.data)
        yield put({
          type: 'save',
          payload: {
            doctor: data.data,
          },
        });
      }
    },
    *apply({ payload }, { call,put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.apply, payload);
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        var datas=JSON.parse(sessionStorage.getItem('loginInfo'));

        yield put({
          type: 'list',
          payload: {
            hisId:sessionStorage.getItem('hisId'),
            pageNum:1,
            numPerPage:10,
            state:'1',
           // deptId:this.state.curDeptId.replace(/(^\s*)|(\s*$)/g, ""),
           // hospitalId:this.state.curInputHisId.replace(/(^\s*)|(\s*$)/g, ""),
            vagueName:'',
            startDate:'',
            endDate:'',
            sort:'DESC',
            category:!!datas&&!!datas[2]&&!!datas[2].referral?'1':'2'
        }
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
   
    },
    
    subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname,query }) => {
            if (pathname === '/twoWayReferral/referralAudit') {
              const position = sessionStorage.getItem('position');// eslint-disable-line
              dispatch({type: 'root/save', payload: {breadcrumb: ['转诊管理', '转诊审核']}});// eslint-disable-line
            }
          });
        },
      },
}
