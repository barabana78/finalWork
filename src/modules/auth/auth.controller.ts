import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { CreateUserDTO } from '../user/dto/create-user.dto'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { AuthService } from './auth.service'
import { LoginStatus } from './interfaces/login-status.interface'
import { RegistrationStatus } from './interfaces/regisration-status.interface'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  public async register(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    )

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST)
    }
    return result
  }

  @Post('signIn')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto)
  }
}
