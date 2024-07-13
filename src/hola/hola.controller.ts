import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { ValidatorPipePipe } from './pipes/validator-pipe/validator-pipe.pipe';
import { AuthGuardGuard } from './guards/auth-guard/auth-guard.guard';

export interface Query {
  limit: string;
  hola: string;
}

@Controller()
export class HolaController {
  /* Utilizando la sintaxis de express */
  @Get('/')
  index(@Req() request: Request, @Res() response: Response) {
    response.status(200).json({
      message: 'Hello Word',
    });
  }

  constructor(private userService: UsersService) {}

  @Get('/newusers')
  showUsers() {
    return this.userService.getUsers();
  }

  @Post()
  getQuery(@Query() query: Query) {
    console.log(query.limit);
    return query;
  }

  @Get('/obtname/:name')
  getNamePar(@Param() name: CreateUserDto) {
    console.log(name);
    return name.name;
  }
  /* si realizamos esta petición si usar el ParseIntPipe, se realizar la
cocatenación del value con el 10, caso contrario se harála suma
 ejemplo muy muy sencillo del uso de pipes!! basicamente ha convertido el string a number */
  @Get('/hacersuma/:value')
  transformNumber(@Param('value', ParseIntPipe) value: string) {
    console.log(value);
    return value + 10;
  }

  /* otro ejemplo, es cuando recibes un booleano como param */

  @Get('/isAuthorized/:auth')
  isAuthorized(@Param('auth') auth: boolean) {
    console.log(typeof auth);
    return auth ? 'Yeahhh' : 'Noooooo';
  }

  /* de esta forma siempre dira yeahh ya que al ser un string es si existe
  auth
  */
  @Get('/isAuthorized2/:auth')
  isAuthorized2(@Param('auth', ParseBoolPipe) auth: boolean) {
    console.log(typeof auth);
    return auth ? 'Yeahhh' : 'Noooooo';
  }
  /* En este caso al usar ParBoolPipe, el comportamiento fue el esperado
  al tratar el dato como un booleano
  */

  /* Pipe personalizados */

  @Get('message')
  @UseGuards(AuthGuardGuard)
  authMessage(@Query(ValidatorPipePipe) query: { authmessage: string; code: number }) {
    return query.code === 123 ? 'GO' : 'STOP'
  }

  /* Ene este caso se ha creado un pipe que trasnforma el string en number */
}
