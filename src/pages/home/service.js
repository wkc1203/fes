import * as utils from '../../utils/utils';

//用户数量统计
export function getTotalNum(param) {
  return utils.request('/api/mch/user/statistics/getusertotalnumstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//新增用户图表
export function getUserChart(param) {
  return utils.request('/api/mch/user/statistics/getnewusernumstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//二维码
export function getQr(param) {
  return utils.request(' /api/mch/user/earlyWarning/qrcode', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}
//用户满意度图表
export function getUserSatisfaction(param) {
  return utils.request('/api/mch/user/statistics/getusersatstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//咨询统计图表
export function getConsultationObj(param) {
  return utils.request('/api/mch/user/statistics/getinquirygoalstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}


//咨询问题总数统计
export function getConsultationAques(param) {
  return utils.request('/api/mch/user/statistics/getinquirytotalstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//每日收益统计

export function getDailyincomeStatistics(param) {
  return utils.request('/api/mch/user/statistics/getdailyincomestatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}

//关键指标

export function getkeyindicatorsstatistics(param) {
  return utils.request('/api/mch/user/statistics/getkeyindicatorsstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}


//智能预警

export function getintelliwarnstatistics(param) {
  return utils.request('/api/mch/user/statistics/getintelliwarnstatistics', {
    method: 'POST',
    body: utils.jsonToQueryString({ ...param }),
  });
}