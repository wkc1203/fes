import * as utils from '../../utils/utils';

export function login(param) {
  return utils.request('/api/mch/login', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//获取验证码
export function getCode(param) {
  return utils.request('/api/mch/user/valicode', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function getPhone(param) {
  return utils.request('/api/mch/user/getUserByPhone', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//验证验证码
export function checkCode(param) {
  return utils.request('/api/mch/user/checkcode', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function query(param) {
  return utils.request('/api/mch/queryuserinfo', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
export function nurseInfo(param) {
  return utils.request('/api/mch/health/followed/getNurseByAccount', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

