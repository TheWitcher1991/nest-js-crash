import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get all users'
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiResponse({ type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAll()
  }

  @ApiResponse({ type: User })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.getById(+id)
  }
}
