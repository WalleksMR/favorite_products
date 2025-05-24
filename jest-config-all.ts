/* eslint-disable import/no-unresolved */
import configs from './jest.config';

export default { ...configs, testMatch: ['**/*e2e.ts', '**/*.spec.ts'] };
