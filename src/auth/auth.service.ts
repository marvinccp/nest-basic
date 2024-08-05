import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateuser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    console.log(user.password, password);
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const refreshTokenPayload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload,{
        expiresIn: '30s'
      }),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        secret: process.env.SECRET_REFRESH,
        expiresIn: '7d',
      }),
      user
    };
  }


  async refreshToken(refreshToken:string){

    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: process.env.SECRET_REFRESH });
      console.log(decoded);
    const user = await this.userService.getUser(decoded.sub)
    console.log(user);
    if (!user) {
      throw new Error('Invalid refresh token');
    }
    const payload = { email: user.email, sub: user.name };
    const newAccessToken = this.jwtService.sign(payload, {expiresIn: '30m'});
    return {
      access_token: newAccessToken,
    };
    } catch (error) {
      throw new Error('Invalid refresh token');

    }
    

  }
}
