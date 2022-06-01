import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/products/models/_product.model';
import { OrderType } from './_order.model';

export type NormalDocument = Normal & Document;
export enum BookingType
{
  EXTERNAL = 'external',
  INTERNAL = 'internal',
}
export enum GenderType
{
  MALE = 'male',
  FEMALE = 'female',
}
export enum StatusType
{
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PENDING = 'pending',
  INPROGRESS = 'inProgress',
  DONE = 'done',

}

@Schema()
export class Normal
{
  type: OrderType.NORMALORDER;
  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: Result.name }]
  // })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Product.name }]
  })
  products: string[];

  @Prop({
    // type: Number,
    // refPath: "subjectType",
    required: true,

  })
  day: Date;
  @Prop()
  from: string;
  @Prop({
    type: [{ type: String }]
  })
  images?: string[]

  @Prop()
  to: string;
  @Prop()
  timeAttendance: string;
  @Prop()
  address: string;
  @Prop()
  age: string;
  @Prop()
  adminNotes: string;
  @Prop()
  clientNotes: string;
  @Prop()
  whyRejected: string;
  @Prop({ required: true, type: String, enum: Object.values(GenderType) })
  gender: GenderType;
  @Prop({ required: true, type: String, enum: Object.values(BookingType) })
  booking: BookingType;
  @Prop({ required: true, type: String, enum: Object.values(StatusType) })
  status: StatusType;
}

const NormalsSchema = SchemaFactory.createForClass(Normal);

export { NormalsSchema };
