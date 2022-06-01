import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import RequestWithUser from '../interfaces/requestWithIUser.interface';
import TokenPayload from '../interfaces/tokenPayload.interface';
import { FilterQuery } from 'mongoose';
import { User, UserDocument } from 'src/users/models/_user.model';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let token = null;
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    const request: RequestWithUser = context.switchToHttp().getRequest();
    request.header('authorization') &&
      (token = request.header('authorization').split(' ')[1]);
    if (isPublic) {
      if (!request.header('authorization')) return true;
    } else {
      if (!request.header('authorization')) return false;
    }
    try { //here not puplic and has token 
      const decoded: TokenPayload = await this.jwtService.verify(token);
      if (decoded.userId === undefined) {
        throw new HttpException(
          'Invalid access token.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = await this.userService.findOne({
        _id: decoded.userId,
      } as FilterQuery<UserDocument>);
      if (!user) return false;

      if (
        request.path.split('/')[3] === 'change-profile-unauthorized' ||
        request.path.split('/')[3] === 'merge-accounts'
      ) {
        request.me = user;
        return true;
      }

      if (user && user.enabled === false) {
        throw new HttpException(
          'Your account is disabled',
          HttpStatus.UNAUTHORIZED,
        );
      }

      request.me = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
