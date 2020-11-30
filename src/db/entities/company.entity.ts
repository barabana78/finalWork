import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { User } from './user.entity'
import { UserDto } from 'src/modules/user/dto/user.dto'

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column('text')
  address: string

  @Column('text')
  serviceOfActivity: string

  @Column()
  numberOfEmployees: number

  @Column()
  companyType: string

  @Column('text')
  description: string

  @ManyToOne(() => User, user => user.companies)
  owner: UserDto

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
