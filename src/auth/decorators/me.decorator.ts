import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import RequestWithUser from '../interfaces/requestWithIUser.interface';

export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = (request as RequestWithUser).me;
    return data ? user?.[data] : user;
  },
);
