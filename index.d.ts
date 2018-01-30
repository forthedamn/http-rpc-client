
export interface IGetRoute {}

export interface IPostRoute {}

interface IConfig extends AxiosRequestConfig {
  loadingText?: string;
}

import axios, {AxiosRequestConfig, AxiosStatic} from 'axios';

export function get<URL extends keyof IGetRoute>(url: URL, config?: IConfig): IGetRoute[URL];

export function post<URL extends keyof IPostRoute>(url: URL, data?: any, config?: IConfig): IPostRoute[URL];

export interface IHttpError extends Error {
  code: number;
  data: any;
  msg: string;
}

export const instance: AxiosStatic;
