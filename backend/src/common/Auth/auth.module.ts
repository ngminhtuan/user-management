import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../Users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Users/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersService } from '../Users/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>(process.env.JWT_SECRET),
          signOptions: { expiresIn: process.env.JWT_EXPIRES },
        }
      },
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [ PassportModule]
})
export class AuthModule { }
