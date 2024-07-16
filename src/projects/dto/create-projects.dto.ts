import { IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  project: string;

  @IsNumber()
  time: number;

  @IsString()
  userId:string
}
