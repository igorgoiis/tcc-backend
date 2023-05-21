import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Step } from '../entities/step.entity';
import { CreateStepDto } from '../dto/create-step.dto';

@Injectable()
export class StepRepository {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  async create(dto: CreateStepDto): Promise<Step> {
    const processCreated = this.stepRepository.create({ ...dto });

    return this.stepRepository.save(processCreated);
  }

  async findAll(options?: FindManyOptions<Step>): Promise<Step[]> {
    return this.stepRepository.find(options);
  }

  async findOne(options: FindOneOptions<Step>): Promise<Step> {
    return this.stepRepository.findOne(options);
  }

  async update(id: number, dto: Partial<Step>) {
    const step = await this.findOne({ where: { id } });

    if (!step) {
      throw new HttpException(
        {
          message: 'Step not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.stepRepository.update({ id }, { ...dto });
  }

  async remove(id: number) {
    const step = await this.findOne({ where: { id } });

    if (!step) {
      throw new HttpException(
        {
          message: 'Step not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.stepRepository.delete({ id });
  }
}
