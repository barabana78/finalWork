import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm'
import { Company } from './company.entity'
import * as bcrypt from 'bcrypt'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @Column({ length: 50, unique: true })
  email: string

  @Column()
  password: string

  @Column()
  phoneNumber: string

  @Column({ length: 50 })
  lastName: string

  @Column({ length: 50 })
  firstName: string

  @Column({ length: 50 })
  nickname: string

  @Column('text')
  position: string

  @Column('text')
  description: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(() => Company, company => company.owner)
  companies: Company[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
