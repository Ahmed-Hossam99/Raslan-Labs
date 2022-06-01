import { Module } from '@nestjs/common';
import { InstructionsService } from './instructions.service';
import { InstructionsController } from './instructions.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Ad, AdsSchema } from 'src/ads/entities/ad.entity';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { Instruction, InstructionsSchema } from './entities/instruction.entity';
import { InstructionsRepository } from './instruction.repository';

@Module({
  controllers: [InstructionsController],
  providers: [InstructionsService, InstructionsRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Instruction.name,
        schema: InstructionsSchema,
      }
    ]),
  ],
})
export class InstructionsModule { }
