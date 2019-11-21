import fetch from 'dva/fetch';
import { hashHistory } from 'dva/router';
import * as CONSTANT from '../config/constant/constant';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request(url, options) {
  // options.hisId = sessionStorage.getItem('hisId');
  // options.platformId = sessionStorage.getItem('hisId');
  // console.log(options)
  const response = await fetch(`${CONSTANT.DOMAIN}${url}`, {
    ...options,
    credentials: 'include',
    // mode: "no-cors",
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });

  console.log(response)

  let data = {};

  if (response.status >= 200 && response.status < 300) {
    try {
      data = await response.json();
    } catch (e) {
      data = {
        code: 1001,
        msg: 'Syntax Error in Response Data',
      };
    }
  } else {
    data = {
      code: 1000,
      msg: response.statusText,
    };
  }

  if (data.code === 999) {
    // to authority
    // data = await authority('/api/authority');

    // if (data.code === 0) {
    //   return request(url, options);
    // }
    hashHistory.push({pathname: '/login'});
  }
  // console.log(data)
  return { data };
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function download(url, options) {
  const response = await fetch(`${CONSTANT.DOMAIN}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      mode: 'no-cors',
      Accept: 'application/json, text/javascript,application/vnd.ms-excel, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded;application/x-download; charset=UTF-8',
    },
  });
  let data = {
    code: -1,
  };

  if (response.status >= 200 && response.status < 300) {
    const contentType = response.headers.get('content-type');
    if (contentType.indexOf('application/json') >= 0) {
      data = await response.json();
    } else {
      const contentDisposition = decodeURIComponent(response.headers.get('content-disposition'));
      const filename = contentDisposition.match(/filename=([^;]*)/)[1].replace(/"/ig, '');
      const a = document.createElement('a'); // eslint-disable-line
      response.blob().then((blob) => {
        const $url = window.URL.createObjectURL(blob); // eslint-disable-line
        a.href = $url;
        a.download = filename || `${new Date().getTime()}`;
        a.click();
        window.URL.revokeObjectURL($url); // eslint-disable-line
      });
      data = {
        code: 0,
      };
    }
  } else {
    data = {
      code: -1,
      error: response.statusText,
    };
  }

  if (data.code === 999) {
    // to authority
    // data = await authority('/api/authority');

    // if (data.code === 0) {
    //   return request(url, options);
    // }
    hashHistory.push({pathname: '/login'});
  }

  return { data };
}

export function jsonToQueryString(json) {
  if (json) {
    return Object.keys(json).map((key) => {
      if (json[key] instanceof Array) {
        return Object.keys(json[key]).map((k) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(json[key][k])}`;
        }).join('&');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
    }).join('&');
  }
  return '';
}

/**
 * Date对象转换成 string
 *
 * @param {date} json An date object
 * @return {string}
 */
export function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return `${dateStr}`;
}

export function downloads(url) {
  console.log(url,'excle')
  const a = document.createElement('a');
  a.href = url;
  a.click();
}