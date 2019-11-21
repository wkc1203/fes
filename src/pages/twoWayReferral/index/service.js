import * as utils from '../../../utils/utils';

export function getSurvey(param) {
  return utils.request('/api/mch/health/api/referral/index/survey', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function getApply(param) {
    return utils.request('/api/mch/health/api/referral/index/apply/analysis', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function getSpeed(param) {
    return utils.request('/api/mch/health/api/referral/index/apply/speed/analysis', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function dept(param) {
    return utils.request('/api/mch/health/api/referral/dept/selection', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }





