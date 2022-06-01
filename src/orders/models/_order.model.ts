import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

import { UnprocessableEntityException } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { Constants } from '../../utils/constants';
import { Password } from '../../auth/utils/Password';
import { Branch } from 'src/branches/entities/branch.entity';
import { User, UserDocument } from 'src/users/models/_user.model';

// export type OrderDocument = Order & Document;
export type OrderDocument = Order & Document;

export enum OrderType
{
  NORMALORDER = 'orderNormal',
  OFFERSORDER = 'orderOffer',


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
export class Order
{
  id?: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  client: string | UserDocument
  @Prop({ required: true, type: String, enum: Object.values(OrderType) })
  type: OrderType;

}

const OrdersSchema = SchemaFactory.createForClass(Order);


export { OrdersSchema };
