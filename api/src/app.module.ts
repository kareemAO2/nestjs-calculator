import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CalculatorController } from './calculator/calculator.controller.js';
import { CalculatorService } from './calculator/calculator.service.js';
import { CalculatorModule } from './calculator/calculator.module.js';

@Module({
  imports: [CalculatorModule],
  controllers: [AppController, CalculatorController],
  providers: [AppService, CalculatorService],
})
export class AppModule {}
