import { z } from 'zod';

import { AppError } from '@/application/errors';

const ClientsDeleteCommandSchema = z.object({
  id: z.string().uuid({ message: 'Id inválido' }),
});

export class ClientsDeleteCommand {
  id: string;

  constructor(id: string) {
    const result = ClientsDeleteCommandSchema.safeParse({ id });
    if (!result.success) {
      const message = result.error.errors[0]?.message;
      throw new AppError(message);
    }
    this.id = id;
  }
}
