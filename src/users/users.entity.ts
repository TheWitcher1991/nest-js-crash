import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/entities/roles.entity';
import { UserRoles } from '../roles/entities/user-roles.entity';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
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
    example: 'user@mail.com',
    description: 'email',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string

  @ApiProperty({
    example: '123456',
    description: 'password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string

  @ApiProperty({
    example: 'true',
    description: 'banned',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean

  @ApiProperty({
    example: 'reason',
    description: 'ban reason',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]
}
