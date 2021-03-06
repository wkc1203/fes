import * as utils from '../../../utils/utils';

export function getList(param) {
  return utils.request('/api/mch/health/api/operationRecord/page', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function getDetail(param) {
  return utils.request('/api/mch/inquiry/info', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
