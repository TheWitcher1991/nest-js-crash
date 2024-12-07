import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.entity';
import { AddRoleDto, BanUserDto, CreateUserDto } from './users.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getByValue("USER")
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;
  }

  async getAll() {
    return await this.userRepository.findAll({
      include: {
        all: true
      }
    });
  }

  async getById(id: number) {
    return await this.userRepository.findByPk(id)
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email
      },
      include: {
        all: true
      }
    })
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.roleService.getByValue(dto.value)
    if (role && user) {
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    user.banned = true
    user.banReason = dto.banReason
    await user.save()
    return user
  }
}
