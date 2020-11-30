// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RegistrationStatus } from '../auth/interfaces/regisration-status.interface'
import { Roles } from '../adminGuards/roles.decorator'
import { RolesGuard } from '../adminGuards/roles.guard'
import { UserDto } from '../user/dto/user.dto'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/company.create.dto'
import { CompanyDto } from './dto/company.dto'
import { CompanyListDto } from './dto/company.list.dto'

@Controller('api/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('generate')
  @UseGuards(AuthGuard())
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req: any,
  ): Promise<RegistrationStatus> {
    const user = req.user as UserDto
    const result: RegistrationStatus = await this.companyService.createCompany(
      user,
      createCompanyDto,
    )
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST)
    }
    return result
  }

  // /api/company/list
  @Post('list')
  @UseGuards(AuthGuard())
  async findAll(@Body() sort: any, @Req() req: any): Promise<CompanyListDto> {
    const companies = await this.companyService.getAllCompany(sort, req.user.id)
    return companies
  }

  @Post('adminList')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async findAllAdmin(@Body() sort: any): Promise<CompanyListDto> {
    const companies = await this.companyService.getAllCompanyAdmin(sort)
    return companies
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<CompanyDto> {
    return await this.companyService.getOneCompany(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() companyDto: CompanyDto,
  ): Promise<CompanyDto> {
    return await this.companyService.updateCompany(id, companyDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async destroy(@Param('id') id: string): Promise<RegistrationStatus> {
    // eslint-disable-next-line prettier/prettier
    const result: RegistrationStatus = await this.companyService.destroyCompany(id)
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST)
    }
    return result
  }
}
