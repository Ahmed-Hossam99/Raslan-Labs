import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './_user.model';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  role: UserRole;

  @Prop({ required: true })
  bio: number;
}

const TeacherSchema = SchemaFactory.createForClass(Teacher);

export { TeacherSchema };
