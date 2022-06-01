import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result, ResultsSchema } from './entities/result.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { ResultRepository } from './result.repository';
import { OrdersModule } from 'src/orders/orders.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ResultsController],
  providers: [ResultsService, ResultRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Result.name,
        schema: ResultsSchema,
      },
    ]),
    MulterModule.registerAsync({// register async because it's import and inject in the same place
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule
  ],
  exports: [ResultsService, ResultRepository]

})
export class ResultsModule { }
