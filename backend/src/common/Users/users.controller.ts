import { Get, Body, Post, UseGuards, Param, Patch, Delete } from '@nestjs/common'
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    // @UseGuards(AuthGuard())
    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

}
