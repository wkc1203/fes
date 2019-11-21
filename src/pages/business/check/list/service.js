
import * as utils from '../../../../utils/utils';
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
export function getCheckOrderList(param) {           
  return utils.request('/api/mch/health/api/Checklist/page', {
 
  
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



