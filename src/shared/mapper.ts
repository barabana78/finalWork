import { CompanyDto } from 'src/modules/company/dto/company.dto'
import { UserDto } from 'src/modules/user/dto/user.dto'

export const toUserDto = (data: UserDto): UserDto => {
  const {
    id,
    email,
    nickname,
    role,
    phoneNumber,
    lastName,
    firstName,
    position,
    description,
  } = data

  // eslint-disable-next-line prefer-const
  let userDto: UserDto = {
    id,
    email,
    nickname,
    role,
    phoneNumber,
    lastName,
    firstName,
    position,
    description,
  }

  return userDto
}

export const toCompanyDto = (data: CompanyDto): CompanyDto => {
  const {
    id,
    name,
    description,
    address,
    serviceOfActivity,
    numberOfEmployees,
    companyType,
    createdAt,
    owner,
  } = data

  // eslint-disable-next-line prefer-const
  let companyDto: CompanyDto = {
    id,
    name,
    address,
    serviceOfActivity,
    numberOfEmployees,
    companyType,
    createdAt,
    description,
    owner: toUserDto(owner),
  }

  return companyDto
}
