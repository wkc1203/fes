import * as utils from '../../../utils/utils';

export function PatientsList(param) {
  return utils.request('/api/mch/user/personal/page/patients?'+utils.jsonToQueryString({ ...param }), {
    method: 'GET',
    // body: utils.jsonToQueryString({ ...param }),
  });
}
