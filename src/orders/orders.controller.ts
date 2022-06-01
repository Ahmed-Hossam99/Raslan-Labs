import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiMultiFile } from '../shared/decorators/api-file.decorator';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilterQueryOptionsOrder } from './dto/filterQueryOption.dto';
import { OrderDocument, OrderType } from './models/_order.model';
import { PaginateResult } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { UserDocument } from 'src/users/models/_user.model';
import { StatusType } from './models/normal.model';
import { AuthUser } from 'src/auth/decorators/me.decorator';
@ApiBearerAuth()
@ApiTags('ORDERS')
@Controller('orders')
export class OrdersController
{
  constructor(private readonly ordersService: OrdersService,
    @Inject(REQUEST) private readonly req: Record<string, unknown>,
  ) { }
  @Post('/normal')
  // @UseInterceptors(FilesInterceptor("photos"))
  // @ApiConsumes('multipart/form-data')
  // @ApiMultiFile('photos')
  createNormal(
    @Body() createOrderDto: CreateOrderDto)
  {
    createOrderDto.type = OrderType.NORMALORDER
    createOrderDto.status = StatusType.PENDING
    createOrderDto.client = (this.req.me as UserDocument)._id
    // console.log(createOrderDto)
    return this.ordersService.create(createOrderDto);
  }
  @Post('/offer')
  createOffer(
    @Body() createOrderDto: CreateOrderDto)
  {
    createOrderDto.type = OrderType.OFFERSORDER
    createOrderDto.client = (this.req.me as UserDocument)._id
    console.log(createOrderDto)
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query() queryFiltersAndOptions: FilterQueryOptionsOrder,):
    Promise<PaginateResult<OrderDocument> | OrderDocument[]>
  {
    return await this.ordersService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsOrder,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto,
    @AuthUser() me: UserDocument,
  )
  {
    return this.ordersService.update(
      id,
      updateOrderDto,
      me,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string)
  {
    return this.ordersService.remove(id);
  }
}
