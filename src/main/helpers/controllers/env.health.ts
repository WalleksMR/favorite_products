import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';

@Injectable()
export class EnvHealthIndicator extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const { PORT, NODE_ENV } = process.env || {};

    const isHealthy = [PORT, NODE_ENV].every(Boolean);

    const result = this.getStatus(key, isHealthy, { PORT, NODE_ENV });

    if (isHealthy) {
      return result;
    }

    throw new HealthCheckError('Check env failed', result);
  }
}
