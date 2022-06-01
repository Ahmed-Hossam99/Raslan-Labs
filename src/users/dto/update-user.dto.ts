import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsBoolean()
  @IsOptional() // this inject to validate this field when it comming from network 
  enabled?: boolean;// ? validate when you call from service to another 

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  photo?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
