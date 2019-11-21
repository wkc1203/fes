import * as utils from '../../../utils/utils';

//注册用户管理
export function RegisterList(param) {
  return utils.request('/api/mch/user/personal/page/account?'+utils.jsonToQueryString({ ...param }), {
    method: 'GET',
    // body: ,
  });
}


//绑卡用户管理
export function TieCardList(param) {
  return utils.request('/api/mch/user/personal/page/bindUser?'+utils.jsonToQueryString({ ...param }), {
    method: 'GET',
    // body: utils.jsonToQueryString({ ...param }),
  });
}
