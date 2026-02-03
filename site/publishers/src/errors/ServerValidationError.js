export class ServerValidationError extends Error {
  constructor(message, fields) {
    super(message);

    this.name = "ServerValidationError";
    this.fields = fields;
  }
}
