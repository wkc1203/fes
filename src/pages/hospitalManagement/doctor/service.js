import * as utils from '../../../utils/utils';
//获取科室信息
export function list(param) {
    return utils.request('/api/mch/health/api/referral/doctor/listPage', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function action(param) {
    return utils.request('/api/mch/health/api/referral/doctor/updateBatch', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  
  export function reset(param) {
    return utils.request('/api/mch/resetpassword', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }