import * as utils from '../../../utils/utils';

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

export function add(param) {
  return utils.request('/api/mch/health/followed/addNurse', {
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
