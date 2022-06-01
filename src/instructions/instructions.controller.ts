import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InstructionsService } from './instructions.service';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { InstructionDocument } from './entities/instruction.entity';
import { PaginateResult } from 'mongoose';
import { FilterQueryOptionsContact } from 'src/contacts/dto/filterQueryOption.dto';
import { User } from 'src/users/models/_user.model';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('INSTRUCTIONS')
@Controller('instructions')
export class InstructionsController
{
  constructor(private readonly instructionsService: InstructionsService) { }


  @Post()
  create(@Body() CreateInstructionDto: CreateInstructionDto)
  {
    return this.instructionsService.create(CreateInstructionDto);
  }

  @ApiPaginatedResponse(User)
  @Get()
  async findAll(@Query() queryFiltersAndOptions: FilterQueryOptionsContact,):
    Promise<PaginateResult<InstructionDocument> | InstructionDocument[]>
  {
    return await this.instructionsService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsContact,
    );
  }
  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    return await this.instructionsService.findOne(id);
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateInstructionDto: UpdateInstructionDto,
  ): Promise<InstructionDocument>
  {

    return await this.instructionsService.update(
      id,
      updateInstructionDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    return await this.instructionsService.remove(id);
  }
}
