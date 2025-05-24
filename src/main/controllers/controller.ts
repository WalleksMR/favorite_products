import { Type } from '@nestjs/common';

import { ClientsController } from './clients/clients.controller';
import { HealthController } from './health/health.controller';

const ControllersWithMiddleware = [ClientsController];

const controllers: Type<any>[] = [...ControllersWithMiddleware, HealthController];

export { ControllersWithMiddleware, controllers };
