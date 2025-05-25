import { z } from 'zod';

import { AppError } from '@/application/errors';

const ClientsGetByIdQuerySchema = z.object({
  id: z.string().uuid({ message: 'Id inválido' }),
  withFavoriteProducts: z.boolean().optional(),
});
type ClientsGetByIdQueryProps = z.infer<typeof ClientsGetByIdQuerySchema>;

export class ClientsGetByIdQuery {
  id: string;
  withFavoriteProducts: boolean;
  constructor(props: ClientsGetByIdQueryProps) {
    const result = ClientsGetByIdQuerySchema.safeParse(props);
    if (!result.success) {
      const message = result.error.errors[0]?.message;
      throw new AppError(message);
    }

    this.id = props.id;
    this.withFavoriteProducts = props.withFavoriteProducts ?? false;
  }
}
