import { IsEmail, IsString } from 'class-validator';
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
  readonly password: string;
}
