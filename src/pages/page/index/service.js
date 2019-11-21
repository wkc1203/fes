import * as utils from '../../../utils/utils';

export function list(param) {
  return utils.request('/api/mch/user/pageview/statistics/list', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

