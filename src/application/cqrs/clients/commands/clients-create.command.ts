import { z } from 'zod';

import { AppError } from '@/application/errors';

const ClientsCreateCommandSchema = z.object({
  name: z.string().min(5, 'Nome deve ter no mínimo 5 caracteres'),
  email: z.string().email('E-mail inválido'),
});

type ClientsCreateCommandProps = z.infer<typeof ClientsCreateCommandSchema>;

export class ClientsCreateCommand {
  name: string;
  email: string;

  constructor(props: ClientsCreateCommandProps) {
    const result = ClientsCreateCommandSchema.safeParse(props);
    if (!result.success) {
      const message = result.error.errors[0]?.message;
      throw new AppError(message);
    }
    this.name = props.name;
    this.email = props.email;
  }
}
