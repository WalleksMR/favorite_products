import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { IHttpClient } from '@/domain/contracts/gateways/http-client';

@Injectable()
export class AxiosHttpClientService implements IHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  async fetch<T>(url: string, options?: IHttpClient.FetchOptions): Promise<IHttpClient.FetchResponse<T>> {
    const config: AxiosRequestConfig = {
      url,
      method: options?.method,
      headers: options?.headers,
      data: options?.body,
      params: options?.params,
      validateStatus: () => true,
    };

    const response = await this.axiosInstance.request<T>(config);

    return {
      status: response.status,
      data: response.data,
    };
  }
}
