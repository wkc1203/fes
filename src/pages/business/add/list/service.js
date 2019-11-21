
import * as utils from '../../../../utils/utils';
// export function list(param) {
//   return utils.request('/api/mch/order/getorderlist', {
//     method: 'POST',
//     body: utils.jsonToQueryString({ ...param }),
//   });
// }

export function refund(param) {
  return utils.request('/api/mch/health/api/subscribe/returnMoney', {
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
export function subscrib(param) {
  return utils.request('/api/mch/health/api/subscribe/setSubscribeNormal', {
    method: 'POST',             
    body: utils.jsonToQueryString({ ...param }),
  });
}

//订单统计
export function getAddOrderList(param) {            
  return utils.request('/api/mch/health/api/subscribe/page', {
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
export function getDetail(param) {
  return utils.request('/api/mch/health/api/subscribe/detail', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  }); 
}



