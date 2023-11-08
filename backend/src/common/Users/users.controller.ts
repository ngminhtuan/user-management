import { Get, Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    async signup(@Body() user: CreateUserDto) {
        await this.userService.signup(user)
    }
}
