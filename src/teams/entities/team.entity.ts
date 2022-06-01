
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { UnprocessableEntityException } from '@nestjs/common';
import { BaseModel } from 'src/utils/base.model';
export type TeamDocument = Team & Document;

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
export class Team
{
    id?: string;
    @Prop({ default: "https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg", })
    photo?: string
    @Prop({ required: true })
    descriptionAr: string
    @Prop({ required: true })
    descriptionEn: string
    @Prop({ required: true })
    nameAr: string
    @Prop({ required: true })
    nameEn: string
}
export const TeamsSchema = SchemaFactory.createForClass(Team);