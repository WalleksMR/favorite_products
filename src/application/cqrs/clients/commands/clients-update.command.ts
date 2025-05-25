import { z } from 'zod';

import { AppError } from '@/application/errors';

const ClientsUpdateCommandSchema = z.object({
  id: z.string().uuid({ message: 'Id inválido' }),
  name: z.string().min(5, 'Nome deve ter no mínimo 10 caracteres'),
  email: z.string().email('E-mail inválido'),
});

type ClientsUpdateCommandProps = z.infer<typeof ClientsUpdateCommandSchema>;

export class ClientsUpdateCommand {
  id: string;
  name: string;
  email: string;

  constructor(props: ClientsUpdateCommandProps) {
    const result = ClientsUpdateCommandSchema.safeParse(props);
    if (!result.success) {
      const message = result.error.errors[0]?.message;
      throw new AppError(message);
    }
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }
}
