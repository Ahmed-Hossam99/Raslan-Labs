import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Team, TeamsSchema } from 'src/teams/entities/team.entity';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';
import { Ad, AdsSchema } from './entities/ad.entity';
import { AdsRepository } from './ads.repository';

@Module({
  controllers: [AdsController],
  providers: [AdsService, AdsRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Ad.name,
        schema: AdsSchema,
      }
    ]),
    MulterModule.registerAsync({// register async because it's import and inject in the same place 
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
  ],
})
export class AdsModule { }
