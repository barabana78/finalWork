import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@entity/user.entity'
import { UserDto } from './dto/user.dto'
import { toUserDto } from 'src/shared/mapper'
import { RegistrationStatus } from '../auth/interfaces/regisration-status.interface'
import { UserListDto } from './dto/user.list.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(options: any): Promise<UserDto> {
    const user = await this.userRepository.findOne(options)
    return toUserDto(user)
  }

  async getOneUser(id: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['companies'],
      })
      if (!user) {
        throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST)
      }
      return toUserDto(user)
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateUser(id: string, userDto: UserDto): Promise<UserDto> {
    try {
      const {
        email,
        role,
        phoneNumber,
        lastName,
        firstName,
        nickname,
        position,
        description,
      } = userDto

      let user: UserDto = await this.userRepository.findOne({
        where: { id },
      })

      if (!user) {
        throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST)
      }

      user = {
        id,
        role,
        email,
        phoneNumber,
        lastName,
        firstName,
        nickname,
        position,
        description,
      }
      await this.userRepository.update({ id }, user)

      user = await this.userRepository.findOne({
        where: { id },
        relations: ['companies'],
      })

      return toUserDto(user)
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllUsers(sort: any): Promise<UserListDto> {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .orderBy(`user.${sort[0]}`, sort[1])
        .getMany()
      return { users }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async destoryUser(id: string): Promise<RegistrationStatus> {
    try {
      const status: RegistrationStatus = {
        success: true,
        message: 'User deleted!',
      }

      const user: User = await this.userRepository.findOne({
        where: { id },
        relations: ['companies'],
      })

      if (!user) {
        throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST)
      }

      if (user.companies && user.companies.length > 0) {
        throw new HttpException(
          `Cannot delete this ${user.email}, it has existing companies`,
          HttpStatus.FORBIDDEN,
        )
      }
      await this.userRepository.remove(user)
      return status
    } catch (e) {
      const status = {
        success: false,
        message: e,
      }
      return status
    }
  }
}
