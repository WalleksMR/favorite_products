import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError } from '@/application/errors';
import { IUnitOfWorkTypeORM } from '@/domain/contracts/gateways';
import { PgClient } from '@/infrastructure/database/postgres/entities';

import { ClientsDeleteCommand } from '../commands';

@CommandHandler(ClientsDeleteCommand)
export class ClientsDeleteCommandHandler implements ICommandHandler<ClientsDeleteCommand, void> {
  constructor(
    @Inject('IUnitOfWorkTypeORM')
    private uow: IUnitOfWorkTypeORM,
  ) {}
  async execute(input: ClientsDeleteCommand): Promise<void> {
    const clientRepo = this.uow.getRepository(PgClient);

    const client = await clientRepo.findOneBy({ id: input.id });
    if (!client) {
      throw new AppError(`Error ao deletar o cliente: "${input.id}" `);
    }

    await clientRepo.remove(client);
  }
}
