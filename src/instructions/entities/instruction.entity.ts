
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, ObjectId } from 'mongoose';
import { Constants } from 'src/utils/constants';
import * as mongoose from 'mongoose';
export type InstructionDocument = Instruction & Document;

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


export class Instruction
{

    id?: string;
    @Prop({ required: true })
    titleAr: string
    @Prop({ required: true })
    titleEn: string
    @Prop({
        type: [{ type: String, required: true }]
    })
    detailsAr: string[];
    @Prop({
        type: [{ type: String, required: true }]
    })
    detailsEn: string[];
}
export const InstructionsSchema = SchemaFactory.createForClass(Instruction);
