import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { Topic, TopicsSchema } from './entities/topic.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { CategoriesModule } from 'src/categories/categories.module'
import { CategoriesService } from 'src/categories/categories.service';
import { TopicRepository } from './topic.repository';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService, TopicRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Topic.name,
        schema: TopicsSchema,
      }
    ]),
    MulterModule.registerAsync({// register async because it's import and inject in the same place 
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
    CategoriesModule,
    // CategoriesService
  ],
})
export class TopicsModule { }
