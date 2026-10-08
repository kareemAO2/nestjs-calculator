import { BadRequestException, Injectable } from '@nestjs/common';
import { CalculatorFormDto } from './dto/calculator-inputs.js';
import { operationFunctions } from './OperationConstants.js';

const operatonsMap = {
  '+': 'ADD',
  '-': 'SUBTRACT',
  '/': 'DIVIDE',
  '*': 'MULTIPLY',
};

@Injectable()
export class CalculatorService {
  calculate(calculatorForm: CalculatorFormDto) {
    if (calculatorForm.operator === '/' && calculatorForm.num2 === 0) {
      throw new BadRequestException('Division by zero');
    }
    const operator = operatonsMap[calculatorForm.operator];
    const arthmeticFunc = operationFunctions[operator];
    return {
      result: parseFloat(
        arthmeticFunc(calculatorForm.num1, calculatorForm.num2).toFixed(8),
      ),
    };
  }
}
