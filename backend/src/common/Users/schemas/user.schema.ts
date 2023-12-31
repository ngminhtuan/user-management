import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = Document & User

@Schema({
    timestamps: true
})

export class User {
    @Prop({required: true})
    username: string;

    @Prop({required: true})
    email: string;
    
    @Prop({type: String})
    password?: string;

    @Prop()
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
