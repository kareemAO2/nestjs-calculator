import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class PipeParse<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodSchema<T>) {}
  transform(value: any): T {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      throw new BadRequestException({
        message: 'Invalid data',
        errors: formattedErrors,
      });
    }
    return result.data;
  }
}
