import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/users.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.create({
      ...userDto,
      password: hash
    })
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
