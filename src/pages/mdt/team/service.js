import * as utils from '../../../utils/utils';

//订单统计
export function getOrderList(param) {
    return utils.request('/api/mch/health/api/mdt/team/listPage', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function deptList(param) {
    return utils.request('/api/mch/health/api/mdt/team/deptList', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function docList(param) {
    return utils.request('/api/mch/health/api/mdt/team/doctorList', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function add(param) {
    return utils.request('/api/mch/health/api/mdt/team/add', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function detail(param) {
    return utils.request('/api/mch/health/api/mdt/team/getBy', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function del(param) {
    return utils.request('/api/mch/health/api/mdt/team/delete', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function teamDetail(param) {
    return utils.request('/api/mch/health/api/mdt/doctor/getBy', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  export function update(param) {
    return utils.request('/api/mch/health/api/mdt/team/update', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
  }
  