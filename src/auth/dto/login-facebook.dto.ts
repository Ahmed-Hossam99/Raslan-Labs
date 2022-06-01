import { IsNotEmpty, IsString } from 'class-validator';
export class LoginFacebookDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
