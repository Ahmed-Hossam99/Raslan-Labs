import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { FilterQueryOptionsAbout } from 'src/about/dto/filterQueryOptions.dto';
import { UpdateAboutDto } from 'src/about/dto/update-about.dto';
import { AboutDocument } from 'src/about/entities/about.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamDocument } from './entities/team.entity';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamsService
{
  constructor(private readonly teamRepository: TeamRepository) { }

  async create(createTeamDto: CreateTeamDto)
  {
    return await this.teamRepository.create(createTeamDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<TeamDocument> | TeamDocument[]>
  {
    const cities = await this.teamRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
    );
    return cities;
  }
  async findOne(id: string)
  {
    return await this.teamRepository.findOne({ _id: id })
  }

  async update(id: string, updateAboutDto: UpdateAboutDto)
  {
    console.log(updateAboutDto)
    return await this.teamRepository.updateOne({ _id: id }, updateAboutDto)
  }

  async remove(id: string)
  {
    return await this.teamRepository.deleteOne({ _id: id })
  }
}
