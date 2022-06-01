import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { FilterQueryOptionsCity } from './dto/filterQueryOptions.dto';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityDocument } from './entities/city.entity';

@Injectable()
export class CitiesService
{
  constructor(private readonly cityRepository: CityRepository) { }
  async create(createCityDto: CreateCityDto)
  {
    return await this.cityRepository.create(createCityDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsCity,
  ): Promise<PaginateResult<CityDocument> | CityDocument[]>
  {
    const cities = await this.cityRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
    );
    return cities;
  }

  async findOnee(id: string)
  {
    return await this.cityRepository.findOne({ _id: id })
  }

  async update(id: string, updateCityDto: UpdateCityDto)
  {
    return await this.cityRepository.updateOne({ _id: id }, updateCityDto)
  }

  async remove(id: string)
  {
    return await this.cityRepository.deleteOne({ _id: id })
  }
}
