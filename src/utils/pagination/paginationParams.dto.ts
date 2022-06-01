import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 8;

  @IsOptional()
  @Transform(({ obj }) => {
    return [true, 'true'].indexOf(obj.allowPagination) > -1;
  })
  allowPagination?: boolean = true;
}
