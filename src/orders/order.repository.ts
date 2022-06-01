import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { filter } from 'lodash';
import { CreateQuery, FilterQuery, Model, models, PaginateModel, PaginateOptions, UpdateQuery } from 'mongoose';
import { RegionDocument } from 'src/regions/entities/region.entity';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import * as moment from 'moment'
import { Order, OrderDocument } from './models/_order.model';
import { Normal, NormalDocument } from './models/normal.model';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { UserDocument } from 'src/users/models/_user.model';


@Injectable()
export class OrderRepository extends BaseAbstractRepository<Order> {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        // @InjectModel(Normal.name) private normalOrderModel: Model<NormalDocument>,

    )
    {
        super(orderModel);
    }
    // public async createNormal(data: CreateQuery<NormalDocument>): Promise<NormalDocument>
    // {
    //     const newDocument = new this.normalOrderModel(data).save();
    //     // console.log(this.model)
    //     return newDocument;
    // }
    // public async findOne(
    //     filterQuery: FilterQuery<OrderDocument>,
    // ): Promise<OrderDocument>
    // {
    //     console.log(filterQuery)
    //     const doc = await this.productModel.findOne(filterQuery).populate(['tests', 'branches']);
    //     if (!doc) throw new NotFoundException(`${this.productModel} not found`);
    //     return doc;
    // }
    public async findAllWithPagination(
        queryFiltersAndOptions: any,
    ): Promise<OrderDocument[]>
    {
        console.log(queryFiltersAndOptions)

        let filters: FilterQuery<OrderDocument> = _.pick(queryFiltersAndOptions, [
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
            docs = await (this.orderModel as PaginateModel<OrderDocument>).paginate(
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
            docs = await this.orderModel.find(filters).populate(['tests', 'branches'])
        }
        return docs;
    }
    public async updateOrder(
        filterQuery: FilterQuery<OrderDocument>,
        updateQuery: UpdateQuery<OrderDocument>,
        @AuthUser() me: UserDocument,
    ): Promise<OrderDocument>
    {
        const doc = await this.orderModel.findOne(filterQuery);
        // const doc2 = await this.normalOrderModel.findOne(doc._id);
        console.log('doc  >================')
        console.log(doc)
        // console.log('doc2 >================')
        // console.log(doc2)

        if (!doc) throw new NotFoundException(`${this.orderModel.name} not found`);


        let title, body, titleAr, bodyAr;
        // client side
        if (me.role === 'client')
        {
            // console.log(order.client)
            // console.log(req.me._id)
            if (doc.client !== me._id) throw new UnauthorizedException(` not allow to do this `)
            if ((doc as any).status !== 'pending') throw new BadRequestException(`sorry this operation not allow in current time `)
            delete updateQuery.booking;
            delete updateQuery.status;
            delete updateQuery.timeAttendance;

            if (updateQuery.products)
            {
                const orderProducts = await models._product.find({ _id: { $in: updateQuery.products } });
                if (updateQuery.booking === 'external')
                { // in home 
                    for (let i = 0; i < orderProducts.length; i++)
                    {
                        const product = orderProducts[i]
                        if (product.availableAt === 'lab')
                        {
                            throw new BadRequestException(`sorry this${product} not allow to home `)
                        }
                    }
                }
                const productsIds = orderProducts.map(
                    (_product) => _product.id);
                updateQuery.products = productsIds
            }
            if (updateQuery.date)
            {
                title = 'client change order date ';
                body = `Order #${doc.id} date  has been changed to ${updateQuery.date}`;
                titleAr = 'تم تغير ميعاد الطلب الخاص بك';
                bodyAr = `طلبك رقم ${doc.id} تم تغير ميعاد`;
            }
        }

        if (me.role === 'admin')
        {
            delete updateQuery.booking;
            delete updateQuery.username;
            delete updateQuery.client;
            delete updateQuery.phone;
            delete updateQuery.gender;
            delete updateQuery.age;
            if (updateQuery.status === "accepted")
            {
                title = "Your order has been accepted";
                body = `Order #${doc.id} has been accepted`;
                titleAr = 'تم قبول الطلب الخاص بك';
                bodyAr = `طلبك رقم ${doc.id} تم قبوله`;
                if (!updateQuery.timeAttendance)
                    throw new NotFoundException(`sorry  time Attendance must be entered `)
            }
            if (updateQuery.status === 'rejected')
            {
                title = 'Your order has been rejected';
                body = `Order #${doc.id} has been rejected`;
                titleAr = 'تم رفض الطلب الخاص بك';
                bodyAr = `طلبك رقم ${doc.id} تم رفضه`;
                if (!updateQuery.whyRejected)
                    throw new NotFoundException(`sorry why Rejected must be entered `)
            }
            if (updateQuery.status === 'inProgress')
            {
                title = 'Your order has been deleverd';
                body = `Order #${doc.id} has been deleverd`;
                titleAr = 'تم سحب عينة  الطلب الخاص بك';
                bodyAr = `طلبك رقم ${doc.id}تم  تم سحب عينتة `;
            }
            if (updateQuery.date)
            {
                title = 'admin change order date ';
                body = `Order #${doc.id} date  has been changed to ${updateQuery.date}`;
                titleAr = 'تم تغيير تاريخ الطلب الخاص بك';
                bodyAr = `طلبك رقم ${doc.id}تم تغيير تاريخ `;

            }
        }
        // const notification = await new models.notification({
        //     title: title,
        //     body: body,
        //     titleAr: titleAr,
        //     bodyAr: bodyAr,
        //     user: me.id,
        //     receiver: doc.client,
        //     subjectType: 'order',
        //     subject: doc.id,
        // }).save();
        // console.log(notification);
        // const receiver = await models._user.findOne({
        //     _id: order.client,
        // });
        // await receiver.sendNotification(notification.toFirebaseNotification());
        // ================
        console.log(title, body, titleAr)
        await doc.set(updateQuery).save();
        console.log(doc)
        return doc;
    }


}


//