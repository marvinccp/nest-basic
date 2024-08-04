import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.role && user.rol.includes('admin')) {
      return super.canActivate(context) as boolean | Promise<boolean>;
    } else {
      throw new ForbiddenException('You do not have the required role');
    }
  }
}
