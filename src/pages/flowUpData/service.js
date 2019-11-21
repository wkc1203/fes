import * as utils from '../../utils/utils';

// 概况

//咨询分析
export function getinquirytotalstatistics(param) {
    return utils.request('/api/mch/health/followed/followPatientStatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}

export function getinquirytypestatistics(param) {
    return utils.request('/api/mch/health/followed/followRecordStatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}

export function getinquirygoalstatistics(param) {
    return utils.request('/api/mch/health/followed/followRateStatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}
export function getfollowCompleteStatistics(param) {
  return utils.request('/api/mch/health/followed/followCompleteStatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function getDept(param) {
  return utils.request('/api/mch/health/followed/getDeptHsaNurse', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}