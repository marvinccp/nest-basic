import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  task?: string;

  @IsOptional()
  @IsBoolean()
  state?: boolean;
}