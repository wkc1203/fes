import * as utils from '../../../utils/utils';

//注册用户分析--用户数
export function getaccountnumstatistics(param) {
  return utils.request('/api/mch/user/statistics/getaccountnumstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//注册用户分析--chart1
export function getaccountanalysisstatistics(param) {
    return utils.request('/api/mch/user/statistics/getaccountanalysisstatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}


//注册用户分析--chart2
export function getnewusernumstatistics(param) {
    return utils.request('/api/mch/user/statistics/getnewusernumstatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}


//绑卡用户分析--用户数
export function getbindusernumstatistics(param) {
  return utils.request('/api/mch/user/statistics/getbindusernumstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//绑卡用户分析--chart1
export function getbinduseranalysisstatistics(param) {
    return utils.request('/api/mch/user/statistics/getbinduseranalysisstatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}

//绑卡用户分析--chart2
export function getnewbindusernumstatistics(param) {
    return utils.request('/api/mch/user/statistics/getnewbindusernumstatistics', {
      method: 'POST',
      body: utils.jsonToQueryString({ ...param }),
    });
}

//用户属性--省份
export function getaccountprovincestatistics(param) {
  return utils.request('/api/mch/user/statistics/getaccountprovincestatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//用户属性--城市
export function getaccountcitystatistics(param) {
  return utils.request('/api/mch/user/statistics/getaccountcitystatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//用户属性--性别
export function getaccountsexstatistics(param) {
  return utils.request('/api/mch/user/statistics/getaccountsexstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//用户属性--年龄
export function getaccountagestatistics(param) {
  return utils.request('/api/mch/user/statistics/getaccountagestatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}


// ----------------

//就诊人属性--省份
export function getpatientprovincestatistics(param) {
  return utils.request('/api/mch/user/statistics/getpatientprovincestatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//就诊人属性--城市
export function getpatientcitystatistics(param) {
  return utils.request('/api/mch/user/statistics/getpatientcitystatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//就诊人属性--性别
export function getpatientsexstatistics(param) {
  return utils.request('/api/mch/user/statistics/getpatientsexstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//就诊人属性--年龄
export function getpatientagestatistics(param) {
  return utils.request('/api/mch/user/statistics/getpatientagestatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}