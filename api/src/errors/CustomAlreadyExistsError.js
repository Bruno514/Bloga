// errors/CustomAlreadyExistsError.js

export default class CustomAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = "AlreadyExistsError";
  }
}
