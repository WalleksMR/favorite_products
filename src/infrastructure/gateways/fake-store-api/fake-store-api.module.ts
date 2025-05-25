import { Module } from '@nestjs/common';

import { FakeStoreAPIService } from './fake-store-api.service';
import { HttpClientAxiosModule } from '../http-client/axios/axios.module';

@Module({
  imports: [HttpClientAxiosModule],
  providers: [
    {
      provide: 'IFakeStoreAPI',
      useClass: FakeStoreAPIService,
    },
  ],
  exports: ['IFakeStoreAPI'],
})
export class FakeStoreAPIModule {}
