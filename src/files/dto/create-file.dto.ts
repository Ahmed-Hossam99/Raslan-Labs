import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator"
import { ApiMultiFile } from "src/shared/decorators/api-file.decorator";

export class CreateFileDto
{
    // @IsString()
    photos?: string[]
    // @IsString({ each: true })
    files?: string[];
}
