import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions, QueryPopulateOptions } from 'mongoose';
import { City, CityDocument } from 'src/cities/entities/city.entity';
import { RegionsService } from 'src/regions/regions.service';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Branch, BranchDocument } from './entities/branch.entity';

@Injectable()
export class BranchRepository extends BaseAbstractRepository<Branch> {
    constructor(
        @InjectModel(Branch.name) private branchModel: Model<BranchDocument>
    )
    {

        super(branchModel);
    }
    public async findAllWithPaginationOption(
        queryFiltersAndOptions: any,
    ): Promise<BranchDocument[]>
    {
        const filters: FilterQuery<BranchDocument> = _.pick(queryFiltersAndOptions, [

        ]);
        const options: PaginateOptions = _.pick(queryFiltersAndOptions, [
            'page',
            'limit',
            'populate'
        ]);
        let docs;
        if (queryFiltersAndOptions.allowPagination)
        {

            docs = await (this.branchModel as PaginateModel<BranchDocument>).paginate(
                // here we can but any option to to query like sort
                filters,

                {
                    ...options,
                    populate: ["region", "city"]

                },
            );
        } else
        {
            docs = await this.branchModel.find(filters);
        }
        return docs;
    }

    public async findOne(
        filterQuery: FilterQuery<BranchDocument>,
    ): Promise<BranchDocument>
    {
        const doc = await this.branchModel.findOne(filterQuery).populate(["region", "city"]);
        if (!doc) throw new NotFoundException(`${this.branchModel} not found`);
        return doc;
    }

}
