import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    try {
      const rq = context.switchToHttp().getRequest()
      const authHeader = rq.headers.authorization;
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Unauthorized')
      }

      const user = this.jwtService.verify(token)
      rq.user = user
      return true
    } catch (e) {
      throw new UnauthorizedException('Unauthorized')
    }
  }
}
