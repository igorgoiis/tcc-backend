import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityRepository } from './repositories/ActivityRepository';
import { StepRepository } from 'src/step/repositories/StepRepository';
import { ProcessRepository } from 'src/process/repositories/ProcessRepository';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly processRepository: ProcessRepository,
    private readonly stepRepository: StepRepository,
  ) {}

  logger = new Logger(ActivityService.name);

  async create(dto: CreateActivityDto) {
    try {
      const activity = await this.activityRepository.create(dto);

      return activity;
    } catch (error) {
      this.logger.error(`Error creating activity: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error creating the activity',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllByProcess(id: number) {
    try {
      const process = await this.processRepository.findOne({ where: { id } });

      if (!process)
        throw new HttpException('Process not found.', HttpStatus.NOT_FOUND);

      const activities = await this.activityRepository.findAll({
        where: { process_id: id },
      });

      return activities;
    } catch (error) {
      this.logger.error(
        `Error fetching activities by process: ${error.message}`,
      );

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error fetching activities by process',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllByStep(id: number) {
    try {
      const step = await this.stepRepository.findOne({ where: { id } });

      if (!step)
        throw new HttpException('Step not found.', HttpStatus.NOT_FOUND);

      const activities = await this.activityRepository.findAll({
        where: { step_id: id },
      });

      return activities;
    } catch (error) {
      this.logger.error(`Error fetching activities by step: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error fetching activities by step',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(name: string) {
    try {
      const activity = await this.activityRepository.findOne({
        where: { name },
      });

      if (!activity)
        throw new HttpException('Activity not found.', HttpStatus.NOT_FOUND);

      return activity;
    } catch (error) {
      this.logger.error(`Error fetching activity by name: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error fetching activity by name',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateActivityDto) {
    try {
      await this.activityRepository.update(id, dto);

      return { message: 'Atividade atualizada com sucesso!' };
    } catch (error) {
      this.logger.error(`Error updating activity: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error updating activity',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.activityRepository.remove(id);
    } catch (error) {
      this.logger.error(`Error deleting activity: ${error.message}`);

      if (error instanceof HttpException) {
        throw new HttpException(
          {
            message: error.message,
          },
          error.getStatus(),
        );
      }

      throw new HttpException(
        {
          message: 'There was an error deleting activity',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
