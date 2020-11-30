import { IsNotEmpty, MaxLength } from 'class-validator'
import { UserDto } from 'src/modules/user/dto/user.dto'

export class CreateCompanyDto {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly address: string

  @IsNotEmpty()
  readonly serviceOfActivity: string

  @IsNotEmpty()
  readonly numberOfEmployees: number

  @IsNotEmpty()
  readonly companyType: string

  @IsNotEmpty()
  @MaxLength(500)
  readonly description: string

  readonly owner: UserDto
}
