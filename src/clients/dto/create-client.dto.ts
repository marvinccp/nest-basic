import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'Name in required'})
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
