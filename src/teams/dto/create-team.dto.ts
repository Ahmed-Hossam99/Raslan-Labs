// export class CreateTeamDto {}
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator"

export class CreateTeamDto
{
    @IsString()
    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary' })
    photo?: string;
    @IsString()
    descriptionAr: string
    @IsString()
    descriptionEn: string
    @IsString()
    nameAr: string
    @IsString()
    nameEn: string
}

