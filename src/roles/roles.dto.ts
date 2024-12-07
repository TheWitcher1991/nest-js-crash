import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'value',
  })
  @IsString()
  readonly value: string;

  @ApiProperty({
    example: 'description',
    description: 'description',
  })
  @IsString()
  readonly description: string;
}
