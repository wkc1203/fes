import * as utils from '../../../utils/utils';
//获取科室信息
export function deptList(param) {
    return utils.request('/api/mch/health/api/referral/dept/listPage', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
//添加科室
export function addDepartment(param) {
  return utils.request('/api/mch/health/api/referral/dept/add', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//查询医院
export function getHospital(param) {
  return utils.request('/api/mch/health/api/referral/hospital/selection', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//修改科室
export function updateDepartment(param) {
  return utils.request('/api/mch/health/api/referral/dept/update', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//修改科室状态
export function action(param) {
  return utils.request('/api/mch/health/api/referral/dept/updateBatch', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}