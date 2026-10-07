import * as z from 'zod';

export const zodCalculatorSchema = z.object({
  num1: z.number(),
  num2: z.number(),
  operator: z.enum(['+', '-', '/', '*']),
});

export type CalculatorFormDto = z.infer<typeof zodCalculatorSchema>;
