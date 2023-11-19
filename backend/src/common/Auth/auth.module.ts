import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../Users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Users/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      // global: true,
      // secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: process.env.JWT_EXPIRES },
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
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
