import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './product.repository';
import { Product, ProductsSchema, ProductType } from './models/_product.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { OffersSchema } from './models/offers.model';
import { PackagesSchema } from './models/packages.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductsSchema,
        discriminators: [
          { name: ProductType.PACKAGE, schema: PackagesSchema },
          { name: ProductType.OFFER, schema: OffersSchema },
        ],
      },
    ]),
    MulterModule.registerAsync({// register async because it's import and inject in the same place 
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
  ],
  exports: [ProductsService, ProductRepository],

})
export class ProductsModule { }
