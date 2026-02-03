export class ServerGenericError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "ServerGenericError";
    this.statusCode = statusCode;
  }
}
