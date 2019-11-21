import * as utils from '../../../utils/utils';

//获取科室信息
export function list(param) {
    return utils.request('/api/mch/health/api/referral/department/listPage', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
//修改科室状态
  export function action(param) {
    return utils.request('/api/mch/health/api/referral/department/updateBatch', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
//添加科室
  export function addDepartment(param) {
    return utils.request('/api/mch/health/api/referral/department/add', {
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
//修改部门
export function updateDepartment(param) {
  return utils.request('/api/mch/health/api/referral/department/update', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}