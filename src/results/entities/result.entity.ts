import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { UnprocessableEntityException } from '@nestjs/common';
import { BaseModel } from 'src/utils/base.model';
import { Order, OrderType } from 'src/orders/models/_order.model';
import { User, UserDocument } from 'src/users/models/_user.model';
export type ResultDocument = Result & Document;

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
export class Result
{
    id?: string;
    @Prop()
    attachment?: string
    @Prop([{ type: String }])
    images?: string[]
    @Prop()
    notes: string
    @Prop({ required: true })
    titleAr: string
    @Prop({ required: true })
    titleEn: string
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        refPath: "subjectType",
        required: true,
    })
    subject: string
    @Prop({ required: true, type: String, enum: ['User', 'Order'] })
    subjectType: string
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name }) //ref 
    client?: string | UserDocument
}


export const ResultsSchema = SchemaFactory.createForClass(Result);