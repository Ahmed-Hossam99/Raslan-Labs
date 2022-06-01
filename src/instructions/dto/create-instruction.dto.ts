import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInstructionDto
{

    @IsString()
    titleAr: string;
    @IsString()
    titleEn: string;
    @IsString({ each: true })
    detailsAr: string[]
    @IsString({ each: true })
    detailsEn: string[]


}
