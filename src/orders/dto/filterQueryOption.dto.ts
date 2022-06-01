import { IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { IntersectionType } from '@nestjs/swagger';
import { OrderType } from '../models/_order.model';


export class FilterQueryOrder
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
    type?: OrderType
    @IsOptional()
    from?: Date

    // @IsOptional()
    // to?: Date


}

export class FilterQueryOptionsOrder extends IntersectionType(
    FilterQueryOrder,
    PaginationParams,
) { }
