import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { CreateResultDto } from './dto/create-result.dto';
import { FilterQueryOptionResult } from './dto/filterQueryOption.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ResultDocument } from './entities/result.entity';
import { ResultRepository } from './result.repository';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { User, UserDocument } from 'src/users/models/_user.model';


@Injectable()
export class ResultsService
{
  constructor(private readonly productRepository: ResultRepository) { }


  async create(createResultDto: CreateResultDto)//: Promise<ProductDocument>
  {
    return await this.productRepository.create(createResultDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionResult,
    @AuthUser() me: UserDocument

  ): Promise<ResultDocument[]>
  {
    const cities = await this.productRepository.findAllResult(
      me,
      queryFiltersAndOptions as FilterQueryOptionResult,
    );
    return cities;
  }

  async findOne(id: string)
  {
    return await this.productRepository.findOne({ _id: id })
  }

  async update(id: string, updateResultDto: UpdateResultDto)
  {
    return await this.productRepository.updateOne({ _id: id }, updateResultDto)
  }

  async remove(id: string)
  {
    return await this.productRepository.deleteOne({ _id: id })
  }
}
