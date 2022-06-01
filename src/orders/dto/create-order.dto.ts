import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { BookingType, GenderType, StatusType } from "../models/normal.model";
import { Availability } from "../models/offers.model";
import { OrderType } from "../models/_order.model";

export class CreateOrderDto
{
    // forAll 
    @IsMongoId()
    @IsOptional()
    @IsString()
    client: string;
    @IsOptional()
    @IsString()
    phone: string
    @IsString()
    username: string;
    @IsOptional()
    @IsString()
    type: OrderType;


    //only normals Order 
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsOptional()
    @IsMongoId({ each: true })
    @IsString({ each: true })
    products: string[]
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsOptional()
    @IsString({ each: true })
    images: string[]
    @IsString()
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsOptional()
    from: string;
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsOptional()
    @IsString()
    to: string;
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsOptional()
    @IsString()
    timeAttendance: string;
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsString()
    address: string;
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsOptional()
    @IsString()
    adminNotes: string;
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsOptional()
    @IsOptional()
    @IsString()
    clientNotes: string
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsOptional()
    @IsOptional()
    @IsString()
    whyRejected: string;
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsString()
    day: Date;
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsString()
    age: Date;
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsString()
    gender: GenderType;
    @IsString()
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    booking: BookingType;
    @ValidateIf(t => t.type === OrderType.NORMALORDER)
    @IsOptional()
    @IsString()
    status: StatusType;



    //only offersOrder 
    // @ValidateIf(t => t.type === OrderType.OFFERSORDER)
    // @IsOptional()
    // @IsString()
    // @ApiProperty({ type: 'string', format: 'binary' })
    // image?: string;
    // @ValidateIf(t => t.type === OrderType.OFFERSORDER)
    // @IsString()
    // @IsOptional()
    // @ApiProperty({ type: 'string', format: 'binary' })
    // icon?: string;
    @ValidateIf(t => t.type === OrderType.OFFERSORDER)
    @IsMongoId({ each: true })
    @IsString({ each: true })
    offers: string[]





    // @ValidateIf(t => t.type === )





}
