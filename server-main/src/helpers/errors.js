export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.code = 'BAD_REQUEST';
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

export class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.code = 'ALREADY_EXISTS';
    this.name = 'AlreadyExistsError';
    this.statusCode = 409;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = 'NOT_FOUND';
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.code = 'UNAUTHORIZED_ACCESS';
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.code = 'SERVICE_UNAVAILABLE';
    this.name = 'ServiceUnavailableError';
    this.statusCode = 451;
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.code = 'INTERNAL_SERVER_ERROR';
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

export class MissingFieldError extends Error {
  constructor(message) {
    super(message);
    this.code = 'MISSING_PARAMETER';
    this.name = 'MissingFieldError';
    this.statusCode = 400;
  }
}

export class TooManyRequestsError extends Error {
  constructor(message) {
    super(message);
    this.code = 'TOO_MANY_REQUESTS';
    this.name = 'TooManyRequestsError ';
    this.statusCode = 429;
  }
}

export class PayloadTooLargeError extends Error {
  constructor(message) {
    super(message);
    this.code = 'PAYLOAD_TOO_LARGE';
    this.name = 'HeavyPayloadError';
    this.statusCode = 413;
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.code = 'REQUEST_FORBIDDEN';
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.code = 'INVALID_REQUEST_BODY';
    this.name = 'ValidationError';
    this.statusCode = 422;
  }
}
