import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { ProductDocument } from 'src/products/models/_product.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterQueryOptionsOrder } from './dto/filterQueryOption.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NormalDocument } from './models/normal.model';
import { OrderDocument } from './models/_order.model';
import { OrderRepository } from './order.repository';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { UserDocument } from 'src/users/models/_user.model';
@Injectable()
export class OrdersService
{
  constructor(private readonly OrderRepository: OrderRepository) { }


  async create(createOrderDto: CreateOrderDto): Promise<OrderDocument>
  {
    return await this.OrderRepository.create(createOrderDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsOrder,
  ): Promise<PaginateResult<OrderDocument> | OrderDocument[]>
  {
    const cities = await this.OrderRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
    );
    return cities;
  }

  async findOne(id: string)
  {
    return await this.OrderRepository.findOne({ _id: id })
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, @AuthUser() me: UserDocument,
  )
  {
    return await this.OrderRepository.updateOrder({ _id: id },
      updateOrderDto,
      me,
    )
  }

  async remove(id: string)
  {
    return await this.OrderRepository.deleteOne({ _id: id })
  }
}
