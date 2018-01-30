import { Loading } from '@mtfe/mcashier-components';
import * as KNB from '@dp/knb/titans';

export interface IGetRoute {}

export interface IPostRoute {}

import axios, {AxiosRequestConfig} from 'axios';

export const instance = axios;

interface IConfig extends AxiosRequestConfig {
  loadingText: string;
}

/**
 * 目前提供 get 和 post 两种方法
 */

 export async function get<URL extends keyof IGetRoute>(url: URL, config?: IConfig): Promise<any> {
  const res =  await axios.get(url, config);
  if (!res) {
    throw { msg: '获取数据失败，请重试' };
  }
  const {code, data} = res.data;
  if (code) {
    throw res;
  } else {
    return data;
  }
}

export async function post<URL extends keyof IPostRoute>(url: URL, postdata?: any, config?: IConfig): Promise<any> {
  const res = await axios.post(url, postdata, config);
  if (!res) {
    throw { msg: '获取数据失败，请重试' };
  }
  const {code, data} = res.data;
  if (code) {
    throw res;
  } else {
    return data;
  }
}

// export async function put<URL extends keyof IPostRoute>(url: URL, postdata?: any, config?: IConfig): Promise<any> {
//   const res = await axios.put(url, postdata, config);
//   if (!res) {
//     throw { msg: '获取数据失败，请重试' };
//   }
//   const {code, data} = res.data;
//   if (code) {
//     throw res;
//   } else {
//     return data;
//   }
// }

// export async function dlt<URL extends keyof IPostRoute>(url: URL, config?: IConfig): Promise<any> {
//   const res = await axios.delete(url, config);
//   if (!res) {
//     throw { msg: '获取数据失败，请重试' };
//   }
//   const {code, data} = res.data;
//   if (code) {
//     throw res;
//   } else {
//     return data;
//   }
// }



let close;

axios.interceptors.request.use((config: IConfig) => {
  console.log('[http-rpc-client]call request interceptors');
  if (config.loadingText) {
    close = Loading.loading(config.loadingText);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  console.log('[http-rpc-client]call response interceptors');
  if (close) {
    close();
  }
  if (response && response.data && String(response.data.code) === '401') {
    return KNB.login();
  }
  return response;
}, (error) => {
  if (close) {
    close();
  }
  return Promise.reject(error);
});
