import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Product, ProductType } from './_product.model';

export type PackageDocument = Offer & Document;
export enum OfferType
{
  ANNUALLY = 'annually',
  MONTHLY = 'monthly',
}

@Schema()
export class Offer
{
  // type: ProductType;

  @Prop({ required: true })
  detailsAr: string;
  @Prop()
  detailsEn: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Product.name }]
  })
  tests: string[];
  @Prop({ required: true, type: String, enum: Object.values(OfferType) })
  offerType: OfferType;
}

const OffersSchema = SchemaFactory.createForClass(Offer);

export { OffersSchema };
