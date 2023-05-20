import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Process } from '../entities/process.entity';
import { CreateProcessDto } from '../dto/create-process.dto';

@Injectable()
export class ProcessRepository {
  constructor(
    @InjectRepository(Process)
    private readonly processRepository: Repository<Process>,
  ) {}

  async create(dto: CreateProcessDto, user_id: number): Promise<Process> {
    const processCreated = this.processRepository.create({ ...dto, user_id });

    return this.processRepository.save(processCreated);
  }

  async findAll(options?: FindManyOptions<Process>): Promise<Process[]> {
    return this.processRepository.find(options);
  }

  async findOne(options: FindOneOptions<Process>): Promise<Process> {
    return this.processRepository.findOne(options);
  }

  async update(id: number, dto: Partial<Process>) {
    const process = await this.findOne({ where: { id } });

    if (!process) {
      throw new HttpException(
        {
          message: 'Process not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.processRepository.update({ id }, { ...dto });
  }

  async remove(id: number) {
    const process = await this.findOne({ where: { id } });

    if (!process) {
      throw new HttpException(
        {
          message: 'Process not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.processRepository.delete({ id });
  }
}
