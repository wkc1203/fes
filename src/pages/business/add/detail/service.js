import * as utils from '../../../../utils/utils';

export function getDetail(param) {
  return utils.request('/api/mch/health/api/subscribe/detail', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  }); 
}
