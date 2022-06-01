import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicDocument } from './entities/topic.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { FilterQueryOptionsAbout } from 'src/about/dto/filterQueryOptions.dto';
import { FilterQueryOptionsUser } from 'src/users/dto/filterQueryOptions.dto';
@ApiBearerAuth()
@ApiTags('TOPICS')
@Controller('topics')
export class TopicsController
{
  constructor(private readonly topicsService: TopicsService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 3 }]))
  @ApiConsumes('multipart/form-data')
  create(@UploadedFiles()
  files,
    @Body() createTopicDto: CreateTopicDto): Promise<TopicDocument>
  {
    if (files && files.image)
    {
      createTopicDto.image = files.image[0].secure_url;
    }
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  async findAll(
    @Query() queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<TopicDocument> | TopicDocument[]>
  {
    return await this.topicsService.findAll(
      queryFiltersAndOptions as FilterQueryOptionsUser,
    );
  }



  @Get(':id')
  findOne(@Param('id') id: string)
  {
    return this.topicsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  update(
    @UploadedFiles()
    files,
    @Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto)
  {
    if (files && files.image) updateTopicDto.image = files.image[0].secure_url;
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string)
  {
    return await this.topicsService.remove(id);
  }
}
