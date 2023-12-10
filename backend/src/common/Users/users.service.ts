import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async getAllUsers() {
        return await this.userModel.find();
    }

    async findById(id: string): Promise<UserDocument> {
        return this.userModel.findById(id);
    }

    async findbyEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({ email }).exec();
    }

    async findByUsername(username: string): Promise<UserDocument> {
        return this.userModel.findOne({ username }).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<UserDocument> {
        return this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
    }

    async remove(id: string): Promise<UserDocument> {
        return this.userModel.findByIdAndDelete(id).exec();
    }

}
