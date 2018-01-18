
export interface IGetRoute {}

export interface IPostRoute {}

import axios, {AxiosRequestConfig} from 'axios';

export default class Request {
  get<URL extends keyof IGetRoute>(url: URL, config?: AxiosRequestConfig): IGetRoute[URL];
  post<URL extends keyof IPostRoute>(url: URL, data?: any, config?: AxiosRequestConfig): IPostRoute[URL];
}

export interface IHttpError extends Error {
  code: number;
  data: any;
  msg: string;
}
