import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './db/entities/user.entity'
import { Company } from './db/entities/company.entity'
import { UserModule } from './modules/user/user.module'
import { CompanyModule } from './modules/company/company.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    CompanyModule,
    TypeOrmModule.forFeature([User, Company]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      database: 'dev-backend',
      username: 'postgres',
      password: '12345',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
