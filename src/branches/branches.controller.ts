import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FilterQueryOptionsCity } from 'src/cities/dto/filterQueryOptions.dto';
import { UpdateCityDto } from 'src/cities/dto/update-city.dto';
import { CityDocument } from 'src/cities/entities/city.entity';
import { RegionsService } from 'src/regions/regions.service';
import { UserRole, User } from 'src/users/models/_user.model';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchDocument } from './entities/branch.entity';
@ApiBearerAuth()
@ApiTags('BRANCH')
@Controller('branches')
export class BranchesController
{
  constructor(private readonly branchesService: BranchesService,
    private readonly regionsServices: RegionsService
  ) { }

  @Post()
  async create(@Body() createBranchDto: CreateBranchDto)
  {
    let region = await this.regionsServices.findOne(createBranchDto.region)
    createBranchDto.region = region.id
    createBranchDto.city = (region.city as CityDocument)._id //to acces from populate bobject 
    return this.branchesService.create(createBranchDto);
  }

  @ApiPaginatedResponse(User)
  @Get()
  async findAll(@Query() queryFiltersAndOptions: FilterQueryOptionsCity,):
    Promise<PaginateResult<BranchDocument> | BranchDocument[]>
  {
    return await this.branchesService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsCity,
    );
  }
  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    return await this.branchesService.findOne(id);
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ): Promise<BranchDocument>
  {

    return await this.branchesService.update(
      id,
      updateBranchDto,
    );
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    return await this.branchesService.remove(id);
  }
}
