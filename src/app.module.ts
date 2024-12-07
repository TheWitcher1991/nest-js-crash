import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.entity';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { Role } from './roles/entities/roles.entity';
import { UserRoles } from './roles/entities/user-roles.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.entity';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

const configModules = [
  UsersModule, RolesModule, AuthModule, PostsModule
]

const libModules = [
  ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
  }),
  ServeStaticModule.forRoot({
    rootPath: path.resolve(__dirname, 'uploads'),
  }),
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_PASSWORD,
    models: [User, Role, UserRoles, Post],
    autoLoadModels: true,
  })
]

@Module({
  imports: [...libModules, ...configModules, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
