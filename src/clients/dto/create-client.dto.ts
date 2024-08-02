import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  last: string;

  @IsNotEmpty({ message: 'email  is required' })
  @IsString()
  @IsEmail({}, { message: 'Invalid format' })
  email: string;

  @IsNumber()
  @IsNotEmpty({ message: 'phone  is required' })

  phone: number;

  @IsString()
  @IsNotEmpty({ message: 'Address  is required' })

  adress: string;

  @IsNumber()
  @IsOptional()
  cp: number;
}
