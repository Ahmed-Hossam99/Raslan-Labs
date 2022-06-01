import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { FilessSchema } from 'src/files/entities/file.entity';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { CategoriesSchema, Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategoriesSchema,
      }
    ]),
    MulterModule.registerAsync({// register async because it's import and inject in the same place 
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
  ],
  exports: [CategoriesService, CategoryRepository]

})
export class CategoriesModule { }
