import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions, UpdateQuery } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import * as moment from 'moment'

import { Result, ResultDocument } from './entities/result.entity';
import { OrdersService } from 'src/orders/orders.service';
import { User, UserDocument, UserRole } from 'src/users/models/_user.model';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ResultRepository extends BaseAbstractRepository<Result> {
    constructor(
        @InjectModel(Result.name) private resultModel: Model<ResultDocument>,
        // @InjectModel(Normal.name) private normalOrderModel: Model<NormalDocument>,
        private readonly ordersServices: OrdersService,
        private readonly userServices: UsersService,



    )
    {
        super(resultModel);
    }

    public async create(data: CreateQuery<ResultDocument>): Promise<ResultDocument>
    {


        // const user = req.authenticatedUser;

        const subjectType = data.subjectType; //order , user
        console.log(subjectType)

        let doc
        if (subjectType === 'Order')
        {
            doc = await this.ordersServices.findOne(data.subject)
            console.log('order  => ' + doc)


        } else
        {
            doc = await this.userServices.findOne({ _id: data.subject } as FilterQuery<UserDocument>)
            console.log('user  => ' + doc)

        }

        if (subjectType === 'Order')
        {
            data.client = doc.client;
        } else
            data.client = doc._id;


        // const newresult = await new models.result(req.body).save();
        // if (subjectType === "order")
        // {
        //     doc.result = newresult._id
        //     doc.status = 'done'
        //     await doc.save()
        //     const notification = await new models.notification({
        //         title: 'Your order has been deleverd',
        //         body: `Order #${doc.id} has been deleverd`,
        //         titleAr: 'تم رفع نتيجة الطلب الخاص بك',
        //         bodyAr: `طلبك رقم ${doc.id} تم رفع نتيجه`,
        //         user: user.id,
        //         receiver: doc.client,
        //         subjectType: 'result',
        //         subject: newresult._id,
        //     }).save();
        //     // console.log(notification);
        //     const receiver = await models._user.findOne({
        //         _id: doc.client,
        //     });
        //     await receiver.sendNotification(notification.toFirebaseNotification());

        // }
        console.log('data =>    ' + data)
        console.log(data)
        const newResultDocument = new this.resultModel(data).save();
        return newResultDocument;
    }
    // public async findOne(
    //     filterQuery: FilterQuery<OrderDocument>,
    // ): Promise<OrderDocument>
    // {
    //     console.log(filterQuery)
    //     const doc = await this.productModel.findOne(filterQuery).populate(['tests', 'branches']);
    //     if (!doc) throw new NotFoundException(`${this.productModel} not found`);
    //     return doc;
    // }
    public async findAllResult(
        @AuthUser() me: UserDocument,
        queryFiltersAndOptions: any,

    ): Promise<ResultDocument[]>
    {
        // let query: { role?, today,} = {}
        let stages = [
            {
                $match: {
                    ...(me.role === 'admin' && queryFiltersAndOptions.client
                        && {
                        client: queryFiltersAndOptions.client,

                    }),
                    ...(me.role === 'admin' && queryFiltersAndOptions.today && {
                        createdAt: { $gte: moment.utc().startOf('d').toDate(), },

                    }),
                    ...(me.role === 'admin' && queryFiltersAndOptions.from &&
                        queryFiltersAndOptions.to && {
                        createdAt: {
                            $gte: moment(queryFiltersAndOptions.from).utc().startOf('d').toDate(),
                            $lt: moment(queryFiltersAndOptions.to).utc().endOf('d').toDate()
                        },

                    }),

                    ...(me.role === 'admin' && queryFiltersAndOptions.order && {
                        subject: parseInt(queryFiltersAndOptions.order),
                    }),

                    ...(me.role === 'admin' && queryFiltersAndOptions.subjectType && {
                        subjectType: queryFiltersAndOptions.subjectType,
                    }),


                    ...(me.role === UserRole.CLIENT && queryFiltersAndOptions.today && {
                        client: me.id,
                        createdAt: { $gte: moment.utc().startOf('d').toDate(), },

                    }),
                    ...(me.role === UserRole.CLIENT && {
                        client: me._id,
                    }),

                },
            },

            {
                $addFields: {
                    day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                },
            },
            {
                $group: {
                    _id: "$day",
                    docs: {
                        $push: {
                            id: "$_id",
                            client: "$client",
                            titleEn: "$titleEn",
                            titleAr: "$titleAr",
                            subjectType: "$subjectType",
                            images: "$images",
                            subject: "$subject",
                            attachment: "$attachment",
                            createdAt: "$createdAt",
                        },
                    },
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
        ];
        console.log(stages)
        let results = await this.resultModel.aggregate(stages);
        console.log(results)
        return results
    }
    public async updateOne(
        filterQuery: FilterQuery<ResultDocument>,
        updateQuery: UpdateQuery<ResultDocument>,
    ): Promise<ResultDocument>
    {
        const doc = await this.resultModel.findOne(filterQuery);
        if (!doc) throw new NotFoundException(`${this.resultModel.modelName} not found`);
        await doc.set(updateQuery).save();
        console.log(doc)
        return doc;
    }


}









