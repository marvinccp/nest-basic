import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatorPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
  const codeNumber = parseInt(value.code.toString(), 10)
    return {...value, code:codeNumber};
  }
}