import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/roles.entity';
import { CreateRoleDto } from './roles.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getByValue(value: string) {
    return await this.roleRepository.findOne({
      where: {
        value
      }
    })
  }
}
