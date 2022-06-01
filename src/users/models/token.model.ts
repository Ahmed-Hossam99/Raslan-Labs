import { ApiResponseProperty } from "@nestjs/swagger";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TokenType
{
    WEB = "WEB",
    IOS = "IOS",
    ANDROID = "ANDROID",
}

import { Document } from 'mongoose';

@Schema()
export class Token
{

    @Prop()
    token!: number;
    @Prop({ enum: TokenType })
    deviceType!: TokenType;
}

const TokenSchema = SchemaFactory.createForClass(Token);

export { TokenSchema };
