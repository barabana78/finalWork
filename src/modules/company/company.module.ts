import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../user/user.module'
import { User } from '@entity/user.entity'
import { Company } from '@entity/company.entity'
import { AuthModule } from '../auth/auth.module'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forFeature([Company, User])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
