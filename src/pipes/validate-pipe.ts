import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidateException } from '../exceptions/validate-exception';

@Injectable()
export class ValidatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if (error.length > 0) {
      const messages = errors.map(err => {
        return `${err.property}: ${Object.values(err.constraints).join(', ')}`
      })
      throw new ValidateException(messages)
    }
  }
}
