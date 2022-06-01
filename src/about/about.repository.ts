import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { City, CityDocument } from 'src/cities/entities/city.entity';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { About, AboutDocument } from './entities/about.entity';

@Injectable()
export class AboutRepository extends BaseAbstractRepository<About> {
    constructor(
        @InjectModel(About.name) private aboutModel: Model<AboutDocument>,

    )
    {
        super(aboutModel);
    }
    // any query to access document on db can applaying here like using pagination see => anty ahla countries repositries cities repositores 

    public async createOne(data: CreateQuery<AboutDocument>): Promise<AboutDocument>
    {
        //    if(data.photo) data.image= data.photo
        const newDocument = new this.aboutModel(data).save();
        return newDocument;
    }

    // //aggrigation 

}
