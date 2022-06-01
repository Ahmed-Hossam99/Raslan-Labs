import { ApiHideProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateBranchDto
{
    @IsString()
    titleAr: string;
    @IsString()
    titleEn: string;
    @ApiHideProperty()
    @IsMongoId()
    @IsOptional()
    city?: string
    @IsMongoId()
    region: string;
    @IsNumber({}, { each: true })
    coordinates: number[];
    @IsString()
    location: string
}
