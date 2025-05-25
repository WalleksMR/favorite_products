import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { env } from '../environment';

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwt.secret,
    }),
  ],
})
export class JwtConfigModule {}
