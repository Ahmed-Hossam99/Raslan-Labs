import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { UpdateCityDto } from 'src/cities/dto/update-city.dto';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { FilterQueryOptionsContact } from './dto/filterQueryOption.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactDocument } from './entities/contact.entity';

@Injectable()
export class ContactsService
{
  constructor(private readonly contactRepository: ContactRepository) { }


  async create(createContactyDto: CreateContactDto)
  {
    return await this.contactRepository.create(createContactyDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsContact,
  ): Promise<PaginateResult<ContactDocument> | ContactDocument[]>
  {
    const cities = await this.contactRepository.findAllWithPagination(
      queryFiltersAndOptions,
    );
    return cities;
  }

  async findOne(id: string)
  {
    return await this.contactRepository.findOne({ _id: id })
  }

  async update(id: string, updateContactData: UpdateContactDto)
  {
    return await this.contactRepository.updateOne({ _id: id }, updateContactData)
  }

  async remove(id: string)
  {
    return await this.contactRepository.deleteOne({ _id: id })
  }
}
