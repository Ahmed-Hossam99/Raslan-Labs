import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product, ProductType } from './_product.model';
import * as mongoose from 'mongoose';


export type PackageDocument = Package & Document;
export enum Availability
{
    HOME = 'home',
    LAB = 'lap',
    BOTH = 'both',
}

@Schema()
export class Package
{
    // type: ProductType;

    @Prop({
        type: [{ type: String, required: true }]
    })
    measuresAr: string[];
    @Prop({
        type: [{ type: String, required: true }]
    })
    measuresEn: string[]
    @Prop({
        required: true, type: String, enum: Object.values(Availability)
    })
    availableAt: Availability;
    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Product.name }]
    })
    tests: string[];
}

const PackagesSchema = SchemaFactory.createForClass(Package);

export { PackagesSchema };
