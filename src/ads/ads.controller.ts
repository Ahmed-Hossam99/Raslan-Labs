import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { CreateAboutDto } from 'src/about/dto/create-about.dto';
import { FilterQueryOptionsAbout } from 'src/about/dto/filterQueryOptions.dto';
import { UpdateAboutDto } from 'src/about/dto/update-about.dto';
import { AboutDocument } from 'src/about/entities/about.entity';
import { FilterQueryOptionsUser } from 'src/users/dto/filterQueryOptions.dto';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { AdDocument } from './entities/ad.entity';
@ApiBearerAuth()
@ApiTags('ADS')
@Controller('ads')
export class AdsController
{
  constructor(private readonly adsService: AdsService) { }
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 5 }]))
  @ApiConsumes('multipart/form-data')
  create(@UploadedFiles()
  files,
    @Body() createAdDto: CreateAdDto): Promise<AdDocument>
  {
    if (files && files.photo)
    {
      createAdDto.photo = files.photo[0].secure_url;
      console.log(createAdDto.photo)
    }
    console.log(createAdDto)
    return this.adsService.create(createAdDto);
  }

  @Get()
  async findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<AboutDocument> | AboutDocument[]>
  {
    return await this.adsService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsUser,
    );
  }



  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.adsService.findOne(id);
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
    return this.adsService.update(id, updateAboutDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    return await this.adsService.remove(id);
  }
}
