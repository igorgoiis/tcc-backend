import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Activity } from '../entities/activity.entity';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { ProcessRepository } from 'src/process/repositories/ProcessRepository';
import { StepRepository } from 'src/step/repositories/StepRepository';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private readonly processRepository: ProcessRepository,
    private readonly stepRepository: StepRepository,
  ) {}

  async create(dto: CreateActivityDto): Promise<Activity> {
    const activityFound = await this.activityRepository.findOne({
      where: {
        name: dto.name,
        item: dto.item,
        process_id: dto.process_id,
        step_id: dto.step_id,
      },
    });

    if (activityFound) {
      throw new HttpException(
        'This activity is already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const processFound = await this.processRepository.findOne({
      where: { id: dto.process_id },
    });

    if (!processFound) {
      throw new HttpException("Process doesn't exist.", HttpStatus.BAD_REQUEST);
    }

    const stepFound = await this.stepRepository.findOne({
      where: { id: dto.step_id },
    });

    if (!stepFound) {
      throw new HttpException("Step doesn't exist.", HttpStatus.BAD_REQUEST);
    }

    const activityCreated = this.activityRepository.create({ ...dto });

    return this.activityRepository.save(activityCreated);
  }

  async findAll(options?: FindManyOptions<Activity>): Promise<Activity[]> {
    return this.activityRepository.find(options);
  }

  async findOne(options: FindOneOptions<Activity>): Promise<Activity> {
    return this.activityRepository.findOne(options);
  }

  async update(id: number, dto: Partial<Activity>) {
    const step = await this.findOne({ where: { id } });

    if (!step) {
      throw new HttpException(
        {
          message: 'Activity not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.activityRepository.update({ id }, { ...dto });
  }

  async remove(id: number) {
    const step = await this.findOne({ where: { id } });

    if (!step) {
      throw new HttpException(
        {
          message: 'Activity not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.activityRepository.delete({ id });
  }
}
