import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CalculatorService } from '../src/calculator.service';
import { DivisionByZeroException } from '../src/exceptions/division_by_zero_exception';

describe('CalculatorController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (Post) should handle complex calculations (as in the example given)', () => {
    return request(app.getHttpServer())
      .post('/calculator')
      .send({ expression: '10 * (2 + 5) * 10' })
      .expect(200)
      .expect('700');
  });

  it('/ (Post) should fail with a comprehensive error message if the user tries to divide by zero', () => {
    return request(app.getHttpServer())
      .post('/calculator')
      .send({ expression: '1 / 0' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: DivisionByZeroException.DIVISION_BY_ZERO_ERROR_MESSAGE,
      });
  });
});
