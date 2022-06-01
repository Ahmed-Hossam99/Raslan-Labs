import { Prop } from "@nestjs/mongoose";
import { ApiHideProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Constants } from "src/utils/constants";
import { ContactStatus } from "../entities/contact.entity";


export class CreateContactDto
{

    @IsString()
    username: string
    @IsString()
    phone: string
    @IsString()
    email: string
    @IsString()
    message: string
    // @IsString()
    // @ApiHideProperty()
    // status: ContactStatus //= ContactStatus.UNSEEN

}
