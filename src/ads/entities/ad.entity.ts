
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { Constants } from 'src/utils/constants';
import * as mongoose from 'mongoose';
import { BaseModel } from 'src/utils/base.model';
import { City, CitysSchema } from 'src/cities/entities/city.entity';
import { Type } from 'class-transformer';
import { Branch, BranchDocument } from 'src/branches/entities/branch.entity';
export type AdDocument = Ad & Document;

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


export class Ad
{

    id?: string;
    @Prop({ default: "https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg", })
    photo?: string
    @Prop({ required: true })
    descriptionAr: string
    @Prop({ required: true })
    descriptionEn: string
    @Prop({ required: true })
    titleAr: string
    @Prop({ required: true })
    titleEn: string
    @Prop(raw([{ type: mongoose.Schema.Types.ObjectId, ref: Branch.name }]))
    branches: string[];



    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: Branch.name }] //no branch model
    // })
    // branches: string[];
}
export const AdsSchema = SchemaFactory.createForClass(Ad);
