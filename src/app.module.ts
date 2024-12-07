import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/users.entity';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

const configModules = [
  UsersModule, RolesModule
]

const libModules = [
  ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
  }),
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_PASSWORD,
    models: [User],
    autoLoadModels: true,
  })
]

@Module({
  imports: [...libModules, ...configModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
