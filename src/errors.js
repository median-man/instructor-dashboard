export class NetworkError extends Error {
  constructor({ code, message = `Request failed with ${code} status code.` }) {
    super(message);
    this.code = code;
  }
}
