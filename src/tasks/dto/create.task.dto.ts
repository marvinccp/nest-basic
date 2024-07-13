import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsBoolean()
  state: boolean;

  @IsString()
  @IsNotEmpty()
  userId: string; 
}