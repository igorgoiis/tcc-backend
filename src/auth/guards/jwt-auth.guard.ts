import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUserJwt } from '../interface/user-jwt.interface';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_METADATA_KEY } from '../../common/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): any {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    return isPublic ?? super.canActivate(context);
  }

  handleRequest(err: Error, user: IUserJwt): any {
    if (err || !user) {
      throw err || new UnauthorizedException('Não autorizado.');
    }

    return user;
  }
}
