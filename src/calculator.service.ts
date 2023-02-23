import { Injectable } from '@nestjs/common';
import { DivisionByZeroException } from './exceptions/division_by_zero_exception';
type Operation = (aNumber: number, anotherNumber: number) => number;

@Injectable()
export class CalculatorService {
  calculateResult(expression: string): string {
    const simplifiedExpression = this.calculateAllParentheses(expression);
    return this.calculateWithPrecedence(simplifiedExpression);
  }

  private calculateAllParentheses(expression: string): string {
    const parenthesesRX = new RegExp(/\(([^()]*)\)/);

    let simplifiedExpression = expression;

    let match = parenthesesRX.exec(simplifiedExpression);

    while (match) {
      const parenthesesResult = this.calculateWithPrecedence(match[1]);

      simplifiedExpression = simplifiedExpression.replace(
        match[0],
        parenthesesResult,
      );

      match = parenthesesRX.exec(simplifiedExpression);
    }

    return simplifiedExpression;
  }

  private calculateWithPrecedence(expression: string): string {
    const processDivisions = (exp) =>
      this.calculateOperation(exp.split('/'), (a, b) => {
        if (b === 0) {
          throw new DivisionByZeroException();
        }
        return a / b;
      });

    const processMultiplications = (exp) =>
      this.calculateOperation(
        exp.split('*').map(processDivisions),
        (a, b) => a * b,
      );

    const processSubstractions = (exp) =>
      this.calculateOperation(
        exp.split('-').map(processMultiplications),
        (a, b) => a - b,
      );

    const processSum = (exp) =>
      this.calculateOperation(
        exp.split('+').map(processSubstractions),
        (a, b) => a + b,
      );

    return processSum(expression);
  }

  private calculateOperation(members: string[], operation: Operation): string {
    return members.reduce((aNumber, anotherNumber) =>
      String(operation(parseFloat(aNumber), parseFloat(anotherNumber))),
    );
  }
}
