import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
// import { Type, UnprocessableEntityException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { BaseModel } from 'src/utils/base.model';
import { City, CitysSchema } from 'src/cities/entities/city.entity';
import { Type } from 'class-transformer';
import { CityDocument } from 'src/cities/entities/city.entity'
export type RegionDocument = Region & Document;
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
export class Region 
{
    id?: string;
    @Prop({ required: true })
    nameAr: string;
    @Prop({ required: true })
    nameEn: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: City.name })
    city: string | CityDocument;

}
export const RegionsSchema = SchemaFactory.createForClass(Region);
