import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './common/Auth/auth.module';
import { UsersModule } from './common/Users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DBSTRING),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
