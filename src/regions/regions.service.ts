import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { CitiesService } from 'src/cities/cities.service';
import { CityDocument } from 'src/cities/entities/city.entity';
import { CreateRegionDto } from './dto/create-region.dto';
import { FilterQueryOptionsRegion } from './dto/filterQueryOption.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { RegionDocument } from './entities/region.entity';
import { RegionRepository } from './region.repository';

@Injectable()
export class RegionsService
{
  constructor(private readonly regionRepository: RegionRepository,
    private readonly citiessServices: CitiesService
  ) { }

  async create(createRegionDto: CreateRegionDto)
  {
    let city = await this.citiessServices.findOnee(createRegionDto.city)

    return this.regionRepository.createOne(createRegionDto);
  }


  async findAll(queryFiltersAndOptions: FilterQueryOptionsRegion,
  ): Promise<PaginateResult<RegionDocument> | RegionDocument[]>
  {
    const regions = await this.regionRepository.findAllWithPagination(
      queryFiltersAndOptions,
    );
    return regions;
  }

  async findOne(id: string)
  {
    return await this.regionRepository.findOne({ _id: id })
  }

  async update(id: string, updateRegionDto: UpdateRegionDto)
  {
    return await this.regionRepository.updateOne({ _id: id }, updateRegionDto)
  }

  async remove(id: string)
  {
    return await this.regionRepository.deleteOne({ _id: id })
  }
}
