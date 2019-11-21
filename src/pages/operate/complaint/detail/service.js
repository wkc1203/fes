import * as utils from '../../../../utils/utils';

export function getDetail(param) {
  return utils.request('/api/mch/user/complaints/getcomplaintsdetailinfo', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
