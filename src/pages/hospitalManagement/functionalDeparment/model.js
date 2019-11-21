import {message} from 'antd';
import * as service from './service';
export default {
  namespace: 'functional1',
  state: {},
  reducers: {
    save(state, {payload}) {
      return {...state,...payload};
    },
    clear() {
      return {};
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
    *deptlist({ payload }, { call, put }) {
      // message.loading('loading...', 0);
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
          type: 'deptlist',
          payload: {
            pageNum:1 ,
            operType:'s',
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    *addDepartment({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.addDepartment, payload);
      message.destroy();
      if (data.code === 0) {
      message.success('操作成功！', 2);
        yield put({
          type: 'save',
          payload
        });
        yield put({
          type: 'deptlist',
          payload: {
            pageNum:1 ,
            operType:'s',
          },
        });
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },
    //修改状态
    *action({ payload }, { call, put }) {
      message.loading('loading...', 0);
      const { data } = yield call(service.action, payload);
      console.log(data,'adada')
      message.destroy();
      if (data.code === 0) {
        message.success('操作成功！', 2);
        yield put({type: 'deptlist',payload: {pageNum:1, operType:'s',}});
      } else {
        message.error(data.msg, 2);// eslint-disable-line
      }
    },

    // *addDeparment({ payload }, { call, put }) {
    //   message.loading('loading...', 0);
    //   const { data } = yield call(service.addDeparment, payload);
    //   console.log(data)
    //   message.destroy();
    //   if (data.code === 0) {
    //   message.success('操作成功！', 2);
    //     yield put({type: 'save',payload: { detail: {}}});
    //     yield put({ type: 'deptlist', payload: {pageNum:1, operType:'s',}
    //     });
    //   } else {
    //     message.error(data.msg, 2);// eslint-disable-line
    //   }
    // },
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      return history.listen(({
        pathname,
        query
      }) => {
        if (pathname === '/hospitalManagement/functionalDeparment') {
          const position = sessionStorage.getItem('position'); // eslint-disable-line
          dispatch({
            type: 'root/save',
            payload: {
              breadcrumb: ['双转联盟管理', '职能部门管理']
            }
          }); // eslint-disable-line
          dispatch({type: 'deptlist',payload: {pageNum: 1, operType:'s',}});
        }
      });
    },
  },
}
