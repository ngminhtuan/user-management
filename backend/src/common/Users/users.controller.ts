import { Get, Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
    
}
