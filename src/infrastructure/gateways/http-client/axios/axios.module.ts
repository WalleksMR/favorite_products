import { Module } from '@nestjs/common';

import { HttpClientAxiosService } from './axios.service';

@Module({
  providers: [{ provide: 'IHttpClientAxios', useClass: HttpClientAxiosService }],
  exports: ['IHttpClientAxios'],
})
export class HttpClientAxiosModule {}
