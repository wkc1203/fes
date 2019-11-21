import * as utils from '../../../utils/utils';

export function list(param) {
  return utils.request('/api/mch/user/page', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function depts(param) {
  return utils.request('/api/mch/health/api/dept/depts', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function detail(param) {
  return utils.request('/api/mch/user/getById', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function reset(param) {
  return utils.request('/api/mch/user/password/reset', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function action(param) {
  return utils.request('/api/mch/user/update/status', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function add(param) {
  return utils.request('/api/mch/user/add', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function update(param) {
  return utils.request('/api/mch/user/update', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function getAllMenuOperate(param) {
  return utils.request('/api/mch/health/api/purview/getAllMenuOperate', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function addRole(param) {
  return utils.request('/api/mch/health/api/purview/setUserPurview', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function getRole(param) {
  return utils.request('/api/mch/health/api/purview/getUserPurview', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function updateRole(param) {
  return utils.request('/api/mch/health/api/purview/setUserPurview', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

