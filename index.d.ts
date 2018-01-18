
export interface IGetRoute {}

export interface IPostRoute {}

import axios, {AxiosRequestConfig} from 'axios';

export function get<URL extends keyof IGetRoute>(url: URL, config?: AxiosRequestConfig): IGetRoute[URL];

export function post<URL extends keyof IPostRoute>(url: URL, data?: any, config?: AxiosRequestConfig): IPostRoute[URL];

export interface IHttpError extends Error {
  code: number;
  data: any;
  msg: string;
}
