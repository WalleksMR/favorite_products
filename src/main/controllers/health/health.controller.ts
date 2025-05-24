import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  TypeOrmHealthIndicator,
  HealthCheckService,
  HealthCheck,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

import { Public } from '@/main/common/decorators/auth';
import { EnvHealthIndicator } from '@/main/helpers/controllers';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private readonly heathCheck: HealthCheckService,
    private readonly typeormCheck: TypeOrmHealthIndicator,
    private readonly diskCheck: DiskHealthIndicator,
    private readonly memoryCheck: MemoryHealthIndicator,
    private readonly envCheck: EnvHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  async healthCheck() {
    return await this.heathCheck.check([
      () => this.typeormCheck.pingCheck('database', { timeout: 3000 }),
      () => this.diskCheck.checkStorage('storage', { thresholdPercent: 0.9, path: '/' }),
      () => this.memoryCheck.checkHeap('memory_heap', 200 * 1024 * 1024),
      () => this.envCheck.isHealthy('env'),
    ]);
  }
}
