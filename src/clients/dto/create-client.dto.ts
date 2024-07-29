import {
  IsArray,
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

  @IsNumber()
  @IsOptional()
  cp:number
}
