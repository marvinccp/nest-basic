import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    /* aquí podemos usar un switch para evaluar el request y todo +
    lo que venga allí
    */

    const request = context.switchToHttp().getRequest()

    /* basicamente en este ejercicio usamos .secure de request
    para decidir si entrar al controller
    */
    return request.secure ?  false :  true
  }
}
