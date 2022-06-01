import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { UnprocessableEntityException } from '@nestjs/common';
import { BaseModel } from 'src/utils/base.model';
export type CityDocument = City & Document;

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
export class City
{
    id?: string;

    @Prop({ required: true })
    nameAr: string;
    @Prop({ required: true })
    nameEn: string;
}
export const CitysSchema = SchemaFactory.createForClass(City);