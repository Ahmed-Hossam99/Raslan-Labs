import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { UnprocessableEntityException } from '@nestjs/common';
import { BaseModel } from 'src/utils/base.model';
export type FileDocument = File & Document;

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
export class File
{
    id?: string;
    @Prop([{ type: String }])
    files?: string[]
    @Prop([{ type: String }])
    photos?: string[]

}
export const FilessSchema = SchemaFactory.createForClass(File);