import { IsString, IsNotEmpty } from "class-validator";
export class LoginDto {
    @IsString()
    @IsNotEmpty({
        message: 'username is required'
    })
     name: string;
  
    @IsString()
    @IsNotEmpty({
        message: 'password is required'
    })
     password: string;
  }