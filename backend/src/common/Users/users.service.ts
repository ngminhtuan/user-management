import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async getAllUsers() {
        return await this.userModel.find();
    }

    async signup(user: CreateUserDto) {
        try {
            return await new this.userModel({
                ...user
            }).save()
        } catch (error) {
           throw new BadRequestException('Email already existed')
        }
    }
}
