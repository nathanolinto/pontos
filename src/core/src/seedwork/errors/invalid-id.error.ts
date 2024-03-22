export class InvalidIdError extends Error {
  constructor(message?: string) {
    super(message || 'Id must be a valid MongoId');
    this.name = 'InvalidIdError';
  }
}
