import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, RegionsSchema } from './entities/region.entity';
import { RegionRepository } from './region.repository';
import { UsersModule } from 'src/users/users.module';
import { CitiesModule } from 'src/cities/cities.module'
@Module({
  controllers: [RegionsController],
  providers: [RegionsService, RegionRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Region.name,
        schema: RegionsSchema,
      }
    ]),
    CitiesModule
  ],
  exports: [RegionsService, RegionRepository]

})
export class RegionsModule
{

}
