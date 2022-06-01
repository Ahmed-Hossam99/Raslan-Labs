import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateCityDto } from 'src/cities/dto/create-city.dto';
import { FilterQueryOptionsCity } from 'src/cities/dto/filterQueryOptions.dto';
import { UpdateCityDto } from 'src/cities/dto/update-city.dto';
import { CityDocument } from 'src/cities/entities/city.entity';
import { UserRole, User } from 'src/users/models/_user.model';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { FilterQueryOptionsContact } from './dto/filterQueryOption.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactDocument } from './entities/contact.entity';
@ApiBearerAuth()
@ApiTags('CONTACT')
@Controller('contacts')
export class ContactsController
{
  constructor(private readonly contactsService: ContactsService) { }


  @Post()
  create(@Body() createContactDto: CreateContactDto)
  {
    return this.contactsService.create(createContactDto);
  }

  @Roles(UserRole.STUDENT)
  @ApiPaginatedResponse(User)
  @Get()
  async findAll(@Query() queryFiltersAndOptions: FilterQueryOptionsContact,):
    Promise<PaginateResult<ContactDocument> | ContactDocument[]>
  {
    return await this.contactsService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsContact,
    );
  }
  @Get(':id')
  async findOne(@Param('id') id: string)
  {
    return await this.contactsService.findOne(id);
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateContactData: UpdateContactDto,
  ): Promise<ContactDocument>
  {

    return await this.contactsService.update(
      id,
      updateContactData,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    return await this.contactsService.remove(id);
  }
}
