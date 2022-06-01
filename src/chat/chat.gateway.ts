import { UseFilters, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { User, UserDocument } from 'src/users/models/_user.model';
import { WsJwtGuard } from './guards/ws-jwt.guard';
import { WebsocketsExceptionFilter } from './filters/WebsocketsException.filter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) {}
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('connected');
    if (!client.handshake.headers.authorization) {
      console.log('no token provided');
      client.disconnect();
      return;
    }

    const user: UserDocument | false =
      await this.authService.verifyUserByTokenFromSocket(
        client.handshake.headers.authorization.split(' ')[1],
      );
    // console.log(user);
    if (user) client.join(`user_${user._id}`);
    else client.disconnect();
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('disconnected');
  }

  @UseGuards(WsJwtGuard)
  @UseFilters(new WebsocketsExceptionFilter())
  @SubscribeMessage('test-listen')
  async testListen(@MessageBody() data: any, @AuthUser() me: UserDocument) {
    console.log(data, me.role);
    // throw new WsException('test exception event'); // Nest will handle the thrown exception and emit the exception message
    this.server.to(`user_${me._id}`).emit('test-emit', { msg: 'successful' });
    return data;
  }
}
