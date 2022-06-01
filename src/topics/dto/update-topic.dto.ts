import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateTopicDto } from './create-topic.dto';

export class UpdateTopicDto
{
    @IsString()
    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary' })
    image?: string;
    @IsString()
    descriptionAr: string
    @IsString()
    descriptionEn: string
    @IsString()
    titleAr: string
    @IsString()
    titleEn: string

}
