import * as utils from '../../utils/utils';

export function authority() {
  return utils.request('api/authority', {
    method: 'POST',
  });
}

export function logout() {
  return utils.request('/api/mch/logout', {
    method: 'POST',
  }); 
}
