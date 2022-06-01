import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { FilterQueryOptionResult } from './dto/filterQueryOption.dto';
import { PaginateResult } from 'mongoose';
import { ResultDocument } from './entities/result.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'src/users/models/_user.model';
import { AuthUser } from 'src/auth/decorators/me.decorator';
@ApiBearerAuth()
@ApiTags('Result')
@Controller('results')
export class ResultsController
{
  constructor(private readonly resultsService: ResultsService) { }

  @Post()
  create(@Body() createResultDto: CreateResultDto)
  {


    return this.resultsService.create(createResultDto);
  }

  @Get()
  async findAll(@Query() queryFiltersAndOptions: FilterQueryOptionResult, @AuthUser() me: UserDocument,):
    Promise<ResultDocument[]>
  {
    return await this.resultsService.findAll(
      queryFiltersAndOptions as FilterQueryOptionResult,
      me,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.resultsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto)
  {
    return this.resultsService.update(id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string)
  {
    return this.resultsService.remove(id);
  }
}
