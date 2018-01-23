
export interface IGetRoute {}

export interface IPostRoute {}

import axios, {AxiosRequestConfig} from 'axios';

/**
 * 目前提供 get 和 post 两种方法
 */

 export async function get<URL extends keyof IGetRoute>(url: URL, config?: AxiosRequestConfig): Promise<any> {
  const res =  await axios.get(url, config);
  if (!res) {
    throw { msg: '请求失败，没有数据返回' };
  }
  const {code, data} = res.data;
  if (code) {
    throw res;
  } else {
    return data;
  }
}

export async function post<URL extends keyof IPostRoute>(url: URL, postdata?: any, config?: AxiosRequestConfig): Promise<any> {
  const res = await axios.post(url, postdata, config);
  if (!res) {
    throw { msg: '请求失败，没有数据返回' };
  }
  const {code, data} = res.data;
  if (code) {
    throw res;
  } else {
    return data;
  }
}