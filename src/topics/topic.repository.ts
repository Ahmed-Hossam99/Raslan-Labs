import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { City, CityDocument } from 'src/cities/entities/city.entity';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Topic, TopicDocument } from './entities/topic.entity';

@Injectable()
export class TopicRepository extends BaseAbstractRepository<Topic> {
    constructor(
        @InjectModel(Topic.name) private topicModel: Model<TopicDocument>,

    )
    {
        super(topicModel);
    }
    // any query to access document on db can applaying here like using pagination see => anty ahla countries repositries cities repositores 

    // //aggrigation 

}
