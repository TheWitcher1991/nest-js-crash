import { IsEmail, IsPositive, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email of the user',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Password of the user',
  })
  @IsString()
  @Length(8, 20)
  readonly password: string;
}

export class AddRoleDto {
  @IsString()
  readonly value: string

  @IsPositive()
  readonly userId: number
}

export class BanUserDto {
  @IsString()
  readonly banReason: string

  @IsPositive()
  readonly userId: number
}
