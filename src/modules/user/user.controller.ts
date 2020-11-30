// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from '../adminGuards/roles.decorator'
import { RolesGuard } from '../adminGuards/roles.guard'
import { RegistrationStatus } from '../auth/interfaces/regisration-status.interface'
import { UserDto } from './dto/user.dto'
import { UserListDto } from './dto/user.list.dto'
import { UserService } from './user.service'

@Controller('api/user')
export class UserController {
  constructor(public userService: UserService) {}

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getOneUser(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
  ): Promise<UserDto> {
    return await this.userService.updateUser(id, userDto)
  }
  //ADMIN
  @Post('list')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async findAll(@Body() sort: any): Promise<UserListDto> {
    const users = await this.userService.getAllUsers(sort)
    return users
  }
  //ADMIN
  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async deleteUser(@Param('id') id: string): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.userService.destoryUser(id)
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST)
    }
    return result
  }
}
