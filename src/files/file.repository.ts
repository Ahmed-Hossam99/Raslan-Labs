import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { CreateQuery, FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { City, CityDocument } from 'src/cities/entities/city.entity';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { File, FileDocument } from './entities/file.entity';

@Injectable()
export class FileRepository extends BaseAbstractRepository<File> {
    constructor(
        @InjectModel(File.name) private fileModel: Model<FileDocument>,

    )
    {
        super(fileModel);
    }

    public async create(data: CreateQuery<FileDocument>): Promise<FileDocument>
    {
        const newDocument = new this.fileModel(data).save();
        return newDocument;
    }

    //     let photos = [];
    // if (req.files && req.files["image"])
    // {
    //     console.log('here')
    //     for (let i = 0; i < req.files["image"].length; i++)
    //     {
    //         photos.push(req.files['image'][i].secure_url)
    //     }
    // } else if (req.files && req.files["pdf"])
    // {
    //     photos.push(req.files["pdf"][0].secure_url);
    // } else
    //     return APIResponse.BadRequest(res, "No Files Uploaded");
    // //aggrigation 

}
