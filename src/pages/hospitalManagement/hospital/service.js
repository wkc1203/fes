import * as utils from '../../../utils/utils';

//获取医院信息
export function hislist(param) {
    return utils.request('/api/mch/health/api/referral/hospital/listPage', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
//添加医院
export function addHospital(param) {
  return utils.request('/api/mch/health/api/referral/hospital/add', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//修改医院状态
export function action(param) {
  return utils.request('/api/mch/health/api/referral/hospital/updateBatch', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//根据id查询
export function ids(param) {
  return utils.request('/api/mch/health/api/referral/hospital/getById', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//修改医院信息
export function update(param) {
  return utils.request('/api/mch/health/api/referral/hospital/update', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

