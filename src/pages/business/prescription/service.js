import * as utils from '../../../utils/utils';

export function list(param) {
  return utils.request('/api/mch/health/api/chronicDisease/page', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function detail(param) {
  return utils.request('/api/mch/health/api/chronicDisease/getById', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}


export function refund(param) {
  return utils.request('/api/mch/health/api/chronicDisease/refund', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function action(param) {
  return utils.request('/api/mch/health/api/chronicDisease/audit', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function getImg(param) {
  return utils.request('/api/mch/health/kqsign/doctor/sign/img', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function updateImg(param) {
  return utils.request('/api/mch/health/kqsign/signature', {
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
