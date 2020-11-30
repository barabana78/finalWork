import { UserRole } from '@entity/user.entity'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserDto {
  @IsNotEmpty() id: string
  @IsEmail() email: string
  @IsNotEmpty() nickname: string
  @IsNotEmpty() role: UserRole
  @IsNotEmpty() phoneNumber: string
  @IsNotEmpty() lastName: string
  @IsNotEmpty() firstName: string
  @IsNotEmpty() position: string
  @IsNotEmpty() description: string
}
