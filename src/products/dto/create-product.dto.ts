import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { OfferType } from "../models/offers.model";
import { Availability } from "../models/packages.model";
import { ProductType } from "../models/_product.model";

export class CreateProductDto
{
    @IsString()
    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary' })
    image?: string;
    @IsString()
    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary' })
    icon?: string;
    @IsString()
    titleAr: string;
    @IsString()
    titleEn: string;
    @IsMongoId({ each: true })
    @IsString({ each: true })
    branches: string[]
    @ValidateIf(t => t.type === ProductType.PACKAGE)
    @IsMongoId({ each: true })
    @IsString({ each: true })
    tests: string[]
    // @IsString()
    // descriptionAr: string
    @IsOptional()
    @IsNumber()
    price: number
    @IsOptional()
    @IsNumber()
    priceAfterDiscount: number
    @ValidateIf(t => t.type === ProductType.OFFER)
    @IsString()
    offerType: OfferType //enum offers // only for offers
    @ValidateIf(t => t.type === ProductType.PACKAGE)
    @IsString()
    availableAt: Availability //enum package //only for package
    @IsString()
    type: ProductType // type of test 
    @ValidateIf(t => t.type === ProductType.OFFER)
    @IsOptional()
    @IsString()
    detailsAr?: string // only for offers
    @ValidateIf(t => t.type === ProductType.OFFER)
    @IsOptional()
    @IsString()
    detailsEn?: string // only for offers
    @ValidateIf(t => t.type === ProductType.PACKAGE)
    @IsString({ each: true })
    measuresAr: string[] //only for package 
    @ValidateIf(t => t.type === ProductType.PACKAGE)
    @IsString({ each: true })
    measuresEn: string[] //only for package



}
