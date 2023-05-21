import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { StepRepository } from './repositories/StepRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { ProcessRepository } from 'src/process/repositories/ProcessRepository';
import { Process } from 'src/process/entities/process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Step, Process])],
  controllers: [StepController],
  providers: [StepService, StepRepository, ProcessRepository],
})
export class StepModule {}
