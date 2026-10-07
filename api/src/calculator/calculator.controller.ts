import { Body, Controller, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service.js';
import {
  zodCalculatorSchema,
  type CalculatorFormDto,
} from './dto/calculator-inputs.js';
import { PipeParse } from './pipes/pipe-parser.pipe.js';
@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post('calculate')
  async calculate(
    @Body(new PipeParse(zodCalculatorSchema)) calculatorForm: CalculatorFormDto,
  ) {
    try {
      return this.calculatorService.calculate(calculatorForm);
    } catch (err) {
      throw err;
    }
  }
}
