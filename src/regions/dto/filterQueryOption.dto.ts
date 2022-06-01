import { IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { IntersectionType } from '@nestjs/swagger';

export class FilterQueryRegion
{
    @IsOptional()
    @Transform(({ obj }) =>
    {
        return new RegExp(escapeRegExp(obj.nameEn), 'i');
    })
    nameEn?: string;
    //to filter any 
    @IsOptional()
    @IsMongoId()
    city?: string

}

export class FilterQueryOptionsRegion extends IntersectionType(
    FilterQueryRegion,
    PaginationParams,
) { }
