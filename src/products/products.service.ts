import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterQueryOptionsProduct } from './dto/filterQueryOption.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './models/_product.model';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService
{
  constructor(private readonly productRepository: ProductRepository) { }


  async create(createProductDto: CreateProductDto)//: Promise<ProductDocument>
  {
    return await this.productRepository.create(createProductDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsProduct,
  ): Promise<PaginateResult<ProductDocument> | ProductDocument[]>
  {
    const cities = await this.productRepository.findAllWithPagination(
      queryFiltersAndOptions,
    );
    return cities;
  }

  async findOne(id: string)
  {
    return await this.productRepository.findOne({ _id: id })
  }

  async update(id: string, updateProductDto: UpdateProductDto)
  {
    return await this.productRepository.updateOne({ _id: id }, updateProductDto)
  }

  async remove(id: string)
  {
    return await this.productRepository.deleteOne({ _id: id })
  }
}
