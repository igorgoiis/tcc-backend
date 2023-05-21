import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { ActivityRepository } from './repositories/ActivityRepository';
import { Process } from 'src/process/entities/process.entity';
import { ProcessRepository } from 'src/process/repositories/ProcessRepository';
import { StepRepository } from 'src/step/repositories/StepRepository';
import { Step } from 'src/step/entities/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Process, Step])],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    ActivityRepository,
    ProcessRepository,
    StepRepository,
  ],
})
export class ActivityModule {}
