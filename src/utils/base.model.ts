import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (_, doc: Record<string, unknown>) => {
      delete doc.__v;
      delete doc._id;
      return {
        ...doc,
      };
    },
  },
})
export abstract class BaseModel {
  id: string; // _id getter as string
  createdAt: Date; // provided by schemaOptions.timestamps
  updatedAt: Date; // provided by schemaOptions.timestamps
  public static defaultOptions() {
    return { lean: true, autopopulate: true };
  }
}
