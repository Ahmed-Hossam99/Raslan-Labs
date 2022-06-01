import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilessSchema } from './entities/file.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { FileRepository } from './file.repository';
import { File } from './entities/file.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService, FileRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FilessSchema,
      }
    ]),
    MulterModule.registerAsync({// register async because it's import and inject in the same place 
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
  ],
})
export class FilesModule { }
