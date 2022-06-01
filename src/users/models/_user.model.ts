import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Schema as mongooseSchema } from 'mongoose';
import { UnprocessableEntityException } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { Constants } from '../../utils/constants';
import { Password } from '../../auth/utils/Password';

export type UserDocument = User & Document;

export enum UserRole
{
  ADMIN = 'admin',
  CLIENT = 'client',
  STUDENT = 'student',
  TEACHER = 'teacher',
}
export enum UserDeviceType
{
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}

@Schema({
  discriminatorKey: 'role',
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (_, doc: Record<string, unknown>) =>
    {
      delete doc.__v;
      delete doc._id;
      delete doc.password;//?
      return {
        ...doc,
      };
    },
  },
})
export class User
{
  id: string;
  @Prop({
    index: true,
    unique: true,
    sparse: true,
    match: Constants.EMAIL_REGX, // bset way to dofin from constant file
  })
  email: string;

  @Prop({
    index: true,
    unique: true,
    sparse: true,
    match: Constants.PHONE_REGX,
  })
  phone: string;

  @Prop({
    get: (username: string) =>
    {
      return username.toUpperCase();//convert username to upper case 
    },
    set: (username: string) =>
    {
      return username.trim();
    },
    required: true,
  })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  enabled: boolean;

  @Prop()
  photo: string;//defult from cloudinary 

  @Prop({ index: true, unique: true, sparse: true })
  facebookId: string;

  @Prop({ index: true, unique: true, sparse: true })
  googleId: string;

  @Prop({ required: true, type: String, enum: Object.values(UserRole) })
  role: UserRole;

  // @Prop({
  //   type: [{ type: String, required: true }]
  // })
  // asdasd: []
  @Prop({ type: [UserNOtificationModel()] })
  pushTokens: [];
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('NameAndEmail').get(function (this: UserDocument) {
//   return `${this.email} + ${this.username}`;
// });

UserSchema.pre('save', async function ()
{
  const user = this;
  //is this to make any feld from this array empty  = null it it's empty string or null 
  let nullableFields = ['phone', 'email', 'googleId', 'facebookId'];
  for (let i = 0; i < nullableFields.length; i++)
  {
    if (user.isModified(nullableFields[i]))
    {
      const value = user[nullableFields[i]];
      if (value === '' || value === null) user[nullableFields[i]] = undefined;
    }
  }

  let uniqueFields = ['phone', 'apple_id', 'fb_id', 'email'];
  for (let i = 0; i < uniqueFields.length; i++)
  {
    if (user.isModified(uniqueFields[i]))
    {
      // be true if was undefined then set value to it , be false if same value set to it
      let value = user[uniqueFields[i]];
      if (value === undefined) continue;
      let filter = {};
      filter[uniqueFields[i]] = value;
      let model = <Model<User>>this.constructor;
      let count = await model.countDocuments(filter);
      if (count)
      {
        throw new UnprocessableEntityException(
          `${uniqueFields[i]} : ${value} is not a uniqu value`,
        );
      }
    }
  }
  if ((this as UserDocument).password && this.isModified('password'))
  {
    // (this as UserDocument).password = await hash(
    //   (this as UserDocument).password,
    //   10,
    // );
    (this as UserDocument).password = await Password.hash( //password is class has static function hash & isDorrectPassword 
      (this as UserDocument).password,
    );
  }
});

UserSchema.methods.isValidPassword = async function (password)
{
  // return compare(password, (this as UserDocument).password);
  return Password.isCorrectPassword(password, (this as UserDocument).password);
};

export { UserSchema };

function UserNOtificationModel()
{
  const schema = new mongooseSchema(
    {
      deviceType: {
        type: String,
        // enum: ["android", "ios", "web"],
        enum: Object.values(UserDeviceType),
        required: true,
      },
      deviceToken: {
        type: Number,
        required: true,
      },
    },
    { _id: false },
  );

  schema.set('toJSON', {
    transform: function (doc)
    {
      return {
        question: doc.question,
        point: doc.point,
        remah: 'remah',
      };
    },
  });

  return schema;
}