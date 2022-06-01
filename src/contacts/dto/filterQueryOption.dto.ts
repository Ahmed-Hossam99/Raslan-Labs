import { IsMongoId, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { IntersectionType } from '@nestjs/swagger';
import { ContactStatus } from '../entities/contact.entity';


export class FilterQueryContact
{
    // @IsOptional()
    // @Transform(({ obj }) =>
    // {
    //     return new RegExp(escapeRegExp(obj.nameEn), 'i');
    // })
    // nameEn?: string;
    // //to filter any 
    @IsOptional()
    status?: ContactStatus
    @IsOptional()
    from?: Date

    @IsOptional()
    to?: Date


}

export class FilterQueryOptionsContact extends IntersectionType(
    FilterQueryContact,
    PaginationParams,
) { }
