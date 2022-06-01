import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { Order, OrdersSchema, OrderType } from './models/_order.model';
import { Normal, NormalsSchema } from './models/normal.model';
import { OfferOrders, OfferOrdersSchema } from './models/offers.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { OrderRepository } from './order.repository';
import { ResultsModule } from 'src/results/results.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrdersSchema,
        discriminators: [
          { name: OrderType.NORMALORDER, schema: NormalsSchema },
          { name: OrderType.OFFERSORDER, schema: OfferOrdersSchema },
        ],
      },
    ]),
    MulterModule.registerAsync({// register async because it's import and inject in the same place
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    // ResultsModule
  ],
  exports: [OrdersService, OrderRepository]
})
export class OrdersModule { }
