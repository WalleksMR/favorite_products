export class InvalidParameterError extends Error {
  constructor(message?: string) {
    super(message ? message : 'Invalid parameter');
    this.name = 'InvalidParameterError';
  }
}
export class AppError extends Error {
  constructor(message?: string) {
    super(message ? message : 'App error');
    this.name = 'AppError';
  }
}
