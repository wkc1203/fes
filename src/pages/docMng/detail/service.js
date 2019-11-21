import * as utils from '../../../utils/utils';

export function detail(param) {
  return utils.request('/api/mch/health/api/doctor/doctor', {
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
