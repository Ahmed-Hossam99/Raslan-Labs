import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Order } from "src/orders/models/_order.model";
import { User } from "src/users/models/_user.model";
export enum subjectTypes
{
    USER = 'User',
    ORDER = 'Order',
}
export class CreateResultDto
{
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
    @IsString()
    @IsOptional()
    attachment: string;
    @IsString()
    @IsOptional()
    notes: string;
    @IsString()
    titleAr: string;
    @IsString()
    titleEn: string;
    @IsString()
    @IsMongoId()
    @IsString()
    @IsOptional()
    client?: string
    @IsMongoId()
    @IsString()
    subject: string
    @IsString()
    @IsOptional()
    @IsEnum(subjectTypes)
    subjectType: subjectTypes


}
