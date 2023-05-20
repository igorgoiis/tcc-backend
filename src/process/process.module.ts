import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './entities/process.entity';
import { ProcessRepository } from './repositories/ProcessRepository';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repositories/userRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Process, User])],
  controllers: [ProcessController],
  providers: [ProcessService, ProcessRepository, UserRepository],
})
export class ProcessModule {}
