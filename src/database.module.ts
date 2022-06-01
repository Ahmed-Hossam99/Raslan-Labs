import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// this module only usege database connection 
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      connectionFactory: (connection) =>
      {
        connection.plugin(require('mongoose-autopopulate'));
        connection.plugin(require('mongoose-paginate-v2'));
        // connection.plugin(require('mongoose-auto-increment'));
        return connection;
      },
    }),
  ],
})
export class DatabaseModule { }
