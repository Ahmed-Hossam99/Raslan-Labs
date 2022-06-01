import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamRepository } from './team.repository';
import { Team, TeamsSchema } from './entities/team.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadCloudinary } from 'src/utils/services/upload-cloudinary';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, TeamRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamsSchema,
      }
    ]),
    MulterModule.registerAsync({// register async because it's import and inject in the same place 
      imports: [ConfigModule],
      useClass: UploadCloudinary,
      inject: [ConfigService],
    }),
  ],
})
export class TeamsModule { }
