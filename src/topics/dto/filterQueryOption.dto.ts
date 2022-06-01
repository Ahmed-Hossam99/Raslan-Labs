import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { IntersectionType } from '@nestjs/swagger';

export class FilterQueryTopic
{
    @IsOptional()
    @Transform(({ obj }) =>
    {
        return new RegExp(escapeRegExp(obj.titleEn), 'i');
    })
    titleEn?: string;
    //to filter any 
}

export class FilterQueryOptionsTopic extends IntersectionType(
    FilterQueryTopic,
    PaginationParams,
) { }
