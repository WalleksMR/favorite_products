import { Type } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';
import { ClientsController } from './clients/clients.controller';
import { HealthController } from './health/health.controller';

const controllers: Type<any>[] = [ClientsController, AuthController, HealthController];

export { controllers };
