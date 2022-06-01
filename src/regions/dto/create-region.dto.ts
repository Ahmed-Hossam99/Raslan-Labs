import { IsMongoId, IsString } from "class-validator";

export class CreateRegionDto
{
    @IsString()
    nameEn: string;
    @IsString()
    nameAr: string;
    @IsMongoId()
    city: string
}
