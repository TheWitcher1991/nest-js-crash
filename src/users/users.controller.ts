import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddRoleDto, BanUserDto, CreateUserDto } from './users.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { RoleGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/auth.decorator';
import { ValidatePipe } from '../pipes/validate-pipe';

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
  @UsePipes(ValidatePipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiResponse({ type: [User] })
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.usersService.getAll()
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/role')
  addRole(@Body() roleDto: AddRoleDto) {
    return this.usersService.addRole(roleDto)
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/ban')
  ban(@Body() banDto: BanUserDto) {
    return this.usersService.banUser(banDto)
  }

}
