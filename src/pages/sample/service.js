import * as utils from '../../utils/utils';

export function list(param) {
  return utils.request('/api/mch/health/api/Template/page', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function add(param) {
  return utils.request('	/api/mch/health/api/Template/save', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function del(param) {
  return utils.request('/api/mch/health/api/Template/delete', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function update(param) {
  return utils.request('/api/mch/health/api/Template/update', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
