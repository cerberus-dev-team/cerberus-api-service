export class AuthException extends Error {
  constructor(message: string) {
    super(message)
    this.name = "AuthExceptionError"
  }
}
