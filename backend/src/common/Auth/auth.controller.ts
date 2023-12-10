import { Body, Controller, Post, Req, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import { AuthService } from './auth.service';
import { CreateUserDto } from '../Users/dtos/create-user.dto';
import { AuthDto } from './dtos/auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
// import { CreateUserDto, SigninDto } from '../Users/dtos/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('signin')
    signin(@Body() data: AuthDto) {
        return this.authService.signIn(data);
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logout(req.user['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }

}
