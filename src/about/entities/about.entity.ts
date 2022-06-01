
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { Constants } from 'src/utils/constants';
import * as mongoose from 'mongoose';
import { BaseModel } from 'src/utils/base.model';
import { City, CitysSchema } from 'src/cities/entities/city.entity';
import { Type } from 'class-transformer';
export type AboutDocument = About & Document;

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


export class About
{

    id?: string;
    @Prop({ required: true, default: "https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg", })
    photo?: String
    @Prop({ required: true })
    descriptionAr: String
    @Prop({ required: true })
    descriptionEn: String
}
export const AboutsSchema = SchemaFactory.createForClass(About);
