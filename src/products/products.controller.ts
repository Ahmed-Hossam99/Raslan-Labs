import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { REQUEST } from '@nestjs/core';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductDocument } from './models/_product.model';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilterQueryOptionsProduct } from './dto/filterQueryOption.dto';
import { PaginateResult } from 'mongoose';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
@ApiBearerAuth()
@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController
{
  constructor(private readonly productsService: ProductsService,

    @Inject(REQUEST) private readonly req: Record<string, unknown>,
  ) { }



  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: "image" },
  { name: "icon" }]))
  @ApiConsumes('multipart/form-data')
  create(@UploadedFiles()
  files,
    @Body() createProductDto: CreateProductDto)
  {
    if (files && files.image)
    {
      createProductDto.image = files.image[0].secure_url;
    }
    if (files && files.icon)
    {
      createProductDto.icon = files.icon[0].secure_url;
    }
    console.log(createProductDto)
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() queryFiltersAndOptions: FilterQueryOptionsProduct,):
    Promise<PaginateResult<ProductDocument> | ProductDocument[]>
  {
    return await this.productsService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsProduct,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto)
  {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string)
  {
    return this.productsService.remove(id);
  }
}
