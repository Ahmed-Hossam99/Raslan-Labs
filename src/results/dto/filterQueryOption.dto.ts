import { IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { IntersectionType } from '@nestjs/swagger';
// import { OrderType } from '../models/_order.model';


export class FilterQueryResult
{
    // @IsOptional()
    // @Transform(({ obj }) =>
    // {
    //     return new RegExp(escapeRegExp(obj.titleAr), 'i');
    // })
    // titleAr?: string;
    // @IsOptional()
    // @Transform(({ obj }) =>
    // {
    //     return new RegExp(escapeRegExp(obj.titleEn), 'i');
    // })
    // titleEn?: string;
    // //to filter any 
    @IsOptional()
    type?: string
    @IsOptional()
    from?: Date

    @IsOptional()
    to?: Date
    @IsOptional()
    today?: string
    @IsOptional()
    order?: string
    @IsOptional()
    subjectType?: string
    @IsOptional()
    @IsMongoId()
    client?: string



}

export class FilterQueryOptionResult extends IntersectionType(
    FilterQueryResult,
    PaginationParams,
) { }
