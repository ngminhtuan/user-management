import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../Users/user.schema';
import { CreateUserDto, SigninDto } from '../Users/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async signup(user: CreateUserDto): Promise<{ token: string }> {
        const { username, email, password } = user

        const hashedPassword = await bcrypt.hash(password, 10)

        const existedUser = await this.userModel.find({ email })
        if (existedUser.length > 0) throw new BadRequestException('Email already existed')
        const newUser = await this.userModel.create({
            username,
            email,
            password: hashedPassword
        })
        const token = this.jwtService.sign({ id: newUser._id }, {secret: process.env.JWT_SECRET})
        return { token }

    }

    async signin(user: SigninDto): Promise<{ token: string }> {
        const { email, password } = user;

        const signinUser = await this.userModel.findOne({ email });

        if (!signinUser) {
            throw new UnauthorizedException("Invalid email")
        }

        const isPasswordMatched = await bcrypt.compare(password, signinUser.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException("Invalid password")
        }

        const token = this.jwtService.sign({ id: signinUser._id }, {secret: process.env.JWT_SECRET})
        return { token }
    }
}
