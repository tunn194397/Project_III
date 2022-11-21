import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Customer, Manager, Staff, User } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Manager, Staff, Customer])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
