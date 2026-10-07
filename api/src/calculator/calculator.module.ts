import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator.service.js';
import { CalculatorController } from './calculator.controller.js';

@Module({
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
