import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

class CalculationExpressionDto {
  @ApiProperty({
    type: String,
    examples: ['2 + 2 - (4 * 2)'],
    description:
      'This property is the expected calculator input. Only the basic operators: +, -, *, / are supported with parenthesis (and nested parenthesis)',
  })
  expression: string;
}

@ApiTags('Calculator')
@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  @ApiOkResponse({ description: 'Calculated Successfully' })
  @HttpCode(200)
  calculateResult(
    @Body() calculationExpressionDto: CalculationExpressionDto,
  ): string {
    return this.calculatorService.calculateResult(
      calculationExpressionDto.expression,
    );
  }
}
