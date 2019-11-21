import * as utils from '../../utils/utils';

export function list(param) {
  return utils.request('/api/mch/health/api/doctor/listPage', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function action(param) {
  return utils.request('/api/mch/health/api/doctor/updateBatch', {
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

export function detail(param) {
  return utils.request('/api/mch/health/api/doctor/getBy', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function depts(param) {
  return utils.request('/api/mch/health/api/doctor/getByDept', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function getFunc(param) {
  return utils.request('/api/mch/health/api/referral/department/selectionP', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function add(param) {
  return utils.request('/api/mch/health/api/doctor/add', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function update(param) {
  return utils.request('/api/mch/health/api/doctor/update', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
