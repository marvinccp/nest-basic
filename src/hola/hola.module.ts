import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { HolaController } from './hola.controller';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from 'src/users/logger/logger.middleware';

@Module({
  controllers: [HolaController],
  imports: [UsersModule],
})
/* asi funciona el modulo sin middlewares
export class HolaModule {}
*/

//middleware configurado
export class HolaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /* Aquí el middleware se aplica a todas las rutas 'users' */
    // consumer.apply(LoggerMiddleware).forRoutes('users');

    /*     aqui se aplica solo al get
     */

    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/users',
      method: RequestMethod.GET,
    });
  }
}
