import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { StepRepository } from './repositories/StepRepository';
import { ProcessRepository } from 'src/process/repositories/ProcessRepository';

@Injectable()
export class StepService {
  constructor(
    private readonly stepRepository: StepRepository,
    private readonly processRepository: ProcessRepository,
  ) {}

  logger = new Logger(StepService.name);

  async create(createStepDto: CreateStepDto) {
    try {
      const processFound = await this.processRepository.findOne({
        where: { id: createStepDto.process_id },
      });

      if (!processFound) {
        throw new HttpException(
          { message: 'Process not found.' },
          HttpStatus.NOT_FOUND,
        );
      }

      const stepFound = await this.stepRepository.findOne({
        where: {
          name: createStepDto.name,
          process_id: createStepDto.process_id,
        },
      });

      if (stepFound) {
        throw new HttpException(
          { message: 'This step is already exists.' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const processCreated = await this.stepRepository.create(createStepDto);

      return processCreated;
    } catch (error) {
      this.logger.error(`Error creating step: ${error.message}`);

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
          message: 'There was an error creating the step',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(process_id: number) {
    try {
      const steps = await this.stepRepository.findAll({
        where: { process_id },
      });

      return steps;
    } catch (error) {
      this.logger.error(`Error fetching steps: ${error.message}`);

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
          message: 'There was an error fetching the steps',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const step = await this.stepRepository.findOne({ where: { id } });

      if (!step) {
        throw new HttpException('Step not found.', HttpStatus.NOT_FOUND);
      }

      return step;
    } catch (error) {
      this.logger.error(`Error fetching step: ${error.message}`);

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
          message: 'There was an error fetching the step',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateStepDto: UpdateStepDto) {
    try {
      await this.stepRepository.update(id, updateStepDto);

      return { message: 'Etapa atualizada com sucesso!' };
    } catch (error) {
      this.logger.error(`Error updating step: ${error.message}`);

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
          message: 'There was an error updating the step',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.stepRepository.remove(id);

      return { message: 'Etapa excluída com sucesso!' };
    } catch (error) {
      this.logger.error(`Error deleting step: ${error.message}`);

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
          message: 'There was an error deleting the step',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
