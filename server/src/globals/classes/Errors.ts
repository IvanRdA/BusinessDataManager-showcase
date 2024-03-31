// This file includes all the custom error classes that I've instancied for better error handleling experience.

export class DatabaseConnection extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'Database connection error'
      }
}

export class DatabaseOperation extends Error {
  constructor(message: string) {
      super(message)
      this.name = 'Database operation error'
    }
}

export class ValidationError extends Error {
  constructor(message: string) {
      super(message)
      this.name = 'Field validation error'
    }
}

export class NoRecordError extends Error {
  constructor(message: string) {
      super(message)
      this.name = 'No record error'
    }
}

export class UniqueFieldRepeated extends Error {
  constructor(message: string) {
      super(message)
      this.name = 'Unique field repeated'
    }
}

export class UserNotAllowed extends Error {
  constructor(message: string) {
      super(message)
      this.name = 'User not allowed'
    }
}

export class NullTokenError extends Error {
  constructor(message: string) {
      super(message)
      this.name = 'Null token'
    }
}

export class InvalidToken extends Error {
  constructor(message: string) {
      super(message)
      this.name = 'Invalid token'
    }
}