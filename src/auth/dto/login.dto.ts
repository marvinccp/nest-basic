import { IsString, IsNotEmpty } from "class-validator";
export class LoginDto {
    @IsString()
    @IsNotEmpty({
        message: 'email is required'
    })
     email: string;
  
    @IsString()
    @IsNotEmpty({
        message: 'password is required'
    })
     password: string;
  }