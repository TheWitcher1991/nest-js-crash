import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './roles.entity';
import { User } from '../../users/users.entity';

@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({
    example: '1',
    description: 'id',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({
    example: '1',
    description: 'roleId',
  })
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  roleId: number

  @ApiProperty({
    example: '1',
    description: 'userId',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number
}
