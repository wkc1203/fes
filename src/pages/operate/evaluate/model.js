import { message } from 'antd';
import * as service from './service';

export default {
  namespace: 'operateEvaluate',
  state: {
    listData: [],
    detailData:{}
  },
  reducers: {
    save(state, { payload = {} }) {
      return { ...state, ...payload };
    },
    clear() {
      return {};
    },
  },
  effects: {
    *getList({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getList, payload);
      message.destroy();
      console.log(data)
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      yield put({
        type: 'save',
        payload: { listData: data.data || [] }
      });
    },

    *getDetail({ payload }, { call, put }) {
      message.loading();
      const { data = {} } = yield call(service.getDetail, payload);
      message.destroy();
        console.log(data)
      if (data.code != 0) {
        message.error(data.msg, 2);// eslint-disable-line
        return;
      }
      var str1=data.data.appraisal.hisAppraisalLabel||'';
                  var itemList1='';//评价标签个数
                  if(str1.length>0){
                   var s1=[];
                   s1= str1.split("-");//后台将评价标签保存为一条字符串，需要分隔
                 
                   for(var i=0;i<s1.length;i++)
                   {//按显示格式分隔
                          itemList1=itemList1+'#'+s1[i]+'# ';
                   }
                  }
                     
              var str=data.data.appraisal.appraisalLabel||'';
              var itemList='';//评价标签个数
              if(str.length>0){
                var s=[];
                s= str.split("-");//后台将评价标签保存为一条字符串，需要分隔
              
                for(var i=0;i<s.length;i++)
                {//按显示格式分隔
                      itemList=itemList+'#'+s[i]+'# ';
                }
              }
              
      yield put({
        type: 'save',
        payload: { detailData: data.data || {},item1:itemList,item2:itemList1 }
      });
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname ,query}) => {
        if (pathname === '/operate/evaluate') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['运营管理','评价管理']}});// eslint-disable-line
        }

        if (pathname === '/operate/evaluate/detail') {
          const position = sessionStorage.getItem('position');// eslint-disable-line
          dispatch({type: 'root/save', payload: {breadcrumb: ['运营管理','评价详情']}});// eslint-disable-line
          dispatch({type: 'getDetail', payload: {orderId:query.orderId}});// eslint-disable-line

        }

      });
    },
  },
};
