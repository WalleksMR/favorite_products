import { Type } from '@nestjs/common';

import { HealthController } from './health/health.controller';

const ControllersWithMiddleware = [];

const controllers: Type<any>[] = [...ControllersWithMiddleware, HealthController];

export { ControllersWithMiddleware, controllers };
