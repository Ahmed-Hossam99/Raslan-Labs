import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutsSchema } from './entities/about.entity';
import { AboutRepository } from './about.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';

@Module({
  controllers: [AboutController],
  providers: [AboutService, AboutRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: About.name,
        schema: AboutsSchema,
      }
    ]),
    MulterModule.registerAsync({// register async because it's import and inject in the same place 
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
  ],
})
export class AboutModule { }
