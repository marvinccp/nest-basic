import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsBoolean()
  state: boolean;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}