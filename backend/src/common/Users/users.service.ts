import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async getAllUsers() {
        return await this.userModel.find();
    }

}
