import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
  export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    try {
      const roles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ])
      const rq = context.switchToHttp().getRequest()
      const authHeader = rq.headers.authorization;
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Unauthorized')
      }

      const user = this.jwtService.verify(token)
      rq.user = user
      return user.some(role => roles.includes(role))
    } catch (e) {
      throw new UnauthorizedException('Unauthorized')
    }
  }
}
