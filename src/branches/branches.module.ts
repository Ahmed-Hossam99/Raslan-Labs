import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutsSchema } from 'src/about/entities/about.entity';
import { Branch, BranchsSchema } from './entities/branch.entity';
import { CitiesModule } from 'src/cities/cities.module';
import { CityRepository } from 'src/cities/city.repository';
import { RegionsService } from 'src/regions/regions.service';
import { RegionRepository } from 'src/regions/region.repository';
import { RegionsModule } from 'src/regions/regions.module';
import { BranchRepository } from './branch.repository';

@Module({
  controllers: [BranchesController],
  providers: [BranchesService, BranchRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Branch.name,
        schema: BranchsSchema,
      }
    ]),
    CitiesModule,
    // CityRepository,
    RegionsModule,
    // RegionRepository,
    // RegionsService
  ],
})
export class BranchesModule { }
