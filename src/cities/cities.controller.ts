import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterQuery, PaginateResult } from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FilterQueryOptionsCity } from './dto/filterQueryOptions.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User, UserDocument, UserRole } from 'src/users/models/_user.model';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City, CityDocument } from './entities/city.entity';
@ApiBearerAuth()
@ApiTags('CITY')
@Controller('cities')
export class CitiesController
{
  constructor(private readonly citiesService: CitiesService) { }

  @Post()
  create(@Body() createCityDto: CreateCityDto)
  {
    return this.citiesService.create(createCityDto);
  }

  @Roles(UserRole.STUDENT)
  @ApiPaginatedResponse(User)
  @Get()
  async findAll(@Query() queryFiltersAndOptions: FilterQueryOptionsCity,):
    Promise<PaginateResult<CityDocument> | CityDocument[]>
  {
    return await this.citiesService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsCity,
    );
  }
  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    return await this.citiesService.findOnee(id);
  }

  @Patch('/:id/city')
  async updateOne(
    @Param('id') id: string,
    @Body() updateCityData: UpdateCityDto,
  ): Promise<CityDocument>
  {

    return await this.citiesService.update(
      id,
      updateCityData,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    return await this.citiesService.remove(id);
  }
}
