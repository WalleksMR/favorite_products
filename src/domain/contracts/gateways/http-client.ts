export interface IHttpClient {
  fetch<T>(url: string, options?: IHttpClient.FetchOptions): Promise<IHttpClient.FetchResponse<T>>;
}

export namespace IHttpClient {
  export type FetchOptions = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: unknown;
    params?: Record<string, string>;
  };

  export type FetchResponse<T> = {
    status: number;
    data: T;
  };
}
