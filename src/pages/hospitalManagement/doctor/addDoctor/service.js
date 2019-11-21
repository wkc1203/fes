import * as utils from '../../../../utils/utils';

export function detail(param) {
  return utils.request('/api/mch/health/api/referral/doctor/getBy', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function depts(param) {
  return utils.request('/api/mch/health/api/doctor/depts', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function add(param) {
  return utils.request('/api/mch/health/api/referral/doctor/add', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function update(param) {
  return utils.request('/api/mch/health/api/referral/doctor/update', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//查询医院
export function getHospital(param) {
  return utils.request('/api/mch/health/api/referral/hospital/selection', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function getFunc(param) {
  return utils.request('/api/mch/health/api/referral/department/selection', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function getDept(param) {
  return utils.request('	/api/mch/health/api/referral/dept/selection', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
