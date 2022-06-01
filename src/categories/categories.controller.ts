import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { FilterQueryOptionsAbout } from 'src/about/dto/filterQueryOptions.dto';
import { FilterQueryOptionsUser } from 'src/users/dto/filterQueryOptions.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './entities/category.entity';
@ApiBearerAuth()
@ApiTags('CATEGORIES')
@Controller('categories')
export class CategoriesController
{
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 3 }]))
  @ApiConsumes('multipart/form-data')
  create(@UploadedFiles()
  files,
    @Body() ccreateCategoryDto: CreateCategoryDto): Promise<CategoryDocument>
  {
    if (files && files.photo)
    {
      ccreateCategoryDto.photo = files.photo[0].secure_url;
    }
    return this.categoriesService.create(ccreateCategoryDto);
  }

  @Get()
  async findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<CategoryDocument> | CategoryDocument[]>
  {
    return await this.categoriesService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsUser,
    );
  }



  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  update(
    @UploadedFiles()
    files,
    @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto)
  {
    if (files && files.photo) updateCategoryDto.photo = files.photo[0].secure_url;
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    return await this.categoriesService.remove(id);
  }
}
