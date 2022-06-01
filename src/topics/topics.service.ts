import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { FilterQueryOptionsAbout } from 'src/about/dto/filterQueryOptions.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicDocument } from './entities/topic.entity';
import { TopicRepository } from './topic.repository';

@Injectable()
export class TopicsService
{
  constructor(private readonly topicRepository: TopicRepository,
    private readonly categoriesService: CategoriesService
  ) { }


  async create(createTopicDto: CreateTopicDto)
  {
    await this.categoriesService.findOne(createTopicDto.category)
    return await this.topicRepository.create(createTopicDto);
  }

  async findAll(queryFiltersAndOptions: FilterQueryOptionsAbout,
  ): Promise<PaginateResult<TopicDocument> | TopicDocument[]>
  {
    const categories = await this.topicRepository.findAllWithPaginationOption(
      queryFiltersAndOptions,
    );
    return categories;
  }
  async findOne(id: string)
  {
    return await this.topicRepository.findOne({ _id: id })
  }

  async update(id: string, updateTopicDto: UpdateTopicDto)
  {
    return await this.topicRepository.updateOne({ _id: id }, updateTopicDto)
  }

  async remove(id: string)
  {
    return await this.topicRepository.deleteOne({ _id: id })
  }
}
