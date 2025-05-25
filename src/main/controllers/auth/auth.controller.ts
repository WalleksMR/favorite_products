import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthLoginQuery } from '@/application/cqrs/auth/queries';
import { Public } from '@/main/common/decorators/auth';

import { AuthLoginBodyDto } from './dto';

@ApiTags(AuthController.ROUTE)
@Public()
@Controller(AuthController.ROUTE)
export class AuthController {
  static ROUTE = 'auth';

  constructor(private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Login', description: 'Use o email `johndoe@email.com` para fazer login' })
  @Post('login')
  async login(@Body() body: AuthLoginBodyDto) {
    return this.queryBus.execute(new AuthLoginQuery(body.email));
  }
}
