import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsBoolean()
  state: boolean;

  @IsString()
  userId: string; 

  @IsString()
  @IsNotEmpty()
  projectId: string;
}