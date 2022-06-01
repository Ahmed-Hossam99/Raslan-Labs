import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { Constants } from 'src/utils/constants';
import * as mongoose from 'mongoose';
import { BaseModel } from 'src/utils/base.model';
import { City, CityDocument, CitysSchema } from 'src/cities/entities/city.entity';
import { Type } from 'class-transformer';
import { Region } from 'src/regions/entities/region.entity';
export type BranchDocument = Branch & Document;

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


export class Branch
{

    id?: string;
    @Prop({ required: true })
    titleAr: string
    @Prop({ required: true })
    titleEn: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Region.name })//mongoose
    region: string //typeScripy
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: City.name })
    city?: string | CityDocument  //=> to access from populate opject 
    @Prop([{ type: Number }])
    coordinates: [number]
    @Prop({ required: true })
    location: string
}
export const BranchsSchema = SchemaFactory.createForClass(Branch);
