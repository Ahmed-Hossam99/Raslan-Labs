import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';
import { FilterQueryOptionsContact } from 'src/contacts/dto/filterQueryOption.dto';
import { UpdateContactDto } from 'src/contacts/dto/update-contact.dto';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { FilterQueryOptionsInstruction } from './dto/filterQueryOption.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { InstructionDocument } from './entities/instruction.entity';
import { InstructionsRepository } from './instruction.repository';

@Injectable()
export class InstructionsService
{
  constructor(private readonly instructionRepository: InstructionsRepository) { }


  async create(createInstructionyDto: CreateInstructionDto)
  {
    return await this.instructionRepository.create(createInstructionyDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsInstruction,
  ): Promise<PaginateResult<InstructionDocument> | InstructionDocument[]>
  {
    const cities = await this.instructionRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
    );
    return cities;
  }

  async findOne(id: string)
  {
    return await this.instructionRepository.findOne({ _id: id })
  }

  async update(id: string, updateInstructionDto: UpdateInstructionDto)
  {
    return await this.instructionRepository.updateOne({ _id: id }, updateInstructionDto)
  }

  async remove(id: string)
  {
    return await this.instructionRepository.deleteOne({ _id: id })
  }
}
