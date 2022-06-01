import { IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { IntersectionType } from '@nestjs/swagger';
import { ProductType } from '../models/_product.model';


export class FilterQueryProduct
{
    @IsOptional()
    @Transform(({ obj }) =>
    {
        return new RegExp(escapeRegExp(obj.titleAr), 'i');
    })
    titleAr?: string;
    @IsOptional()
    @Transform(({ obj }) =>
    {
        return new RegExp(escapeRegExp(obj.titleEn), 'i');
    })
    titleEn?: string;
    //to filter any 
    @IsOptional()
    type?: ProductType
    // @IsOptional()
    // from?: Date

    // @IsOptional()
    // to?: Date


}

export class FilterQueryOptionsProduct extends IntersectionType(
    FilterQueryProduct,
    PaginationParams,
) { }
