import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto
{
    @IsString()
    nameEn: string;
    @IsString()
    nameAr: string;

}
