import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';
import { DivisionByZeroException } from './exceptions/division_by_zero_exception';

describe('CalculatorController', () => {
  let app: TestingModule;
  let appController: CalculatorController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService],
    }).compile();

    appController = app.get(CalculatorController);
  });

  describe('getResult', () => {
    test('when sending an isolated number without any sort of operation, it should return the number', () => {
      const isolatedNumber = '1';

      calculateAndAssert(isolatedNumber, isolatedNumber);
    });

    test('when sending a sum of numbers, it should return the expected sum', () => {
      const aSumOfNumbers = '1 + 1';
      const expectedResult = '2';

      calculateAndAssert(aSumOfNumbers, expectedResult);
    });

    test('when sending multiple sums of numbers, it should return the chained sum', () => {
      const aChainedSumOfNumbers = '1 + 1 + 1';
      const expectedResult = '3';

      calculateAndAssert(aChainedSumOfNumbers, expectedResult);
    });

    test('when sending a multiplication of numbers, it should return the expected multiplication result', () => {
      const aMultiplicationOfNumbers = '2 * 2';
      const expectedResult = '4';

      calculateAndAssert(aMultiplicationOfNumbers, expectedResult);
    });

    test('when sending a chained multiplication of numbers, it should return the expected chained multiplication result', () => {
      const aChainedMultiplicationOfNumbers = '2 * 2 * 2';
      const expectedResult = '8';

      calculateAndAssert(aChainedMultiplicationOfNumbers, expectedResult);
    });

    test('when sending a subtraction of numbers, it should return the subtracted number', () => {
      const aSubtractionOfNumbers = '2 - 2';
      const expectedResult = '0';

      calculateAndAssert(aSubtractionOfNumbers, expectedResult);
    });

    test('when sending a chained subtraction of numbers, it should return the subtracted number chain result', () => {
      const aChainedSubtractionOfNumbers = '2 - 2 - 2';
      const expectedResult = '-2';

      calculateAndAssert(aChainedSubtractionOfNumbers, expectedResult);
    });

    test('when sending a division of numbers, it should return the result of the division with the first number as the divisor, and the second as the dividend', () => {
      const aDivisionOfNumbers = '8 / 2';
      const expectedResult = '4';

      calculateAndAssert(aDivisionOfNumbers, expectedResult);
    });

    test('when sending a chained division of numbers, it should return the result of the chained division, from left to right', () => {
      const aChainedDivisionOfNumbers = '8 / 2 / 2';
      const expectedResult = '2';

      calculateAndAssert(aChainedDivisionOfNumbers, expectedResult);
    });

    test('can mix sums and subtractions', function () {
      const mixedSumAndSubtractions = '8 + 2 - 2';
      const expectedResult = '8';

      calculateAndAssert(mixedSumAndSubtractions, expectedResult);
    });

    test('can mix multiplications and divisions', function () {
      const mixedMultiplicationsAndDivisions = '8 * 2 / 4';
      const expectedResult = '4';

      calculateAndAssert(mixedMultiplicationsAndDivisions, expectedResult);
    });

    test('sums and subtractions have less precedence than multiplications and divisions', function () {
      const anExpressionShowcasingThePrecedence = '2 * 4 + 4 / 2';
      const expectedResult = '10';

      calculateAndAssert(anExpressionShowcasingThePrecedence, expectedResult);
    });

    test('parentheses have more precedence than multiplications and divisions', function () {
      const anExpressionWithParentheses = '2 * (4 + 4) / 2';
      const expectedResult = '8';

      calculateAndAssert(anExpressionWithParentheses, expectedResult);
    });

    test('can handle multiple parentheses', function () {
      const multipleParenthesisCalculation = '2 * (4 + 4) + 2 * (4 + 2)';
      const expectedResult = '28';

      calculateAndAssert(multipleParenthesisCalculation, expectedResult);
    });

    test('can handle inner parentheses', function () {
      const nestedParenthesisCalculation = '2 * (4 * (2 + 4))';
      const expectedResult = '48';

      calculateAndAssert(nestedParenthesisCalculation, expectedResult);
    });

    test('it throws an error when dividing by zero', function () {
      const forbiddenOperation = '2 / 0';

      const divideByZeroCallback = () =>
        appController.calculateResult({
          expression: forbiddenOperation,
        });

      expect(divideByZeroCallback).toThrow(DivisionByZeroException);
    });
  });

  function calculateAndAssert(anExpression: string, expectedResult: string) {
    const result = appController.calculateResult({
      expression: anExpression,
    });

    expect(result).toBe(expectedResult);
  }
});
