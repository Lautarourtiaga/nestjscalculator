import { HttpException, HttpStatus } from '@nestjs/common';

export class DivisionByZeroException extends HttpException {
  static DIVISION_BY_ZERO_ERROR_MESSAGE = 'Cannot divide by Zero >;)';
  constructor() {
    super(
      DivisionByZeroException.DIVISION_BY_ZERO_ERROR_MESSAGE,
      HttpStatus.BAD_REQUEST,
    );
  }
}
