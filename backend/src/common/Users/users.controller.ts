import { Get, Body, Post, UseGuards } from '@nestjs/common'
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @UseGuards(AuthGuard())
    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
    
}
