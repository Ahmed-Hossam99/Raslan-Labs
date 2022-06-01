import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { filter } from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions, UpdateQuery } from 'mongoose';
import { RegionDocument } from 'src/regions/entities/region.entity';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import * as moment from 'moment'

import { Product, ProductDocument } from './models/_product.model';

@Injectable()
export class ProductRepository extends BaseAbstractRepository<Product> {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,

    )
    {
        super(productModel);
    }
    public async findOne(
        filterQuery: FilterQuery<ProductDocument>,
    ): Promise<ProductDocument>
    {
        console.log(filterQuery)
        const doc = await this.productModel.findOne(filterQuery).populate(['tests', 'branches']);
        if (!doc) throw new NotFoundException(`${this.productModel} not found`);
        return doc;
    }
    public async findAllWithPagination(
        queryFiltersAndOptions: any,
    ): Promise<ProductDocument[]>
    {
        console.log(queryFiltersAndOptions)

        let filters: FilterQuery<ProductDocument> = _.pick(queryFiltersAndOptions, [
            'titleAr',
            'titleEn',
            'type',
        ]);
        console.log('here')
        const options: PaginateOptions = _.pick(queryFiltersAndOptions, [
            'page',
            'limit',
        ]);
        let query: { type?} = {}


        if (queryFiltersAndOptions.type)
        {
            query.type = queryFiltersAndOptions.type
            delete filters.type
        }

        // filters = query
        let docs;
        console.log(filters)
        if (queryFiltersAndOptions.allowPagination)
        {
            docs = await (this.productModel as PaginateModel<ProductDocument>).paginate(
                // here we can but any option to to query like sort
                {
                    filters,
                    ...query
                },
                {
                    ...options,
                    populate: ['tests', 'branches']
                }
            );
        } else
        {
            docs = await this.productModel.find(filters).populate(['tests', 'branches'])
        }
        return docs;
    }
    public async updateOne(
        filterQuery: FilterQuery<ProductDocument>,
        updateQuery: UpdateQuery<ProductDocument>,
    ): Promise<ProductDocument>
    {
        const product = await this.productModel.findById(filterQuery);
        if (!product) throw new NotFoundException(`${this.productModel} not found`);


        if (updateQuery.branches)
        {
            const branchs = await this.productModel.find({ _id: { $in: updateQuery.branches } });
            const branchesIds = branchs.map(
                (_branch) => _branch.id);
            updateQuery.branches = branchesIds
            console.log(updateQuery.branches);

        }
        if (updateQuery.tests)
        {
            const tests = await this.productModel.find({ _id: { $in: updateQuery.tests } });
            const testsIds = tests.map(
                (_test) => _test.id);
            updateQuery.tests = testsIds
            console.log(updateQuery.tests);

        }
        // if (req.files && req.files['image'])
        // {
        //     req.body.image = req.files['image'][0].secure_url;
        // }
        // if (req.files && req.files['icon'])
        // {
        //     req.body.icon = req.files['icon'][0].secure_url;
        // }
        await product.set(updateQuery).save();

        return product;
    }


}


