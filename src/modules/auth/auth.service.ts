import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@entity/user.entity'
import { toUserDto } from 'src/shared/mapper'
import { CreateUserDTO } from '../user/dto/create-user.dto'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { UserDto } from '../user/dto/user.dto'
import { LoginStatus } from './interfaces/login-status.interface'
import { JwtPayload } from './interfaces/payload.interface'
import { RegistrationStatus } from './interfaces/regisration-status.interface'

@Injectable()
export class AuthService {
  constructor(
    // private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(options: any): Promise<UserDto> {
    const user = await this.userRepository.findOne(options)
    return toUserDto(user)
  }

  async register(userDto: CreateUserDTO): Promise<RegistrationStatus> {
    try {
      const {
        email,
        password,
        phoneNumber,
        lastName,
        firstName,
        nickname,
        position,
        description,
      } = userDto

      const status: RegistrationStatus = {
        success: true,
        message: 'user registered',
      }
      // check if the user exists in the db
      const userInDb = await this.userRepository.findOne({ where: { email } })
      if (userInDb) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
      }

      const user: User = await this.userRepository.create({
        email,
        password,
        phoneNumber,
        lastName,
        firstName,
        nickname,
        position,
        description,
      })

      await this.userRepository.save(user)
      return status
    } catch (e) {
      const status: RegistrationStatus = {
        success: false,
        message: e,
      }
      return status
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    try {
      // find user in db
      const { email, password } = { ...loginUserDto }
      const user = await this.userRepository.findOne({ where: { email } })

      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
      }
      // compare passwords
      const areEqual = await bcrypt.compare(password, user.password)
      if (!areEqual) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
      }

      // generate and sign token
      const token = this._createToken(user)

      return {
        userId: user.id,
        nickname: user.nickname,
        role: user.role,
        ...token,
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  private _createToken({ email }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN

    const user: JwtPayload = { email }
    const token = `Bearer ${this.jwtService.sign(user)}`
    return {
      expiresIn,
      token,
    }
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    try {
      const email = payload.email
      const user = await this.userRepository.findOne({ where: { email } })

      if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
      }
      return user
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
