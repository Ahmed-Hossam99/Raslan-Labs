import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CityRepository } from './city.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitysSchema } from './entities/city.entity';

@Module({

  controllers: [CitiesController],
  providers: [CitiesService, CityRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: City.name,
        schema: CitysSchema,
      }
    ])
  ],
  exports: [CitiesService, CityRepository]
})
export class CitiesModule { }
