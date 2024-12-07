import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/users.entity';
import { UserRoles } from './user-roles.entity';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<User, RoleCreationAttrs> {
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
    example: 'admin',
    description: 'value',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string

  @ApiProperty({
    example: 'description',
    description: 'description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}
