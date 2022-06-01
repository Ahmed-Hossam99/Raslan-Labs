import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FilterQueryOptionsCity } from 'src/cities/dto/filterQueryOptions.dto';
import { CityDocument } from 'src/cities/entities/city.entity';
import { UserRole, User } from 'src/users/models/_user.model';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
import { FilterQueryOptionsRegion } from './dto/filterQueryOption.dto';
import { RegionDocument } from './entities/region.entity';
@ApiBearerAuth()
@ApiTags('REGION')
@Controller('regions')
export class RegionsController
{
  constructor(private readonly regionsService: RegionsService) { }

  @Post()
  create(@Body() createRegionDto: CreateRegionDto)
  {
    return this.regionsService.create(createRegionDto);
  }

  @ApiPaginatedResponse(User)
  @Get()
  async findAll(@Query() queryFiltersAndOptions: FilterQueryOptionsRegion,):
    Promise<PaginateResult<RegionDocument> | RegionDocument[]>
  {
    return await this.regionsService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsRegion,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.regionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto)
  {
    return this.regionsService.update(id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string)
  {
    return this.regionsService.remove(id);
  }
}
