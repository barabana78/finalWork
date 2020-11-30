import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { Company } from '@entity/company.entity'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string

  @IsNotEmpty()
  readonly phoneNumber: string

  @IsNotEmpty()
  readonly lastName: string

  @IsNotEmpty()
  readonly firstName: string

  @IsNotEmpty()
  readonly nickname: string

  @IsNotEmpty()
  readonly position: string

  readonly role: string[]

  readonly companies: Company[]

  @IsNotEmpty()
  readonly description: string
}
