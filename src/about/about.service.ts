import { Injectable } from '@nestjs/common';
import { FilterQuery, PaginateResult } from 'mongoose';
import { FilterQueryOptionsCity } from 'src/cities/dto/filterQueryOptions.dto';
import { CityDocument } from 'src/cities/entities/city.entity';
import { AboutRepository } from './about.repository';
import { CreateAboutDto } from './dto/create-about.dto';
import { FilterQueryOptionsAbout } from './dto/filterQueryOptions.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { AboutDocument } from './entities/about.entity';

@Injectable()
export class AboutService
{
  constructor(private readonly aboutRepository: AboutRepository) { }


  async create(createAboutDto: CreateAboutDto)
  {
    return await this.aboutRepository.create(createAboutDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<AboutDocument> | AboutDocument[]>
  {
    const cities = await this.aboutRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
    );
    return cities;
  }
  async findOne(id: string)
  {
    return await this.aboutRepository.findOne({ _id: id })
  }

  async update(id: string, updateAboutDto: UpdateAboutDto)
  {
    console.log(updateAboutDto)
    return await this.aboutRepository.updateOne({ _id: id }, updateAboutDto)
  }

  async remove(id: string)
  {
    return await this.aboutRepository.deleteOne({ _id: id })
  }
}
