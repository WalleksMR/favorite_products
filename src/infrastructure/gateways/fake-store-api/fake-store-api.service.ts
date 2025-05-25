import { Inject } from '@nestjs/common';

import { IFakeStoreAPI } from '@/application/contracts/gateways';
import { IHttpClient } from '@/domain/contracts/gateways';

export class FakeStoreAPIService implements IFakeStoreAPI {
  private readonly BASE_URL = 'https://fakestoreapi.com';

  constructor(
    @Inject('IHttpClientAxios')
    private httpClient: IHttpClient,
  ) {}

  async getProducts(): Promise<IFakeStoreAPI.GetProductsResponse> {
    const response = await this.httpClient.fetch<IFakeStoreAPI.GetProductsResponse>(`${this.BASE_URL}/products`);
    return response.data;
  }

  async getProductById(id: string): Promise<IFakeStoreAPI.GetProductByIdResponse> {
    const response = await this.httpClient.fetch<IFakeStoreAPI.GetProductByIdResponse>(
      `${this.BASE_URL}/products/${id}`,
    );
    return response.data;
  }
}
