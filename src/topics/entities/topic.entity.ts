
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category, CategoryDocument } from 'src/categories/entities/category.entity';

export type TopicDocument = Topic & Document;

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


export class Topic
{

    id?: string;
    @Prop({ required: true, default: "https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg", })
    image?: String
    @Prop({ required: true })
    descriptionAr: String
    @Prop({ required: true })
    descriptionEn: String
    @Prop({ required: true })
    titleAr: String
    @Prop({ required: true })
    titleEn: String
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    category: string | CategoryDocument;

}
export const TopicsSchema = SchemaFactory.createForClass(Topic);
