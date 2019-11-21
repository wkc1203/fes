import * as utils from '../../../utils/utils';

// export function list(param) {
//   return utils.request('/api/mch/order/getorderlist', {
//     method: 'POST',
//     body: utils.jsonToQueryString({ ...param }),
//   });
// }

export function refund(param) {
  return utils.request('/api/mch/order/refund', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//订单统计
export function getOrderList(param) {
  return utils.request('/api/mch/order/page', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//获取验证码
export function getCode(param) {
  return utils.request('/api/mch/user/valicode', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//验证验证码
export function checkCode(param) {
  return utils.request('/api/mch/user/checkcode', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//即将超时订单统计
export function comingOvertimeList(param) {
  return utils.request('/api/mch/inquiry/page/comingOvertime', {
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



