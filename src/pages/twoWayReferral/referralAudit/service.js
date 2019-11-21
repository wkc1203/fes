import * as utils from '../../../utils/utils';
//获取科室信息
export function list(param) {
    return utils.request('/api/mch/health/api/referral/apply/list', {
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
  export function detail(param) {
    return utils.request('/api/mch/health/api/referral/audit/getBy', {
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
  export function dept(param) {
    return utils.request('/api/mch/health/api/referral/dept/selection', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function hospital(param) {
    return utils.request('/api/mch/health/api/referral/hospital/selection', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function apply(param) {
    return utils.request('/api/mch/health/api/referral/audit/confirm', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function doctor(param) {
    return utils.request('/api/mch/health/api/referral/doctor/selection', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
 