import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

import { UnprocessableEntityException } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { Constants } from '../../utils/constants';
import { Password } from '../../auth/utils/Password';
import { Branch } from 'src/branches/entities/branch.entity';

// export type ProductDocument = Product & Document;
export type ProductDocument = Product & Document;

export enum ProductType
{
  TEST = 'test',
  PACKAGE = 'package',
  OFFER = 'offer',
}

@Schema({
  discriminatorKey: 'type',
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
export class Product
{
  id?: string;

  @Prop({
    default:
      "https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg",
  })
  image?: string;

  @Prop({
    default:
      "https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg",
  })
  icon?: string;

  @Prop({ required: true })
  titleAr: string;

  @Prop()
  titleEn: string;

  @Prop()
  price?: number;

  @Prop({
    min: 1,
    default: null,
  })
  priceAfterDiscount?: number;
  @Prop(raw([{ type: mongoose.Schema.Types.ObjectId, ref: Branch.name }]))
  branches: string[];
  @Prop({ required: true, type: String, enum: Object.values(ProductType) })
  type: ProductType;

}

const ProductsSchema = SchemaFactory.createForClass(Product);


export { ProductsSchema };
