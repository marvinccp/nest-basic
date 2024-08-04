import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    console.log(email, password);
    const user = await this.authService.validateuser(email, password);
    console.log(user);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }


  @Post('refresh-token')
  async refreshToken(@Body() rtoken:RefreshTokenDto){

    return this.authService.refreshToken(rtoken.refreshToken)
  }
}
