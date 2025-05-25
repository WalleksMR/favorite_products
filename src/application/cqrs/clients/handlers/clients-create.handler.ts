import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError } from '@/application/errors';
import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { Client } from '@/domain/entities';
import { PgClient } from '@/infrastructure/database/postgres/entities';

import { ClientsCreateCommand } from '../commands';

@CommandHandler(ClientsCreateCommand)
export class ClientsCreateCommandHandler implements ICommandHandler<ClientsCreateCommand, void> {
  constructor(
    @Inject('IUnitOfWorkTypeORM')
    private uow: IUnitOfWorkTypeORM,
  ) {}

  async execute(input: ClientsCreateCommand): Promise<void> {
    const clientRepo = this.uow.getRepository(PgClient);

    const emailExists = await clientRepo.findOne({ where: { email: input.email } });
    if (emailExists) {
      throw new AppError('E-mail ja existe');
    }

    const newClient = new Client({
      email: input.email,
    });

    await clientRepo.save(newClient);
  }
}
