import * as utils from '../../../../utils/utils';

export function getList(param) {
  return utils.request('/api/mch/user/complaints/page', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function Handling(param) {
  return utils.request('/api/mch/user/complaints/updatecomplaintsinfo', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}