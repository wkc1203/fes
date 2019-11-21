import * as utils from '../../../utils/utils';

export function list(param) {
  return utils.request('/api/mch/user/template/statistics/list', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

