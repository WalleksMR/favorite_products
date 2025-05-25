import { Module } from '@nestjs/common';

import { FakeStoreAPIService } from './fake-store-api.service';

@Module({
  providers: [
    {
      provide: 'IFakeStoreAPI',
      useClass: FakeStoreAPIService,
    },
  ],
  exports: ['IFakeStoreAPI'],
})
export class FakeStoreAPIModule {}
