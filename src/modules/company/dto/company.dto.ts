import { IsNotEmpty } from 'class-validator'
import { UserDto } from 'src/modules/user/dto/user.dto'

export class CompanyDto {
  @IsNotEmpty() id: string
  @IsNotEmpty() name: string
  @IsNotEmpty() address: string
  @IsNotEmpty() serviceOfActivity: string
  @IsNotEmpty() numberOfEmployees: number
  @IsNotEmpty() companyType: string
  @IsNotEmpty() description: string
  @IsNotEmpty() createdAt: Date
  owner: UserDto
}
