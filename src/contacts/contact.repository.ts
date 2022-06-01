import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { filter } from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { RegionDocument } from 'src/regions/entities/region.entity';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Contact, ContactDocument, ContactStatus } from './entities/contact.entity';
import * as moment from 'moment'

@Injectable()
export class ContactRepository extends BaseAbstractRepository<Contact> {
    constructor(
        @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,

    )
    {
        super(contactModel);
    }
    // any query to access document on db can applaying here like using pagination see => anty ahla countries repositries cities repositores

    public async create(data: CreateQuery<ContactDocument>): Promise<ContactDocument>
    {
        data.status = ContactStatus.UNSEEN
        const newDocument = new this.contactModel(data).save();
        return newDocument;
    }

    public async findOne(
        filterQuery: FilterQuery<ContactDocument>,
    ): Promise<ContactDocument>
    {
        console.log(filterQuery)
        const doc = await this.contactModel.findOne(filterQuery);
        if (!doc) throw new NotFoundException(`${this.contactModel} not found`);
        doc.status = ContactStatus.SEEN
        await doc.save()
        return doc;
    }

    public async findAllWithPagination(
        queryFiltersAndOptions: any,
    ): Promise<ContactDocument[]>
    {
        console.log(queryFiltersAndOptions)

        let filters: FilterQuery<ContactDocument> = _.pick(queryFiltersAndOptions, [
            'status',
            'from',
            'to',
        ]);
        console.log('here')
        const options: PaginateOptions = _.pick(queryFiltersAndOptions, [
            'page',
            'limit',
        ]);
        let query: { createdAt?, today?, status?} = {}

        if (queryFiltersAndOptions.from && queryFiltersAndOptions.to)
        {
            query.createdAt = {
                $gte: moment(queryFiltersAndOptions.from).utc().startOf('d').toDate(),
                $lt: moment(queryFiltersAndOptions.to).utc().endOf('d').toDate()
            }
            delete filters.from
            delete filters.to


        }
        if (queryFiltersAndOptions.status)
        {
            query.status = queryFiltersAndOptions.status
            delete filters.status
        }

        // filters = query
        let docs;
        console.log(filters)
        if (queryFiltersAndOptions.allowPagination)
        {
            docs = await (this.contactModel as PaginateModel<ContactDocument>).paginate(
                // here we can but any option to to query like sort
                {
                    filters,
                    ...query
                },
                options,
            );
        } else
        {
            docs = await this.contactModel.find(filters).populate('city');
        }
        return docs;
    }
    // //aggrigation 

}


