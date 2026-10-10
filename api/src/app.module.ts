import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CalculatorModule } from './calculator/calculator.module.js';

@Module({
  imports: [CalculatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
