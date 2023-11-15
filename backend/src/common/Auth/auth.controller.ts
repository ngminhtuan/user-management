import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SigninDto } from '../Users/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() user: CreateUserDto): Promise<{token: string}> {
        return await this.authService.signup(user)
    }

    @Post('signin')
    async signin(@Body() user: SigninDto): Promise<{token: string}> {
        return await this.authService.signin(user)
    }
}
