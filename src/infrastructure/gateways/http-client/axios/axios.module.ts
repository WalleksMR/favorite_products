import { Module } from '@nestjs/common';

import { AxiosHttpClientService } from './axios.service';

@Module({
  providers: [{ provide: 'IHttpClientAxios', useClass: AxiosHttpClientService }],
  exports: ['IHttpClientAxios'],
})
export class AxiosHttpClientModule {}
