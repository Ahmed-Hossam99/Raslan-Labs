import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateRegionDto } from './create-region.dto';

export class UpdateRegionDto
{
    @IsOptional()
    @IsString()
    nameEn: string;
    @IsOptional()
    @IsString()
    nameAr: string;
}
