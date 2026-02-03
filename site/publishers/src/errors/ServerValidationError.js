export default class ServerValidationError extends Error {
  constructor(message, fields) {
    super(message);

    this.name = "ValidationError";
    this.fields = fields;
  }
}
