import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { FilterQueryOptionsAbout } from 'src/about/dto/filterQueryOptions.dto';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoriesService
{
  constructor(private readonly CategoryRepository: CategoryRepository) { }


  async create(createCategoryDto: CreateCategoryDto)
  {
    return await this.CategoryRepository.create(createCategoryDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<CategoryDocument> | CategoryDocument[]>
  {
    const categories = await this.CategoryRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
    );
    return categories;
  }
  async findOne(id: string)
  {
    return await this.CategoryRepository.findOne({ _id: id })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto)
  {
    return await this.CategoryRepository.updateOne({ _id: id }, updateCategoryDto)
  }

  async remove(id: string)
  {
    return await this.CategoryRepository.deleteOne({ _id: id })
  }
}
