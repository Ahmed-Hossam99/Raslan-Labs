import { NotFoundException } from '@nestjs/common';
import * as _ from 'lodash';
import
{
  CreateQuery,
  FilterQuery,
  UpdateQuery,
  Model,
  Document,
  PaginateOptions,
  PaginateModel,
} from 'mongoose';
// this file = base model in express structre 
type TDocument<T> = T & Document;
export abstract class BaseAbstractRepository<T> {
  private model: Model<TDocument<T>>; // this line if model =user :<TDocument<T>> = UserDocument 

  protected constructor(model: Model<TDocument<T>>)
  {
    this.model = model;
  }

  public async create(data: CreateQuery<TDocument<T>>): Promise<TDocument<T>>
  {
    const newDocument = new this.model(data).save();
    console.log(data)
    console.log(newDocument)
    return newDocument;
  }

  public async findOne(
    filterQuery: FilterQuery<TDocument<T>>,
  ): Promise<TDocument<T>>
  {
    const doc = await this.model.findOne(filterQuery);
    console.log(this.model.modelName)
    console.log(filterQuery)
    if (!doc) throw new NotFoundException(`${this.model.modelName} not found`);
    console.log(doc)

    return doc;
  }

  public async findAllWithPaginationOption(
    queryFiltersAndOptions: any,
  ): Promise<TDocument<T>[]>
  {
    const filters: FilterQuery<TDocument<T>> = _.pick(queryFiltersAndOptions, [
      'username',
    ]);
    const options: PaginateOptions = _.pick(queryFiltersAndOptions, [
      'page',
      'limit',
    ]);
    let docs;
    if (queryFiltersAndOptions.allowPagination)
    {
      docs = await (this.model as PaginateModel<TDocument<T>>).paginate(
        // here we can but any option to to query like sort
        filters,
        options,
      );
    } else
    {
      docs = await this.model.find(filters);
    }
    return docs;
  }

  public async deleteOne(
    filterQuery: FilterQuery<TDocument<T>>,
  ): Promise<void>
  {
    await this.model.deleteOne(filterQuery);
  }

  public async updateOne(
    filterQuery: FilterQuery<TDocument<T>>,
    updateQuery: UpdateQuery<TDocument<T>>,
  ): Promise<TDocument<T>>
  {
    const doc = await this.model.findOne(filterQuery);
    if (!doc) throw new NotFoundException(`${this.model.modelName} not found`);
    await doc.set(updateQuery).save();
    console.log(doc)
    return doc;
  }
}
