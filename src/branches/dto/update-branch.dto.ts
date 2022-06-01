
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
export class UpdateBranchDto
{
    @IsOptional()

    @IsString()
    titleAr: string;
    @IsOptional()

    @IsString()
    titleEn: string;
    @IsOptional()

    @IsNumber({ allowNaN: false })
    coordinates: [number];
    @IsOptional()

    @IsString()
    location: string
}

