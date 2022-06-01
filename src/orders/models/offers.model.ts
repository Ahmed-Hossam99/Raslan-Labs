import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order } from './_order.model';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/models/_product.model';
import { Offer } from 'src/products/models/offers.model';


export type OfferOrdersDocument = OfferOrders & Document;
export enum Availability
{
    HOME = 'home',
    LAB = 'lap',
    BOTH = 'both',
}

@Schema()
export class OfferOrders
{
    // type: ProductType;

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
    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Offer.name }]
    })
    offers: string[];
}

const OfferOrdersSchema = SchemaFactory.createForClass(OfferOrders);

export { OfferOrdersSchema };
