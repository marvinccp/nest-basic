import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { HolaModule } from './hola/hola.module';
import { PaymentsModule } from './payments/payments.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [

    TaskModule,
    ProjectsModule,
    AuthModule,
    UsersModule,
    HolaModule,
    PaymentsModule,
  ],

  controllers: [],

  providers: [],
})
export class AppModule {}
