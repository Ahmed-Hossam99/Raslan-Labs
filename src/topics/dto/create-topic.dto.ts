import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsString } from "class-validator"

export class CreateTopicDto
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
    @IsString()
    @IsMongoId()
    category: string
}
