import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  project: string;

  @IsNumber()
  time: number;

  @IsArray()
  @IsOptional()
  userId?: string[] 

}
