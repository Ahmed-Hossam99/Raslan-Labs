import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAdDto
{
    @IsString()
    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary' })
    photo?: string;
    @IsString()
    titleAr: string;
    @IsString()
    titleEn: string;
    @IsMongoId({ each: true })
    @IsString({ each: true })
    @IsOptional()
    branches: string[]
    @IsString()
    descriptionAr: string
    @IsString()
    descriptionEn: string


}
