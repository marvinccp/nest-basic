import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  project: string;

  @IsNumber()
  time: number;

  @IsArray()
  @IsOptional()
  userId?: string[];

  @IsString()
  title: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  clientId: string;
}
