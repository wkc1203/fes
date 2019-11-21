import * as utils from '../../../utils/utils';

//订单统计
  export function getOrderList(param) {
    return utils.request('/api/mch/order/page', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }

  export function detail(param) {
    return utils.request('/api/mch/order/info?'+utils.jsonToQueryString({ ...param }), {
      method: 'GET',
      // body: utils.jsonToQueryString({ ...param }),
    });
  }
  
  export function getexcel(param) {
    return utils.download('/api/mch/order/export?'+utils.jsonToQueryString({ ...param }));
  }
  
  // export function getexcel(param) {
  //   return utils.request('/api/mch/order/export', {
  //     method: 'POST',
  //     body: utils.jsonToQueryString({ ...param }),
  //   });
  // }
  