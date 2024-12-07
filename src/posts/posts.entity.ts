import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
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

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  context: string

  @Column({
    type: DataType.STRING,
  })
  image: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number

  @BelongsTo(() => User)
  roles: User
}
