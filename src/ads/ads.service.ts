import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { UpdateAboutDto } from 'src/about/dto/update-about.dto';
import { AboutDocument } from 'src/about/entities/about.entity';
import { AdsRepository } from './ads.repository';
import { CreateAdDto } from './dto/create-ad.dto';
import { FilterQueryOptionsAbout } from './dto/filterQueryOption.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { AdDocument } from './entities/ad.entity';

@Injectable()
export class AdsService
{
  constructor(private readonly adsRepository: AdsRepository) { }


  async create(createAdtDto: CreateAdDto)
  {
    return await this.adsRepository.create(createAdtDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<AdDocument> | AdDocument[]>
  {
    const cities = await this.adsRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
    );
    return cities;
  }
  async findOne(id: string)
  {
    return await this.adsRepository.findOne({ _id: id })
  }

  async update(id: string, updateAdDto: UpdateAdDto)
  {
    return await this.adsRepository.updateOne({ _id: id }, updateAdDto)
  }

  async remove(id: string)
  {
    return await this.adsRepository.deleteOne({ _id: id })
  }
}
