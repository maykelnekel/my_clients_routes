class ResponseError extends Error {
  status: number
  constructor(status: number, msg: string) {
      super(msg);
      this.status = status
      Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

export default ResponseError;