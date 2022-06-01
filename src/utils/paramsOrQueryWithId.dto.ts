import { IsMongoId, IsOptional } from 'class-validator';

class ParamsOrQueryWithId {
  @IsOptional()
  @IsMongoId()
  id?: string;
}

export default ParamsOrQueryWithId;
