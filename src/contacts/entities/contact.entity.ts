
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { Constants } from 'src/utils/constants';
import * as mongoose from 'mongoose';
import { BaseModel } from 'src/utils/base.model';
import { City, CitysSchema } from 'src/cities/entities/city.entity';
import { Type } from 'class-transformer';
export enum ContactStatus
{
    UNSEEN = 'unseen',
    SEEN = 'seen',
}
export type ContactDocument = Contact & Document;
@Schema({
    timestamps: true,
    toJSON: {
        getters: true,
        virtuals: true,
        transform: (_, doc: Record<string, unknown>) =>
        {
            delete doc.__v;
            delete doc._id;
            return {
                ...doc,
            };
        },
    },
})
export class Contact 
{
    id?: string;
    @Prop({ required: true })
    username: String
    @Prop({ match: Constants.PHONE_REGX })
    phone: String
    @Prop({ match: Constants.EMAIL_REGX })
    email: String
    @Prop({ required: true })
    message: String
    @Prop({ required: true, type: String, enum: Object.values(ContactStatus), default: ContactStatus.UNSEEN })
    status?: ContactStatus// = ContactStatus.UNSEEN =>  if passed here  must send from service the defult 
}
export const ContactsSchema = SchemaFactory.createForClass(Contact);
