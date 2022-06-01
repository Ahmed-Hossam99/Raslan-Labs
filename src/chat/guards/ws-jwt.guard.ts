import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import RequestWithUser from 'src/auth/interfaces/requestWithIUser.interface';
import { UserDocument } from 'src/users/models/_user.model';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log('from gurad');
    const client: Socket = context.switchToWs().getClient<Socket>();
    const authToken: string = client.handshake.headers.authorization;
    const user: UserDocument | false =
      await this.authService.verifyUserByTokenFromSocket(
        authToken.split(' ')[1],
      );
    if (user) {
      (context.switchToHttp().getRequest() as RequestWithUser).me = user;
      return true;
    } else {
      client.disconnect();
    }
  }
}
