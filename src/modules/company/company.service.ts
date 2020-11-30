import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from '@entity/company.entity'
import { UserService } from '../user/user.service'
import { UserDto } from '../user/dto/user.dto'
import { CreateCompanyDto } from './dto/company.create.dto'
import { RegistrationStatus } from '../auth/interfaces/regisration-status.interface'
import { CompanyDto } from './dto/company.dto'
import { toCompanyDto } from 'src/shared/mapper'
import { CompanyListDto } from './dto/company.list.dto'

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly userService: UserService,
  ) {}

  async createCompany(
    { email }: UserDto,
    createCompanyDto: CreateCompanyDto,
  ): Promise<RegistrationStatus> {
    try {
      const status: RegistrationStatus = {
        success: true,
        message: 'Company created!',
      }
      const {
        name,
        address,
        serviceOfActivity,
        numberOfEmployees,
        companyType,
        description,
      } = createCompanyDto

      const companyInDb = await this.companyRepository.findOne({
        where: { name },
      })

      if (companyInDb) {
        throw new HttpException(
          'Company already exists',
          HttpStatus.BAD_REQUEST,
        )
      }

      // get the user from db
      const owner = await this.userService.findOne({ where: { email } })

      const company: Company = this.companyRepository.create({
        name,
        address,
        serviceOfActivity,
        numberOfEmployees,
        companyType,
        description,
        owner,
      })
      await this.companyRepository.save(company)
      return status
    } catch (e) {
      const status: RegistrationStatus = {
        success: false,
        message: e,
      }
      return status
    }
  }

  async getAllCompany(sort: any, id: string): Promise<CompanyListDto> {
    try {
      const companies = await this.companyRepository
        .createQueryBuilder('company')
        .innerJoinAndSelect('company.owner', 'user')
        .where('user.id = :id', { id: id })
        .orderBy(`company.${sort[0]}`, sort[1])
        .getMany()
      return { companies }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllCompanyAdmin(sort: any): Promise<CompanyListDto> {
    try {
      const companies = await this.companyRepository
        .createQueryBuilder('company')
        .orderBy(`company.${sort[0]}`, sort[1])
        .getMany()
      return { companies }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getOneCompany(id: string): Promise<CompanyDto> {
    try {
      const company = await this.companyRepository.findOne({
        where: { id },
        relations: ['owner'],
      })

      if (!company) {
        throw new HttpException(`Company doesn't exist`, HttpStatus.BAD_REQUEST)
      }

      return toCompanyDto(company)
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateCompany(id: string, companyDto: CompanyDto): Promise<CompanyDto> {
    try {
      const {
        name,
        address,
        serviceOfActivity,
        numberOfEmployees,
        companyType,
        description,
        owner,
        createdAt,
      } = companyDto

      let company: CompanyDto = await this.companyRepository.findOne({
        where: { id },
      })

      if (!company) {
        throw new HttpException(`Company doesn't exist`, HttpStatus.BAD_REQUEST)
      }

      company = {
        id,
        address,
        serviceOfActivity,
        numberOfEmployees,
        companyType,
        name,
        description,
        owner,
        createdAt,
      }

      await this.companyRepository.update({ id }, company)

      company = await this.companyRepository.findOne({
        where: { id },
        relations: ['owner'],
      })

      return toCompanyDto(company)
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async destroyCompany(id: string): Promise<RegistrationStatus> {
    try {
      const status: RegistrationStatus = {
        success: true,
        message: 'Company deleted!',
      }
      const company: Company = await this.companyRepository.findOne({
        where: { id },
        relations: ['owner'],
      })

      if (!company) {
        throw new HttpException(`Company doesn't exist`, HttpStatus.BAD_REQUEST)
      }

      await this.companyRepository.remove(company)
      return status
    } catch (e) {
      const status: RegistrationStatus = {
        success: false,
        message: e,
      }
      return status
    }
  }
}
