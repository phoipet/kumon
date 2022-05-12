import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './task/entities/task.entity';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import { User } from './user/entities/user.entity';
import { OrganizationModule } from './organization/organization.module';
import { Organization } from './organization/entities/organization.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [Task, User, Organization],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TaskModule,
    UserModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
