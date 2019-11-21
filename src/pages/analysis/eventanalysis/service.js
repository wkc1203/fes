import * as utils from '../../../utils/utils';


//医生分析
export function getdoctoranalysisstatistics(param) {
    return utils.request('/api/mch/user/pageview/statistics/list', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}

//咨询条数
export function getinquirytypestatistics(param) {
  return utils.request('/api/mch/user/statistics/getinquirytypestatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//咨询分析
export function getinquirytotalstatistics(param) {
  return utils.request('/api/mch/user/statistics/getinquirytotalstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}



  