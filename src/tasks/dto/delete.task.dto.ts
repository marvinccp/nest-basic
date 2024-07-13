import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTaskDto {
  @IsNotEmpty()
  @IsString()
  id: string;

}
