import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaginateResult } from 'mongoose';
import { CitiesService } from 'src/cities/cities.service';
import { FilterQueryOptionsCity } from 'src/cities/dto/filterQueryOptions.dto';
import { UpdateCityDto } from 'src/cities/dto/update-city.dto';
import { CityDocument } from 'src/cities/entities/city.entity';
import { BranchRepository } from './branch.repository';
import { CreateBranchDto } from './dto/create-branch.dto';
import { FilterQueryOptionsBranch } from './dto/filterQueryOptions.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchDocument } from './entities/branch.entity';

@Injectable()
export class BranchesService
{
  constructor(private readonly branchRepository: BranchRepository,
    private readonly citiessServices: CitiesService
  ) { }

  async create(createBranchDto: CreateBranchDto)
  {
    // console.log(createBranchDto)

    return await this.branchRepository.create(createBranchDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsBranch,
  ): Promise<PaginateResult<BranchDocument> | BranchDocument[]>
  {
    const branches = await this.branchRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
    );
    return branches;
  }

  async findOne(id: string)
  {
    return await this.branchRepository.findOne({ _id: id })
  }

  async update(id: string, updateBranchDto: UpdateBranchDto)
  {
    return await this.branchRepository.updateOne({ _id: id }, updateBranchDto)
  }

  async remove(id: string)
  {
    return await this.branchRepository.deleteOne({ _id: id })
  }
}
