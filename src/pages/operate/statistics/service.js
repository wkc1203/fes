import * as utils from '../../../utils/utils';

export function getUserData(param) {
  return utils.request('/api/mch/user/statistics/getuserstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function getInquiryData(param) {
  return utils.request('/api/mch/user/statistics/getinquirystatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function getApprData(param) {
  return utils.request('/api/mch/user/statistics/getappraisalstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function getProfitData(param) {
  return utils.request('/api/mch/user/statistics/getdailyearningsstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

export function getReceptionData(param) {
  return utils.request('/api/mch/user/statistics/getinquirystatisticslist', {
    method: 'POST',
    body: utils.jsonToQueryString({...param
  }),
});
}
export function getDeptsData(param) {
  return utils.request('/api/mch/user/statistics/departmentStatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({...param
  }),
});
}
  export function getInquiryPurposeData(param) {
  return utils.request('/api/mch/user/statistics/getInquiryPurposeStatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
