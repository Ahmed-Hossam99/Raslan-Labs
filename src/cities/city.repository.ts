import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import _ from 'lodash';
import { FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { City, CityDocument } from './entities/city.entity';

@Injectable()
export class CityRepository extends BaseAbstractRepository<City> {
    constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>)
    {
        super(cityModel);
    }
    // //aggrigation 

}
