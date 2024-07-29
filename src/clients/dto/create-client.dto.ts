import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsNumber()
  last: string;

  @IsArray()
  email: string;

  @IsNumber()
  phone: number;

  @IsString()
  adress: string;
}
