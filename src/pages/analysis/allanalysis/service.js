import * as utils from '../../../utils/utils';

// 概况

//咨询分析
export function getinquirytotalstatistics(param) {
    return utils.request('/api/mch/user/statistics/getinquirytotalstatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}

export function getinquirytypestatistics(param) {
    return utils.request('/api/mch/user/statistics/getinquirytypestatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}

export function getinquirygoalstatistics(param) {
    return utils.request('/api/mch/user/statistics/getinquirygoalstatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}
