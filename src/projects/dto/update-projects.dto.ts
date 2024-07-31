import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  project?: string;

  @IsNumber()
  @IsOptional()
  time?: number;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  postalCode: string;

  @IsString()
  address: string;
}
