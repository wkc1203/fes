import * as utils from '../../utils/utils';

//添加医院信息
export function add(param) {
    return utils.request('/api/mch/health/hospital/add', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}


export function sign(param) {
  return utils.request('/api/ehis/health/api/file/sign', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//获取医院信息
export function getHoi(param) {
  return utils.request('/api/mch/health/hospital/get/hisId', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}