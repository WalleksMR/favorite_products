import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError } from '@/application/errors';
import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { PgClient } from '@/infrastructure/database/postgres/entities';

import { ClientsUpdateCommand } from '../commands';

@CommandHandler(ClientsUpdateCommand)
export class ClientsUpdateCommandHandler implements ICommandHandler<ClientsUpdateCommand> {
  constructor(
    @Inject('IUnitOfWorkTypeORM')
    private uow: IUnitOfWorkTypeORM,
  ) {}

  async execute(input: ClientsUpdateCommand): Promise<void> {
    const clientRepo = this.uow.getRepository(PgClient);
    const client = await clientRepo.findOneBy({ id: input.id });

    if (!client) {
      throw new AppError('Cliente não encontrado');
    }

    if (input.name) {
      // client.name = input.name;
    }

    if (input.email) {
      const emailExists = await clientRepo.findOneBy({ email: input.email });
      if (emailExists) {
        throw new AppError('Este e-mail ja existe');
      }
      client.email = input.email;
    }

    await clientRepo.save(client);
  }
}
