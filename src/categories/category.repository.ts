import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { City, CityDocument } from 'src/cities/entities/city.entity';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoryRepository extends BaseAbstractRepository<Category> {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,

    )
    {
        super(categoryModel);
    }
    // any query to access document on db can applaying here like using pagination see => anty ahla countries repositries cities repositores 

    // //aggrigation 

}
