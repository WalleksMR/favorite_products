import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { sign } from 'jsonwebtoken';

import { AppError } from '@/application/errors';
import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { PgClient } from '@/infrastructure/database/postgres/entities';
import { env } from '@/main/config/environment';

import { AuthLoginQuery } from '../queries';

@QueryHandler(AuthLoginQuery)
export class AuthLoginQueryHandler implements IQueryHandler<AuthLoginQuery, Output> {
  constructor(
    @Inject('IUnitOfWorkTypeORM')
    private readonly uow: IUnitOfWorkTypeORM,
  ) {}

  async execute(input: AuthLoginQuery): Promise<Output> {
    const client = await this.uow.getRepository(PgClient).findOne({
      where: { email: input.email },
      select: ['id', 'name', 'email'],
    });

    if (!client) {
      throw new AppError('Usuario inválido');
    }

    const accessToken = sign(
      {
        id: client.id,
        name: client.name,
        email: client.email,
      },
      env.jwt.secret,
      {
        expiresIn: env.jwt.expiresIn,
      },
    );

    return { accessToken };
  }
}

type Output = {
  accessToken: string;
};
