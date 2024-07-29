import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  last: string;

  @IsString()
  email: string;

  @IsNumber()
  phone: number;

  @IsString()
  adress: string;

  @IsNumber()
  @IsOptional()
  cp:number
}
