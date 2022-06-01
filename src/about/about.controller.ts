import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { FilterQueryOptionsUser } from 'src/users/dto/filterQueryOptions.dto';
import { UserDocument } from 'src/users/models/_user.model';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { FilterQueryOptionsAbout } from './dto/filterQueryOptions.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { AboutDocument } from './entities/about.entity';
@ApiBearerAuth()
@ApiTags('About')
@Controller('about')
export class AboutController
{
  constructor(private readonly aboutService: AboutService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  create(@UploadedFiles()
  files,
    @Body() createAboutDto: CreateAboutDto): Promise<AboutDocument>
  {
    if (files && files.photo)
    {
      createAboutDto.photo = files.photo[0].secure_url;
      console.log(createAboutDto.photo)
    }
    console.log(createAboutDto)
    return this.aboutService.create(createAboutDto);
  }

  @Get()
  async findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<AboutDocument> | AboutDocument[]>
  {
    return await this.aboutService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsUser,
    );
  }



  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.aboutService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  update(
    @UploadedFiles()
    files,
    @Param('id') id: string, @Body() updateAboutDto: UpdateAboutDto)
  {
    if (files && files.photo) updateAboutDto.photo = files.photo[0].secure_url;
    return this.aboutService.update(id, updateAboutDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    return await this.aboutService.remove(id);
  }
}
