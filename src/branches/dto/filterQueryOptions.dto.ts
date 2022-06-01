import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { IntersectionType } from '@nestjs/swagger';

export class FilterQueryBranch
{
    @IsOptional()
    @Transform(({ obj }) =>
    {
        return new RegExp(escapeRegExp(obj.username), 'i');
    })
    username?: string;
    //to filter any 
}

export class FilterQueryOptionsBranch extends IntersectionType(
    FilterQueryBranch,
    PaginationParams,
) { }
