import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator"

export class CreateAboutDto
{
    @IsString()
    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary' })
    photo?: string;
    @IsString()
    descriptionAr: string
    @IsString()
    descriptionEn: string
}
