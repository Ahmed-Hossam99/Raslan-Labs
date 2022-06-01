import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { City, CityDocument } from 'src/cities/entities/city.entity';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Region, RegionDocument } from './entities/region.entity';

@Injectable()
export class RegionRepository extends BaseAbstractRepository<Region> {
    constructor(
        @InjectModel(Region.name) private regionModel: Model<RegionDocument>,

    )
    {
        super(regionModel);
    }
    // any query to access document on db can applaying here like using pagination see => anty ahla countries repositries cities repositores 

    public async createOne(data: CreateQuery<RegionDocument>): Promise<RegionDocument>
    {
        const newDocument = new this.regionModel(data).save();
        return newDocument;
    }

    public async findAllWithPagination(
        queryFiltersAndOptions: any,
    ): Promise<RegionDocument[]>
    {
        console.log(queryFiltersAndOptions)

        const filters: FilterQuery<RegionDocument> = _.pick(queryFiltersAndOptions, [
            'nameEn',
            'city'

            //city to add any filter object 
        ]);
        console.log('here')
        const options: PaginateOptions = _.pick(queryFiltersAndOptions, [
            'page',
            'limit',
        ]);
        let docs;
        if (queryFiltersAndOptions.allowPagination)
        {
            docs = await (this.regionModel as PaginateModel<RegionDocument>).paginate(
                // here we can but any option to to query like sort
                filters,
                options,
            );
        } else
        {
            docs = await this.regionModel.find(filters).populate('city');
        }
        return docs;
    }

    public async findOne(
        filterQuery: FilterQuery<RegionDocument>,
    ): Promise<RegionDocument>
    {
        const doc = await this.regionModel.findOne(filterQuery).populate('city');
        if (!doc) throw new NotFoundException(`${this.regionModel} not found`);
        return doc;
    }
    // //aggrigation 

}
