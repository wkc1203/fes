import * as utils from '../../../utils/utils';

// export function detail(param) {
//   return utils.request('/api/mch/order/queryorderdetailinfo', {
//     method: 'POST',
//     body: utils.jsonToQueryString({ ...param }),
//   });
// }

export function detail(param) {
  return utils.request('/api/mch/order/info?'+utils.jsonToQueryString({ ...param }), {
    method: 'GET',
    // body: utils.jsonToQueryString({ ...param }),
  });
}

